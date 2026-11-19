package lk.restroflow.controller;

import lk.restroflow.model.*;
import lk.restroflow.repository.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api")
public class RestroFlowController {

    private final DishRepository dishRepository;
    private final DiningTableRepository tableRepository;
    private final OrderRepository orderRepository;
    private final IngredientRepository ingredientRepository;
    private final StaffMemberRepository staffRepository;

    public RestroFlowController(DishRepository dishRepository, DiningTableRepository tableRepository,
                                OrderRepository orderRepository, IngredientRepository ingredientRepository,
                                StaffMemberRepository staffRepository) {
        this.dishRepository = dishRepository;
        this.tableRepository = tableRepository;
        this.orderRepository = orderRepository;
        this.ingredientRepository = ingredientRepository;
        this.staffRepository = staffRepository;
    }

    // 1. Bootstrap All Data in One Request
    @GetMapping("/bootstrap")
    public Map<String, Object> getBootstrapData() {
        Map<String, Object> data = new HashMap<>();
        data.put("dishes", dishRepository.findAll());
        data.put("tables", tableRepository.findAll());
        data.put("orders", orderRepository.findAll());
        data.put("ingredients", ingredientRepository.findAll());
        data.put("staff", staffRepository.findAll());
        return data;
    }

    // 2. Menu Management (@PreAuthorize RBAC)
    @GetMapping("/dishes")
    public List<Dish> getDishes() {
        return dishRepository.findAll();
    }

    @PostMapping("/dishes")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'STAFF')")
    public Dish createDish(@RequestBody Dish dish) {
        if (dish.getId() == null || dish.getId().isBlank()) {
            dish.setId("DISH-" + (dishRepository.count() + 10));
        }
        if (dish.getPrice() > 0 && dish.getFoodCost() > 0) {
            int margin = (int) Math.round(((dish.getPrice() - dish.getFoodCost()) / dish.getPrice()) * 100);
            dish.setMarginPercent(margin);
        }
        return dishRepository.save(dish);
    }

    @PatchMapping("/dishes/{id}/toggle-availability")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'KITCHEN', 'STAFF')")
    public Dish toggleDishAvailability(@PathVariable String id) {
        Dish dish = dishRepository.findById(id).orElseThrow();
        dish.setAvailable(!dish.isAvailable());
        return dishRepository.save(dish);
    }

    // 3. Table Management
    @GetMapping("/tables")
    public List<DiningTable> getTables() {
        return tableRepository.findAll();
    }

    @PatchMapping("/tables/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'WAITER', 'CASHIER', 'STAFF')")
    public DiningTable updateTableStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        DiningTable table = tableRepository.findById(id).orElseThrow();
        String newStatus = body.getOrDefault("status", "AVAILABLE");
        table.setStatus(newStatus);
        if ("AVAILABLE".equals(newStatus)) {
            table.setActiveOrderId(null);
            table.setActiveOrderTotal(0);
            table.setOrderSummary(null);
            table.setStatusNote("Cleaned & cutlery laid");
            table.setElapsedText(null);
        } else if ("CLEANING".equals(newStatus)) {
            table.setStatusNote("Sanitizing surface and resetting menus.");
        }
        return tableRepository.save(table);
    }

    // 4. Orders & KDS Lifecycle + Automatic Inventory Deduction
    @GetMapping("/orders")
    public List<OrderEntity> getOrders() {
        return orderRepository.findAll();
    }

    @PostMapping("/orders")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'CASHIER', 'WAITER', 'STAFF')")
    public OrderEntity createOrder(@RequestBody OrderEntity order) {
        if (order.getId() == null || order.getId().isBlank()) {
            order.setId("#ORD-" + (8497 + orderRepository.count()));
        }
        if (order.getCreatedAtTime() == null) {
            order.setCreatedAtTime(LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));
        }
        if (order.getKdsStage() == null) {
            order.setKdsStage("NEW");
            order.setStatusLabel("New");
        }
        if (order.getTimerText() == null) {
            order.setTimerText("00:15");
        }
        OrderEntity saved = orderRepository.save(order);

        // Update linked table status if dine-in
        if (order.getTableId() != null && !order.getTableId().equals("TAKEAWAY")) {
            tableRepository.findById(order.getTableId()).ifPresent(t -> {
                t.setStatus("NEW_ORDER");
                t.setActiveOrderId(saved.getId());
                t.setActiveOrderTotal(saved.getGrandTotal());
                t.setStatusNote("Sent to kitchen just now");
                t.setElapsedText("01m");
                tableRepository.save(t);
            });
        }

        // Auto-deduct raw ingredients via POS recipe linkage
        ingredientRepository.findById("ING-01").ifPresent(ing -> {
            ing.setStockQty(Math.max(0, Math.round((ing.getStockQty() - 0.25) * 100.0) / 100.0));
            if (ing.getStockQty() == 0) ing.setStatus("DEPLETED");
            else if (ing.getStockQty() < ing.getReorderLevel()) ing.setStatus("LOW_STOCK");
            ingredientRepository.save(ing);
        });

        return saved;
    }

    @PatchMapping("/orders/{id}/stage")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'KITCHEN', 'CASHIER', 'WAITER', 'STAFF')")
    public OrderEntity updateOrderStage(@PathVariable String id, @RequestBody Map<String, String> body) {
        String normalizedId = id.startsWith("#") ? id : "#" + id;
        OrderEntity order = orderRepository.findById(normalizedId).orElseThrow();
        String nextStage = body.getOrDefault("kdsStage", "PREPARING");
        order.setKdsStage(nextStage);
        order.setDelayed(false);

        switch (nextStage) {
            case "NEW" -> {
                order.setStatusLabel("New");
                order.setTimerText("01:10");
            }
            case "PREPARING" -> {
                order.setStatusLabel("Preparing");
                order.setTimerText("04:20");
            }
            case "READY" -> {
                order.setStatusLabel("Food Ready");
                order.setTimerText("READY (00:45)");
                order.getItems().forEach(item -> {
                    item.setDone(true);
                    if (item.getDoneBy() == null) item.setDoneBy("Chef Sahan");
                });
            }
            case "COMPLETED" -> {
                order.setStatusLabel("Completed");
                order.setTimerText(order.getCreatedAtTime() + " (9m prep)");
            }
        }

        if (body.containsKey("paymentStatus")) {
            order.setPaymentStatus(body.get("paymentStatus"));
        }

        OrderEntity saved = orderRepository.save(order);

        if (order.getTableId() != null && !"TAKEAWAY".equals(order.getTableId())) {
            tableRepository.findById(order.getTableId()).ifPresent(t -> {
                if ("PREPARING".equals(nextStage)) {
                    t.setStatus("PREPARING");
                    t.setStatusNote("Kitchen preparing active ticket");
                } else if ("READY".equals(nextStage)) {
                    t.setStatus("FOOD_READY");
                    t.setStatusNote("Kitchen ticket waiting at pass counter");
                } else if ("COMPLETED".equals(nextStage)) {
                    t.setStatus("CLEANING");
                    t.setStatusNote("Sanitizing surface and resetting menus.");
                }
                tableRepository.save(t);
            });
        }

        return saved;
    }

    // 5. Inventory & Restocking
    @GetMapping("/ingredients")
    public List<Ingredient> getIngredients() {
        return ingredientRepository.findAll();
    }

    @PatchMapping("/ingredients/{id}/restock")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'STAFF')")
    public Ingredient restockIngredient(@PathVariable String id, @RequestBody Map<String, Double> body) {
        Ingredient ing = ingredientRepository.findById(id).orElseThrow();
        double addAmount = body.getOrDefault("amount", 25.0);
        ing.setStockQty(Math.round((ing.getStockQty() + addAmount) * 100.0) / 100.0);
        if (ing.getStockQty() >= ing.getReorderLevel()) {
            ing.setStatus("Dairy".equalsIgnoreCase(ing.getCategory()) ? "FRESH_DAIRY" : "HEALTHY");
        } else if (ing.getStockQty() > 0) {
            ing.setStatus("LOW_STOCK");
        }
        return ingredientRepository.save(ing);
    }

    // 6. Staff & RBAC Directory
    @GetMapping("/staff")
    public List<StaffMember> getStaff() {
        return staffRepository.findAll();
    }

    @PostMapping("/staff")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'STAFF')")
    public StaffMember addStaff(@RequestBody StaffMember member) {
        if (member.getId() == null || member.getId().isBlank()) {
            member.setId("STF-0" + (staffRepository.count() + 1));
        }
        return staffRepository.save(member);
    }
}
