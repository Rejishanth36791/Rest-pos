package lk.restroflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "dishes")
public class Dish {
    @Id
    private String id;
    private String sku;
    private String name;
    private String category;
    private String description;
    private String shortDesc;
    private double price;
    private double foodCost;
    private int marginPercent;
    private int prepTimeMinutes;
    private String station; // Wok, Kottu, Grill, Bar
    private boolean available;
    private boolean popular;
    private boolean veg;
    private boolean chefPick;
    private String iconAsset;
    private String bgTint;
    private int soldToday;

    public Dish() {}

    public Dish(String id, String sku, String name, String category, String description, String shortDesc,
                double price, double foodCost, int marginPercent, int prepTimeMinutes, String station,
                boolean available, boolean popular, boolean veg, boolean chefPick, String iconAsset, String bgTint, int soldToday) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.category = category;
        this.description = description;
        this.shortDesc = shortDesc;
        this.price = price;
        this.foodCost = foodCost;
        this.marginPercent = marginPercent;
        this.prepTimeMinutes = prepTimeMinutes;
        this.station = station;
        this.available = available;
        this.popular = popular;
        this.veg = veg;
        this.chefPick = chefPick;
        this.iconAsset = iconAsset;
        this.bgTint = bgTint;
        this.soldToday = soldToday;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getShortDesc() { return shortDesc; }
    public void setShortDesc(String shortDesc) { this.shortDesc = shortDesc; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public double getFoodCost() { return foodCost; }
    public void setFoodCost(double foodCost) { this.foodCost = foodCost; }
    public int getMarginPercent() { return marginPercent; }
    public void setMarginPercent(int marginPercent) { this.marginPercent = marginPercent; }
    public int getPrepTimeMinutes() { return prepTimeMinutes; }
    public void setPrepTimeMinutes(int prepTimeMinutes) { this.prepTimeMinutes = prepTimeMinutes; }
    public String getStation() { return station; }
    public void setStation(String station) { this.station = station; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public boolean isPopular() { return popular; }
    public void setPopular(boolean popular) { this.popular = popular; }
    public boolean isVeg() { return veg; }
    public void setVeg(boolean veg) { this.veg = veg; }
    public boolean isChefPick() { return chefPick; }
    public void setChefPick(boolean chefPick) { this.chefPick = chefPick; }
    public String getIconAsset() { return iconAsset; }
    public void setIconAsset(String iconAsset) { this.iconAsset = iconAsset; }
    public String getBgTint() { return bgTint; }
    public void setBgTint(String bgTint) { this.bgTint = bgTint; }
    public int getSoldToday() { return soldToday; }
    public void setSoldToday(int soldToday) { this.soldToday = soldToday; }
}
