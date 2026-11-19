package lk.restroflow.config;

import lk.restroflow.model.*;
import lk.restroflow.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final DishRepository dishRepository;
    private final DiningTableRepository tableRepository;
    private final OrderRepository orderRepository;
    private final IngredientRepository ingredientRepository;
    private final StaffMemberRepository staffRepository;

    public DataInitializer(DishRepository dishRepository, DiningTableRepository tableRepository,
                           OrderRepository orderRepository, IngredientRepository ingredientRepository,
                           StaffMemberRepository staffRepository) {
        this.dishRepository = dishRepository;
        this.tableRepository = tableRepository;
        this.orderRepository = orderRepository;
        this.ingredientRepository = ingredientRepository;
        this.staffRepository = staffRepository;
    }

    @Override
    public void run(String... args) {
        if (dishRepository.count() == 0) {
            dishRepository.saveAll(List.of(
                new Dish("DISH-01", "SKU-104", "Chicken Fried Rice", "Rice & Biryani",
                    "Wok basmati rice, eggs, scallions, roasted chicken", "Wok basmati,…",
                    1650, 480, 71, 10, "Wok", true, true, false, true,
                    "/assets/figma/49f62cad-7820-4718-8af2-1151ad123891.svg", "#fdf2f8", 54),
                new Dish("DISH-02", "SKU-108", "Cheese Chicken Kottu", "Kottu & Roti",
                    "Shredded godamba roti, melted creamy cheese, spicy chicken gravy", "Shredded…",
                    1950, 560, 71, 12, "Kottu", true, true, false, false,
                    "/assets/figma/bd7c6a93-4100-4d92-a677-73536de45f66.svg", "#fffbeb", 38),
                new Dish("DISH-03", "SKU-112", "Mutton Dum Biryani", "Rice & Biryani",
                    "Slow cooked aged basmati, tender spiced mutton, mint raita & egg", "Slow cooked…",
                    2450, 790, 68, 15, "Wok", true, true, false, true,
                    "/assets/figma/d63f54b8-8356-44c0-96a8-662f725d4bec.svg", "#fdf2f8", 19),
                new Dish("DISH-04", "SKU-204", "Pepper Beef Burger", "Burgers",
                    "Brioche bun, black pepper crusted beef patty, cheddar, fries", "Brioche,…",
                    2100, 640, 70, 11, "Grill", true, false, false, false,
                    "/assets/figma/bdb3fbfd-fc71-42a8-b184-4852526b8d55.svg", "#fff1f2", 14),
                new Dish("DISH-05", "SKU-118", "Negombo Prawn Curry", "Rice & Biryani",
                    "Spicy lagoon prawn gravy with woodfired roast paan", "Spicy gravy, roast",
                    2600, 820, 68, 14, "Wok", true, true, false, true,
                    "/assets/figma/9b0a6f2d-d1a7-4ae3-8764-0a6543a4fedb.svg", "#fffbeb", 22),
                new Dish("DISH-06", "SKU-301", "Iced Milo Dinosaur", "Beverages",
                    "Double malt heap, chilled Milo & condensed milk", "Malt heap,…",
                    750, 180, 76, 4, "Bar", true, true, true, false,
                    "/assets/figma/ff80636b-879b-4323-960a-e568f2d70a04.svg", "#fdf2f8", 41),
                new Dish("DISH-07", "SKU-402", "Jaggery Watalappam", "Desserts",
                    "Traditional kithul jaggery & coconut milk steamed custard with cashews", "Kithul jaggery…",
                    850, 220, 74, 5, "Bar", false, false, true, false,
                    "/assets/figma/14642a59-ddee-4cda-9e12-820f06d87f12.svg", "#fff1f2", 11),
                new Dish("DISH-08", "SKU-305", "Lime & Mint Soda", "Beverages",
                    "Crushed garden mint, fresh lime juice, sparkling soda", "Fresh lime, mint",
                    650, 130, 80, 3, "Bar", true, false, true, false,
                    "/assets/figma/b9f672fa-e133-48b8-9057-45503b8933f0.svg", "#fdf2f8", 29)
            ));
        }

        if (tableRepository.count() == 0) {
            tableRepository.saveAll(List.of(
                new DiningTable("T-01", "Table T-01", "Ground Floor", 2, "Window", "AVAILABLE",
                    "Nisal R.", null, 0, null, "Ready for guest seating", null, null, null),
                new DiningTable("T-02", "Table T-02", "Ground Floor", 4, "Center", "FOOD_READY",
                    "Dilshan", "#ORD-8490", 5200, "2x Negombo Prawn Curry, 4x Roast Paan",
                    "Kitchen ticket waiting at pass counter", "35m", null, null),
                new DiningTable("T-04", "Table T-04", "Ground Floor", 4, "Window", "PREPARING",
                    "Nisal R.", "#ORD-8492", 6137, "1x Fried Rice, 1x Kottu, 2x Milo",
                    "1x Fried Rice, 1x Kottu, 2x Milo", "12m", null, null),
                new DiningTable("T-05", "Table T-05", "Ground Floor", 6, "Terrace", "RESERVED",
                    "Nisal R.", null, 0, null, null, "14:00 (18m)", "Dr. Chathura S.", "Party of 5 · Birthday"),
                new DiningTable("T-08", "Table T-08", "Ground Floor", 4, "Center", "NEW_ORDER",
                    "Nisal R.", "#ORD-8495", 5900, "2x Chicken Fried Rice, 1x Prawn Curry",
                    "Sent to kitchen 2 min ago", "02m", null, null),
                new DiningTable("T-09", "Table T-09", "Ground Floor", 2, "Window", "CLEANING",
                    "Busboy", null, 0, null, "Sanitizing surface and resetting menus.", null, null, null),
                new DiningTable("T-11", "Table T-11", "Ground Floor", 4, "Center", "LATE_PREP",
                    "Dilshan", "#ORD-8488", 4900, "1x Mutton Dum Biryani",
                    "Biryani delayed by 6 minutes! Check pass.", "18m", null, null),
                new DiningTable("T-12", "Table T-12", "Ground Floor", 8, "Center", "AVAILABLE",
                    "Dilshan", null, 0, null, "Cleaned & cutlery laid", null, null, null)
            ));
        }

        if (orderRepository.count() == 0) {
            orderRepository.saveAll(List.of(
                new OrderEntity("#ORD-8495", "T-08", "Table T-08", "Walk-in Guest", "Nisal R.",
                    "DINE-IN · TABLE T-08", "NEW", "New", "Unpaid", "02:14", "Waiter: Nisal R.",
                    false, "Wok", 5363.64, 536.36, 5900.00, "13:40",
                    List.of(
                        new OrderItemEntity("DISH-01", "Chicken Fried Rice", 2, 1650, "Large · Extra Chicken", "Note: Separate chili paste", false, null),
                        new OrderItemEntity("DISH-05", "Negombo Prawn Curry", 1, 2600, "+2 Roast Paan", null, false, null)
                    )
                ),
                new OrderEntity("#ORD-8496", "TAKEAWAY", "Takeaway", "Malith Silva", "QR Online",
                    "TAKEAWAY · QR ONLINE", "NEW", "New", "Paid (Card)", "01:05", "Malith Silva",
                    false, "Grill", 2100.00, 0.00, 2100.00, "13:41",
                    List.of(
                        new OrderItemEntity("DISH-04", "Pepper Beef Burger", 1, 2100, "Well-done, Extra fries", null, false, null)
                    )
                ),
                new OrderEntity("#ORD-8492", "T-04", "Table T-04", "Kasun Perera", "Nisal R.",
                    "DINE-IN · TABLE T-04", "PREPARING", "Preparing", "Paid (Card)", "08:45", "Target: 12m",
                    false, "Kottu", 5579.55, 557.95, 6137.50, "13:33",
                    List.of(
                        new OrderItemEntity("DISH-01", "Chicken Fried Rice", 1, 2450, "Large · Extra Chicken", "Separate chili paste", true, "Chef Sahan"),
                        new OrderItemEntity("DISH-02", "Cheese Chicken Kottu", 1, 1950, "Extra Spicy · On Wok", null, false, null),
                        new OrderItemEntity("DISH-06", "Iced Milo Dinosaur", 2, 750, "Double Malt", null, false, null)
                    )
                ),
                new OrderEntity("#ORD-8488", "T-11", "Table T-11", "Dilshan Guest", "Dilshan",
                    "DINE-IN · TABLE T-11", "PREPARING", "Delayed", "Unpaid", "18:20", "+6m overdue",
                    true, "Wok", 4454.55, 445.45, 4900.00, "13:24",
                    List.of(
                        new OrderItemEntity("DISH-03", "Mutton Dum Biryani", 2, 2450, "Extra Egg, Jaffna Gravy", null, false, null)
                    )
                ),
                new OrderEntity("#ORD-8490", "T-02", "Table T-02", "Anura Bandara", "Dilshan",
                    "DINE-IN · TABLE T-02", "READY", "Food Ready", "Paid (Cash)", "01:40", "Dilshan paged",
                    false, "Wok", 4727.27, 472.73, 5200.00, "13:07",
                    List.of(
                        new OrderItemEntity("DISH-05", "Negombo Prawn Curry", 2, 2600, "Spicy Lagoon Gravy", null, true, "Chef Sahan"),
                        new OrderItemEntity("DISH-02", "4x Woodfired Roast Paan", 1, 0, "Included Side", null, true, "Chef Sahan")
                    )
                ),
                new OrderEntity("#ORD-8489", "TAKEAWAY", "Pickup Desk", "Bag #4 Guest", "Kasun P.",
                    "TAKEAWAY · PACKED", "READY", "Food Ready", "Paid (Card)", "PICKUP DESK", "Bag #4",
                    false, "Bar", 2150.00, 0.00, 2150.00, "13:20",
                    List.of(
                        new OrderItemEntity("DISH-08", "Lime & Mint Soda", 2, 650, "Chilled", null, true, "Barista"),
                        new OrderItemEntity("DISH-07", "Jaggery Watalappam", 1, 850, "Cashew Topping", null, true, "Barista")
                    )
                ),
                new OrderEntity("#ORD-8486", "T-05", "Table T-05", "Dr. Chathura S.", "Nisal R.",
                    "DINE-IN · TABLE T-05", "COMPLETED", "Completed", "Paid (Card)", "13:28 (10m prep)", "Fulfilled",
                    false, "Kottu", 6681.82, 668.18, 7350.00, "13:18",
                    List.of(
                        new OrderItemEntity("DISH-02", "Cheese Chicken Kottu", 3, 1950, "Regular", null, true, "Chef Sahan"),
                        new OrderItemEntity("DISH-06", "Iced Milo Dinosaur", 2, 750, "Regular", null, true, "Barista")
                    )
                ),
                new OrderEntity("#ORD-8485", "T-01", "Table T-01", "Walk-in Guest", "Nisal R.",
                    "DINE-IN · TABLE T-01", "COMPLETED", "Completed", "Paid (Cash)", "13:15 (8m prep)", "Fulfilled",
                    false, "Wok", 2818.18, 281.82, 3100.00, "13:05",
                    List.of(
                        new OrderItemEntity("DISH-03", "Mutton Dum Biryani", 1, 2450, "Regular", null, true, "Chef Sahan"),
                        new OrderItemEntity("DISH-08", "Lime & Mint Soda", 1, 650, "Regular", null, true, "Barista")
                    )
                )
            ));
        }

        if (ingredientRepository.count() == 0) {
            ingredientRepository.saveAll(List.of(
                new Ingredient("ING-01", "BR", "Aged Basmati Rice", "SKU-ING-01 · 25kg Sacks", "Grains & Meat",
                    8.5, "kg", 680, 15.0, "Lanka Grains Co.", "LOW_STOCK"),
                new Ingredient("ING-02", "CP", "Free-Range Chicken Breast", "SKU-ING-04 · Chilled Halal", "Grains & Meat",
                    42.0, "kg", 1450, 12.0, "Ceylon Poultry Farms", "HEALTHY"),
                new Ingredient("ING-03", "CC", "Creamy Cheddar & Mozzarella", "SKU-ING-09 · Kottu Blend", "Dairy",
                    18.5, "kg", 2200, 8.0, "Ambewela Dairy", "FRESH_DAIRY"),
                new Ingredient("ING-04", "LP", "Negombo Lagoon Jumbo Prawns", "SKU-ING-14 · Fresh Catch", "Seafood",
                    0.0, "kg", 3400, 10.0, "Negombo Fishery Harbor", "DEPLETED")
            ));
        }

        if (staffRepository.count() == 0) {
            staffRepository.saveAll(List.of(
                new StaffMember("STF-01", "KP", "Kasun Perera", "kasun.perera@restroflow.lk", "EMP-0142",
                    "Cashier", "Terminal #01", "Colombo Flagship · Shift #2", "PIN #4482 · 2FA", "Active"),
                new StaffMember("STF-02", "CS", "Chef Sahan", "sahan.wok@restroflow.lk", "EMP-0108",
                    "Kitchen", "Hot Wok", "Colombo Flagship · Main Kitchen", "KDS Badge #02", "Active"),
                new StaffMember("STF-03", "NR", "Nisal R.", "nisal.floor@restroflow.lk", "EMP-0165",
                    "Waiter", "Ground Floor", "Colombo Flagship · Dining Hall", "PIN #1190", "Active"),
                new StaffMember("STF-04", "DK", "Dilshan K.", "dilshan.mgr@restroflow.lk", "EMP-0019",
                    "Manager", "All Zones", "Colombo Flagship · Full Access", "Biometric + PIN", "Active")
            ));
        }
    }
}
