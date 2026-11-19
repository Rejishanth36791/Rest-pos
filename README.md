# RestroFlow v3.4 · Hospitality Vault & POS System

Full-stack restaurant point-of-sale, Kitchen Display System (KDS), contactless mobile QR ordering, floor/table management, inventory recipe auto-deduction, and Spring Security `@PreAuthorize` Role-Based Access Control (RBAC) built from the 10 Figma screens.

## Project Structure

- **`frontend/`**: React 18 + TypeScript + Vite + Tailwind CSS implementing all 10 Figma screens with local SVG assets (`frontend/public/assets/figma/`) and live cross-screen state sync.
- **`backend/`**: Spring Boot 3 REST API (`Java 17+`) with Spring Data JPA, Spring Security `@PreAuthorize` method security, and PostgreSQL (`localhost:5432/restroflow`) + H2 database profiles.

## 10 Implemented Screens & Routes

1. **`/pos`** — **POS / New Order** (`1:2`): 3-column touchscreen POS terminal with category pills, floor occupancy telemetry, 4-column dish grid, Item Customizer Drawer, and Order Cart with 10% service charge & settlement modal.
2. **`/kds`** — **Kitchen Display System (KDS)** (`1:315`): High-contrast dark Kanban board (`NEW ORDERS`, `PREPARING`, `READY TO SERVE`, `COMPLETED`), station filters, live clock, audio alert toggle, per-item completion strikethrough, and red `DELAYED` ribbon.
3. **`/dashboard`** — **Restaurant Dashboard** (`1:655`): Deep wine hero banner with `67%` Circular Completion Rate meter, 4 KPI cards, **Quick Order Terminal Dispatch** natural-language input bar, Top Dishes Today, and Live Order Flow table.
4. **`/tables`** — **Table Management** (`1:965`): Floor zone tabs (`Ground Floor (16)`, `Upper Balcony (8)`, `VIP Lounge (3)`), live status counters, Floating Actions Bar (`Transfer Table`, `Merge Tables`, `Table QRs`), and 8 table lifecycle cards (`T-01`..`T-12`).
5. **`/qr-order`** — **Customer QR Ordering (Mobile)** (`1:1263`): `390 × 884` mobile viewport for **The Galle Pavilion · Table T-04** with category chips, dish cards, live Kitchen Order Tracker banner, and sticky bottom checkout bar.
6. **`/login`** — **Login Page** (`1:1386`): Split 2-column SaaS authentication card with 1-click Role Quick-Select tabs (`Cashier`, `Kitchen`, `Manager`) and branch selector.
7. **`/orders`** — **Order Management** (`1:1495`): Collapsible Enterprise Sidebar, filterable Orders Data Ledger, and stylized **80mm Thermal Receipt Preview** with print and settlement controls.
8. **`/menu`** — **Menu Management** (`1:1902`): Margin KPI Dial (`72%`), 4 summary cards, category filters, `+ Add Dish` modal, and 8-column Menu Table with `Available` / `Out of Stock` (86'd) toggles.
9. **`/inventory`** — **Inventory & Recipe Management** (`1:2224`): Stock Health Dial (`93%`), `LKR 1.84M` valuation, low/depleted stock badges, `+ Restock 25kg` actions, and automatic POS recipe stock deduction.
10. **`/staff`** — **Staff & Access Control (RBAC)** (`1:2540`): `@PreAuthorize` Security Dial, 5 Role Summary Cards, interactive clickable **RBAC Permission Matrix**, and **Active Employees Directory**.

## Running the System

### 1. Frontend (Vite + React + Tailwind)
```powershell
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` and use the floating **RestroFlow Navigator Dock** at the bottom-right to jump between any of the 10 screens or switch your active `@PreAuthorize` staff role.

### 2. Backend (Spring Boot 3 + PostgreSQL)
Ensure PostgreSQL is running on `localhost:5432` with a database named `restroflow` (or run `backend/schema_postgres.sql`), then start the Spring Boot server:
```powershell
cd backend
mvn spring-boot:run
```
*(To run with the embedded PostgreSQL-compatible file database without a local Postgres server, pass `-Dspring-boot.run.profiles=h2`)*
