package lk.restroflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "dining_tables")
public class DiningTable {
    @Id
    private String id; // e.g., T-01
    private String name; // Table T-01
    private String area; // Ground Floor, Upper Balcony, VIP Lounge
    private int seats;
    private String positionTag; // Window, Center, Terrace
    private String status; // AVAILABLE, FOOD_READY, PREPARING, RESERVED, NEW_ORDER, CLEANING, LATE_PREP
    private String waiter;
    private String activeOrderId;
    private double activeOrderTotal;
    private String orderSummary;
    private String statusNote;
    private String elapsedText;
    private String reservationGuest;
    private String reservationNote;

    public DiningTable() {}

    public DiningTable(String id, String name, String area, int seats, String positionTag, String status,
                       String waiter, String activeOrderId, double activeOrderTotal, String orderSummary,
                       String statusNote, String elapsedText, String reservationGuest, String reservationNote) {
        this.id = id;
        this.name = name;
        this.area = area;
        this.seats = seats;
        this.positionTag = positionTag;
        this.status = status;
        this.waiter = waiter;
        this.activeOrderId = activeOrderId;
        this.activeOrderTotal = activeOrderTotal;
        this.orderSummary = orderSummary;
        this.statusNote = statusNote;
        this.elapsedText = elapsedText;
        this.reservationGuest = reservationGuest;
        this.reservationNote = reservationNote;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
    public int getSeats() { return seats; }
    public void setSeats(int seats) { this.seats = seats; }
    public String getPositionTag() { return positionTag; }
    public void setPositionTag(String positionTag) { this.positionTag = positionTag; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getWaiter() { return waiter; }
    public void setWaiter(String waiter) { this.waiter = waiter; }
    public String getActiveOrderId() { return activeOrderId; }
    public void setActiveOrderId(String activeOrderId) { this.activeOrderId = activeOrderId; }
    public double getActiveOrderTotal() { return activeOrderTotal; }
    public void setActiveOrderTotal(double activeOrderTotal) { this.activeOrderTotal = activeOrderTotal; }
    public String getOrderSummary() { return orderSummary; }
    public void setOrderSummary(String orderSummary) { this.orderSummary = orderSummary; }
    public String getStatusNote() { return statusNote; }
    public void setStatusNote(String statusNote) { this.statusNote = statusNote; }
    public String getElapsedText() { return elapsedText; }
    public void setElapsedText(String elapsedText) { this.elapsedText = elapsedText; }
    public String getReservationGuest() { return reservationGuest; }
    public void setReservationGuest(String reservationGuest) { this.reservationGuest = reservationGuest; }
    public String getReservationNote() { return reservationNote; }
    public void setReservationNote(String reservationNote) { this.reservationNote = reservationNote; }
}
