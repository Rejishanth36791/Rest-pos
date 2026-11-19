package lk.restroflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dishId;
    private String name;
    private int quantity;
    private double unitPrice;
    private String modifiers;
    private String kitchenNote;
    private boolean done;
    private String doneBy;

    public OrderItemEntity() {}

    public OrderItemEntity(String dishId, String name, int quantity, double unitPrice,
                           String modifiers, String kitchenNote, boolean done, String doneBy) {
        this.dishId = dishId;
        this.name = name;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.modifiers = modifiers;
        this.kitchenNote = kitchenNote;
        this.done = done;
        this.doneBy = doneBy;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDishId() { return dishId; }
    public void setDishId(String dishId) { this.dishId = dishId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(double unitPrice) { this.unitPrice = unitPrice; }
    public String getModifiers() { return modifiers; }
    public void setModifiers(String modifiers) { this.modifiers = modifiers; }
    public String getKitchenNote() { return kitchenNote; }
    public void setKitchenNote(String kitchenNote) { this.kitchenNote = kitchenNote; }
    public boolean isDone() { return done; }
    public void setDone(boolean done) { this.done = done; }
    public String getDoneBy() { return doneBy; }
    public void setDoneBy(String doneBy) { this.doneBy = doneBy; }
}
