package lk.restroflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ingredients")
public class Ingredient {
    @Id
    private String id;
    private String code;
    private String name;
    private String skuSubtext;
    private String category;
    private double stockQty;
    private String unit;
    private double unitCost;
    private double reorderLevel;
    private String supplier;
    private String status; // LOW_STOCK, HEALTHY, FRESH_DAIRY, DEPLETED

    public Ingredient() {}

    public Ingredient(String id, String code, String name, String skuSubtext, String category,
                      double stockQty, String unit, double unitCost, double reorderLevel,
                      String supplier, String status) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.skuSubtext = skuSubtext;
        this.category = category;
        this.stockQty = stockQty;
        this.unit = unit;
        this.unitCost = unitCost;
        this.reorderLevel = reorderLevel;
        this.supplier = supplier;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSkuSubtext() { return skuSubtext; }
    public void setSkuSubtext(String skuSubtext) { this.skuSubtext = skuSubtext; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public double getStockQty() { return stockQty; }
    public void setStockQty(double stockQty) { this.stockQty = stockQty; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public double getUnitCost() { return unitCost; }
    public void setUnitCost(double unitCost) { this.unitCost = unitCost; }
    public double getReorderLevel() { return reorderLevel; }
    public void setReorderLevel(double reorderLevel) { this.reorderLevel = reorderLevel; }
    public String getSupplier() { return supplier; }
    public void setSupplier(String supplier) { this.supplier = supplier; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
