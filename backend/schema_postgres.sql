-- =============================================================================
-- RestroFlow v3.4 · PostgreSQL Schema & Initial Seed Data (Port 5432)
-- Database: restroflow
-- =============================================================================

CREATE TABLE IF NOT EXISTS dishes (
    id VARCHAR(32) PRIMARY KEY,
    sku VARCHAR(32) NOT NULL,
    name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL,
    description TEXT,
    short_desc VARCHAR(128),
    price DOUBLE PRECISION NOT NULL,
    food_cost DOUBLE PRECISION NOT NULL,
    margin_percent INT NOT NULL,
    prep_time_minutes INT NOT NULL,
    station VARCHAR(32) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    popular BOOLEAN DEFAULT FALSE,
    veg BOOLEAN DEFAULT FALSE,
    chef_pick BOOLEAN DEFAULT FALSE,
    icon_asset VARCHAR(255),
    bg_tint VARCHAR(32),
    sold_today INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS dining_tables (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    area VARCHAR(64) NOT NULL,
    seats INT NOT NULL,
    position_tag VARCHAR(64),
    status VARCHAR(32) NOT NULL,
    waiter VARCHAR(64),
    active_order_id VARCHAR(32),
    active_order_total DOUBLE PRECISION DEFAULT 0,
    order_summary TEXT,
    status_note TEXT,
    elapsed_text VARCHAR(32),
    reservation_guest VARCHAR(128),
    reservation_note VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(32) PRIMARY KEY,
    table_id VARCHAR(32),
    table_label VARCHAR(64),
    guest_or_waiter VARCHAR(128),
    waiter_name VARCHAR(64),
    order_type VARCHAR(64),
    kds_stage VARCHAR(32),
    status_label VARCHAR(64),
    payment_status VARCHAR(64),
    timer_text VARCHAR(64),
    target_text VARCHAR(128),
    delayed BOOLEAN DEFAULT FALSE,
    station VARCHAR(32),
    subtotal DOUBLE PRECISION DEFAULT 0,
    service_charge DOUBLE PRECISION DEFAULT 0,
    grand_total DOUBLE PRECISION DEFAULT 0,
    created_at_time VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(32) REFERENCES orders(id) ON DELETE CASCADE,
    dish_id VARCHAR(32),
    name VARCHAR(128) NOT NULL,
    quantity INT NOT NULL,
    unit_price DOUBLE PRECISION NOT NULL,
    modifiers VARCHAR(255),
    kitchen_note VARCHAR(255),
    done BOOLEAN DEFAULT FALSE,
    done_by VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS ingredients (
    id VARCHAR(32) PRIMARY KEY,
    code VARCHAR(8) NOT NULL,
    name VARCHAR(128) NOT NULL,
    sku_subtext VARCHAR(128),
    category VARCHAR(64) NOT NULL,
    stock_qty DOUBLE PRECISION NOT NULL,
    unit VARCHAR(16) NOT NULL,
    unit_cost DOUBLE PRECISION NOT NULL,
    reorder_level DOUBLE PRECISION NOT NULL,
    supplier VARCHAR(128),
    status VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS staff_members (
    id VARCHAR(32) PRIMARY KEY,
    initials VARCHAR(8) NOT NULL,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    employee_code VARCHAR(32) NOT NULL,
    role VARCHAR(32) NOT NULL,
    station_note VARCHAR(64),
    branch_shift VARCHAR(128),
    pin_status VARCHAR(64),
    status VARCHAR(32) NOT NULL
);
