package lk.restroflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "staff_members")
public class StaffMember {
    @Id
    private String id;
    private String initials;
    private String name;
    private String email;
    private String employeeCode;
    private String role; // Admin, Manager, Cashier, Waiter, Kitchen
    private String stationNote;
    private String branchShift;
    private String pinStatus;
    private String status; // Active, On Break, Offline

    public StaffMember() {}

    public StaffMember(String id, String initials, String name, String email, String employeeCode,
                       String role, String stationNote, String branchShift, String pinStatus, String status) {
        this.id = id;
        this.initials = initials;
        this.name = name;
        this.email = email;
        this.employeeCode = employeeCode;
        this.role = role;
        this.stationNote = stationNote;
        this.branchShift = branchShift;
        this.pinStatus = pinStatus;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getInitials() { return initials; }
    public void setInitials(String initials) { this.initials = initials; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getEmployeeCode() { return employeeCode; }
    public void setEmployeeCode(String employeeCode) { this.employeeCode = employeeCode; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getStationNote() { return stationNote; }
    public void setStationNote(String stationNote) { this.stationNote = stationNote; }
    public String getBranchShift() { return branchShift; }
    public void setBranchShift(String branchShift) { this.branchShift = branchShift; }
    public String getPinStatus() { return pinStatus; }
    public void setPinStatus(String pinStatus) { this.pinStatus = pinStatus; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
