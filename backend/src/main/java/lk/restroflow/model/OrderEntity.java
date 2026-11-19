package lk.restroflow.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class OrderEntity {
    @Id
    private String id; // #ORD-8492
    private String tableId; // T-04 or TAKEAWAY
    private String tableLabel; // Table T-04
    private String guestOrWaiter;
    private String waiterName;
    private String orderType; // DINE-IN, TAKEAWAY · QR ONLINE, TAKEAWAY · PACKED
    private String kdsStage; // NEW, PREPARING, READY, COMPLETED
    private String statusLabel; // New, Preparing, Food Ready, Completed, Delayed
    private String paymentStatus; // Paid (Card), Paid (Cash), Unpaid
    private String timerText; // 08:45
    private String targetText; // Target: 12m
    private boolean delayed;
    private String station; // Wok, Kottu, Grill, Bar
    private double subtotal;
    private double serviceCharge;
    private double grandTotal;
    private String createdAtTime; // 13:42

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private List<OrderItemEntity> items = new ArrayList<>();

    public OrderEntity() {}

    public OrderEntity(String id, String tableId, String tableLabel, String guestOrWaiter, String waiterName,
                       String orderType, String kdsStage, String statusLabel, String paymentStatus,
                       String timerText, String targetText, boolean delayed, String station,
                       double subtotal, double serviceCharge, double grandTotal, String createdAtTime,
                       List<OrderItemEntity> items) {
        this.id = id;
        this.tableId = tableId;
        this.tableLabel = tableLabel;
        this.guestOrWaiter = guestOrWaiter;
        this.waiterName = waiterName;
        this.orderType = orderType;
        this.kdsStage = kdsStage;
        this.statusLabel = statusLabel;
        this.paymentStatus = paymentStatus;
        this.timerText = timerText;
        this.targetText = targetText;
        this.delayed = delayed;
        this.station = station;
        this.subtotal = subtotal;
        this.serviceCharge = serviceCharge;
        this.grandTotal = grandTotal;
        this.createdAtTime = createdAtTime;
        this.items = items;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTableId() { return tableId; }
    public void setTableId(String tableId) { this.tableId = tableId; }
    public String getTableLabel() { return tableLabel; }
    public void setTableLabel(String tableLabel) { this.tableLabel = tableLabel; }
    public String getGuestOrWaiter() { return guestOrWaiter; }
    public void setGuestOrWaiter(String guestOrWaiter) { this.guestOrWaiter = guestOrWaiter; }
    public String getWaiterName() { return waiterName; }
    public void setWaiterName(String waiterName) { this.waiterName = waiterName; }
    public String getOrderType() { return orderType; }
    public void setOrderType(String orderType) { this.orderType = orderType; }
    public String getKdsStage() { return kdsStage; }
    public void setKdsStage(String kdsStage) { this.kdsStage = kdsStage; }
    public String getStatusLabel() { return statusLabel; }
    public void setStatusLabel(String statusLabel) { this.statusLabel = statusLabel; }
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public String getTimerText() { return timerText; }
    public void setTimerText(String timerText) { this.timerText = timerText; }
    public String getTargetText() { return targetText; }
    public void setTargetText(String targetText) { this.targetText = targetText; }
    public boolean isDelayed() { return delayed; }
    public void setDelayed(boolean delayed) { this.delayed = delayed; }
    public String getStation() { return station; }
    public void setStation(String station) { this.station = station; }
    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }
    public double getServiceCharge() { return serviceCharge; }
    public void setServiceCharge(double serviceCharge) { this.serviceCharge = serviceCharge; }
    public double getGrandTotal() { return grandTotal; }
    public void setGrandTotal(double grandTotal) { this.grandTotal = grandTotal; }
    public String getCreatedAtTime() { return createdAtTime; }
    public void setCreatedAtTime(String createdAtTime) { this.createdAtTime = createdAtTime; }
    public List<OrderItemEntity> getItems() { return items; }
    public void setItems(List<OrderItemEntity> items) { this.items = items; }
}
