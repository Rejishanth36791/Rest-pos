import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Dish {
  id: string;
  sku: string;
  name: string;
  category: string;
  description: string;
  shortDesc: string;
  price: number;
  foodCost: number;
  marginPercent: number;
  prepTimeMinutes: number;
  station: string;
  available: boolean;
  popular: boolean;
  veg: boolean;
  chefPick: boolean;
  iconAsset: string;
  bgTint: string;
  soldToday: number;
}

export interface DiningTable {
  id: string;
  name: string;
  area: 'Ground Floor' | 'Upper Balcony' | 'VIP Lounge';
  seats: number;
  positionTag: string;
  status: 'AVAILABLE' | 'FOOD_READY' | 'PREPARING' | 'RESERVED' | 'NEW_ORDER' | 'CLEANING' | 'LATE_PREP';
  waiter: string;
  activeOrderId?: string | null;
  activeOrderTotal: number;
  orderSummary?: string | null;
  statusNote?: string | null;
  elapsedText?: string | null;
  reservationGuest?: string | null;
  reservationNote?: string | null;
}

export interface OrderItem {
  id?: number;
  dishId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  modifiers: string;
  kitchenNote?: string | null;
  done: boolean;
  doneBy?: string | null;
}

export interface Order {
  id: string;
  tableId: string;
  tableLabel: string;
  guestOrWaiter: string;
  waiterName: string;
  orderType: string;
  kdsStage: 'NEW' | 'PREPARING' | 'READY' | 'COMPLETED';
  statusLabel: string;
  paymentStatus: string;
  timerText: string;
  targetText: string;
  delayed: boolean;
  station: string;
  subtotal: number;
  serviceCharge: number;
  grandTotal: number;
  createdAtTime: string;
  items: OrderItem[];
}

export interface Ingredient {
  id: string;
  code: string;
  name: string;
  skuSubtext: string;
  category: string;
  stockQty: number;
  unit: string;
  unitCost: number;
  reorderLevel: number;
  supplier: string;
  status: 'LOW_STOCK' | 'HEALTHY' | 'FRESH_DAIRY' | 'DEPLETED';
}

export interface StaffMember {
  id: string;
  initials: string;
  name: string;
  email: string;
  employeeCode: string;
  role: 'Admin' | 'Manager' | 'Cashier' | 'Waiter' | 'Kitchen';
  stationNote: string;
  branchShift: string;
  pinStatus: string;
  status: 'Active' | 'On Break' | 'Offline';
}

export interface CartItem {
  cartItemId: string;
  dishId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  modifiers: string;
  kitchenNote?: string;
}

const INITIAL_DISHES: Dish[] = [
  {
    id: 'DISH-01',
    sku: 'SKU-104',
    name: 'Chicken Fried Rice',
    category: 'Rice & Biryani',
    description: 'Wok basmati rice, eggs, scallions',
    shortDesc: 'Wok basmati,…',
    price: 1650,
    foodCost: 480,
    marginPercent: 71,
    prepTimeMinutes: 10,
    station: 'Wok',
    available: true,
    popular: true,
    veg: false,
    chefPick: true,
    iconAsset: '/assets/figma/49f62cad-7820-4718-8af2-1151ad123891.svg',
    bgTint: '#fdf2f8',
    soldToday: 54,
  },
  {
    id: 'DISH-02',
    sku: 'SKU-108',
    name: 'Cheese Chicken Kottu',
    category: 'Kottu & Roti',
    description: 'Shredded roti, melted creamy cheese',
    shortDesc: 'Shredded…',
    price: 1950,
    foodCost: 560,
    marginPercent: 71,
    prepTimeMinutes: 12,
    station: 'Kottu',
    available: true,
    popular: true,
    veg: false,
    chefPick: false,
    iconAsset: '/assets/figma/bd7c6a93-4100-4d92-a677-73536de45f66.svg',
    bgTint: '#fffbeb',
    soldToday: 38,
  },
  {
    id: 'DISH-03',
    sku: 'SKU-112',
    name: 'Mutton Dum Biryani',
    category: 'Rice & Biryani',
    description: 'Slow cooked aged basmati & spiced mutton',
    shortDesc: 'Slow cooked…',
    price: 2450,
    foodCost: 790,
    marginPercent: 68,
    prepTimeMinutes: 15,
    station: 'Wok',
    available: true,
    popular: true,
    veg: false,
    chefPick: true,
    iconAsset: '/assets/figma/d63f54b8-8356-44c0-96a8-662f725d4bec.svg',
    bgTint: '#fdf2f8',
    soldToday: 19,
  },
  {
    id: 'DISH-04',
    sku: 'SKU-204',
    name: 'Pepper Beef Burger',
    category: 'Burgers',
    description: 'Brioche bun, pepper beef patty, fries',
    shortDesc: 'Brioche,…',
    price: 2100,
    foodCost: 640,
    marginPercent: 70,
    prepTimeMinutes: 11,
    station: 'Grill',
    available: true,
    popular: false,
    veg: false,
    chefPick: false,
    iconAsset: '/assets/figma/bdb3fbfd-fc71-42a8-b184-4852526b8d55.svg',
    bgTint: '#fff1f2',
    soldToday: 14,
  },
  {
    id: 'DISH-05',
    sku: 'SKU-118',
    name: 'Negombo Prawn Curry',
    category: 'Rice & Biryani',
    description: 'Spicy lagoon prawn gravy, roast paan',
    shortDesc: 'Spicy gravy, roast',
    price: 2600,
    foodCost: 820,
    marginPercent: 68,
    prepTimeMinutes: 14,
    station: 'Wok',
    available: true,
    popular: true,
    veg: false,
    chefPick: true,
    iconAsset: '/assets/figma/9b0a6f2d-d1a7-4ae3-8764-0a6543a4fedb.svg',
    bgTint: '#fffbeb',
    soldToday: 22,
  },
  {
    id: 'DISH-06',
    sku: 'SKU-301',
    name: 'Iced Milo Dinosaur',
    category: 'Beverages',
    description: 'Double malt heap, condensed milk',
    shortDesc: 'Malt heap,…',
    price: 750,
    foodCost: 180,
    marginPercent: 76,
    prepTimeMinutes: 4,
    station: 'Bar',
    available: true,
    popular: true,
    veg: true,
    chefPick: false,
    iconAsset: '/assets/figma/ff80636b-879b-4323-960a-e568f2d70a04.svg',
    bgTint: '#fdf2f8',
    soldToday: 41,
  },
  {
    id: 'DISH-07',
    sku: 'SKU-402',
    name: 'Jaggery Watalappam',
    category: 'Desserts',
    description: 'Kithul jaggery & coconut custard',
    shortDesc: 'Kithul jaggery…',
    price: 850,
    foodCost: 220,
    marginPercent: 74,
    prepTimeMinutes: 5,
    station: 'Bar',
    available: false,
    popular: false,
    veg: true,
    chefPick: false,
    iconAsset: '/assets/figma/14642a59-ddee-4cda-9e12-820f06d87f12.svg',
    bgTint: '#fff1f2',
    soldToday: 11,
  },
  {
    id: 'DISH-08',
    sku: 'SKU-305',
    name: 'Lime & Mint Soda',
    category: 'Beverages',
    description: 'Fresh crushed mint & lime soda',
    shortDesc: 'Fresh lime, mint',
    price: 650,
    foodCost: 130,
    marginPercent: 80,
    prepTimeMinutes: 3,
    station: 'Bar',
    available: true,
    popular: false,
    veg: true,
    chefPick: false,
    iconAsset: '/assets/figma/b9f672fa-e133-48b8-9057-45503b8933f0.svg',
    bgTint: '#fdf2f8',
    soldToday: 29,
  },
];

const INITIAL_TABLES: DiningTable[] = [
  {
    id: 'T-01',
    name: 'Table T-01',
    area: 'Ground Floor',
    seats: 2,
    positionTag: 'Window',
    status: 'AVAILABLE',
    waiter: 'Nisal R.',
    activeOrderTotal: 0,
    statusNote: 'Ready for guest seating',
  },
  {
    id: 'T-02',
    name: 'Table T-02',
    area: 'Ground Floor',
    seats: 4,
    positionTag: 'Center',
    status: 'FOOD_READY',
    waiter: 'Dilshan',
    activeOrderId: '#ORD-8490',
    activeOrderTotal: 5200,
    orderSummary: '2x Negombo Prawn Curry, 4x Roast Paan',
    statusNote: 'Kitchen ticket waiting at pass counter',
    elapsedText: '35m',
  },
  {
    id: 'T-04',
    name: 'Table T-04',
    area: 'Ground Floor',
    seats: 4,
    positionTag: 'Window',
    status: 'PREPARING',
    waiter: 'Nisal R.',
    activeOrderId: '#ORD-8492',
    activeOrderTotal: 6137,
    orderSummary: '1x Fried Rice, 1x Kottu, 2x Milo',
    statusNote: '1x Fried Rice, 1x Kottu, 2x Milo',
    elapsedText: '12m',
  },
  {
    id: 'T-05',
    name: 'Table T-05',
    area: 'Ground Floor',
    seats: 6,
    positionTag: 'Terrace',
    status: 'RESERVED',
    waiter: 'Nisal R.',
    activeOrderTotal: 0,
    elapsedText: '14:00 (18m)',
    reservationGuest: 'Dr. Chathura S.',
    reservationNote: 'Party of 5 · Birthday',
  },
  {
    id: 'T-08',
    name: 'Table T-08',
    area: 'Ground Floor',
    seats: 4,
    positionTag: 'Center',
    status: 'NEW_ORDER',
    waiter: 'Nisal R.',
    activeOrderId: '#ORD-8495',
    activeOrderTotal: 5900,
    orderSummary: '2x Chicken Fried Rice, 1x Prawn Curry',
    statusNote: 'Sent to kitchen 2 min ago',
    elapsedText: '02m',
  },
  {
    id: 'T-09',
    name: 'Table T-09',
    area: 'Ground Floor',
    seats: 2,
    positionTag: 'Window',
    status: 'CLEANING',
    waiter: 'Busboy',
    activeOrderTotal: 0,
    statusNote: 'Sanitizing surface and resetting menus.',
  },
  {
    id: 'T-11',
    name: 'Table T-11',
    area: 'Ground Floor',
    seats: 4,
    positionTag: 'Center',
    status: 'LATE_PREP',
    waiter: 'Dilshan',
    activeOrderId: '#ORD-8488',
    activeOrderTotal: 4900,
    orderSummary: '1x Mutton Dum Biryani',
    statusNote: 'Biryani delayed by 6 minutes! Check pass.',
    elapsedText: '18m',
  },
  {
    id: 'T-12',
    name: 'Table T-12',
    area: 'Ground Floor',
    seats: 8,
    positionTag: 'Center',
    status: 'AVAILABLE',
    waiter: 'Dilshan',
    activeOrderTotal: 0,
    statusNote: 'Cleaned & cutlery laid',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: '#ORD-8495',
    tableId: 'T-08',
    tableLabel: 'Table T-08',
    guestOrWaiter: 'Walk-in',
    waiterName: 'Nisal R.',
    orderType: 'DINE-IN · TABLE T-08',
    kdsStage: 'NEW',
    statusLabel: 'New',
    paymentStatus: 'Unpaid',
    timerText: '02:14',
    targetText: 'Waiter: Nisal R.',
    delayed: false,
    station: 'Wok',
    subtotal: 5363.64,
    serviceCharge: 536.36,
    grandTotal: 5900.0,
    createdAtTime: '13:40',
    items: [
      {
        dishId: 'DISH-01',
        name: 'Chicken Fried Rice',
        quantity: 2,
        unitPrice: 1650,
        modifiers: 'Large · Extra Chicken',
        kitchenNote: 'Note: Separate chili paste',
        done: false,
      },
      {
        dishId: 'DISH-05',
        name: 'Negombo Prawn Curry',
        quantity: 1,
        unitPrice: 2600,
        modifiers: '+2 Roast Paan',
        done: false,
      },
    ],
  },
  {
    id: '#ORD-8496',
    tableId: 'TAKEAWAY',
    tableLabel: 'Takeaway',
    guestOrWaiter: 'Malith Silva',
    waiterName: 'QR Online',
    orderType: 'TAKEAWAY · QR ONLINE',
    kdsStage: 'NEW',
    statusLabel: 'New',
    paymentStatus: 'Paid (Card)',
    timerText: '01:05',
    targetText: 'Malith Silva',
    delayed: false,
    station: 'Grill',
    subtotal: 2100.0,
    serviceCharge: 0,
    grandTotal: 2100.0,
    createdAtTime: '13:41',
    items: [
      {
        dishId: 'DISH-04',
        name: 'Pepper Beef Burger',
        quantity: 1,
        unitPrice: 2100,
        modifiers: 'Well-done, Extra fries',
        done: false,
      },
    ],
  },
  {
    id: '#ORD-8492',
    tableId: 'T-04',
    tableLabel: 'Table T-04',
    guestOrWaiter: 'Kasun P.',
    waiterName: 'Nisal R.',
    orderType: 'DINE-IN · TABLE T-04',
    kdsStage: 'PREPARING',
    statusLabel: 'Preparing',
    paymentStatus: 'Paid (Card)',
    timerText: '08:45',
    targetText: 'Target: 12m',
    delayed: false,
    station: 'Kottu',
    subtotal: 5579.55,
    serviceCharge: 557.95,
    grandTotal: 6137.5,
    createdAtTime: '13:33',
    items: [
      {
        dishId: 'DISH-01',
        name: 'Chicken Fried Rice',
        quantity: 1,
        unitPrice: 2450,
        modifiers: 'Large · Extra Chicken',
        done: true,
        doneBy: 'Chef Sahan',
      },
      {
        dishId: 'DISH-02',
        name: 'Cheese Chicken Kottu',
        quantity: 1,
        unitPrice: 1950,
        modifiers: 'Extra Spicy · On Wok',
        done: false,
      },
      {
        dishId: 'DISH-06',
        name: 'Iced Milo Dinosaur',
        quantity: 2,
        unitPrice: 750,
        modifiers: 'Double Malt',
        done: false,
      },
    ],
  },
  {
    id: '#ORD-8488',
    tableId: 'T-11',
    tableLabel: 'Table T-11',
    guestOrWaiter: 'Dilshan',
    waiterName: 'Dilshan',
    orderType: 'DINE-IN · TABLE T-11',
    kdsStage: 'PREPARING',
    statusLabel: 'Delayed',
    paymentStatus: 'Unpaid',
    timerText: '18:20',
    targetText: '+6m overdue',
    delayed: true,
    station: 'Wok',
    subtotal: 4454.55,
    serviceCharge: 445.45,
    grandTotal: 4900.0,
    createdAtTime: '13:24',
    items: [
      {
        dishId: 'DISH-03',
        name: 'Mutton Dum Biryani',
        quantity: 1,
        unitPrice: 2450,
        modifiers: 'Extra Egg, Jaffna Gravy',
        done: false,
      },
    ],
  },
  {
    id: '#ORD-8490',
    tableId: 'T-02',
    tableLabel: 'Table T-02',
    guestOrWaiter: 'Anura B.',
    waiterName: 'Dilshan',
    orderType: 'DINE-IN · TABLE T-02',
    kdsStage: 'READY',
    statusLabel: 'Food Ready',
    paymentStatus: 'Paid (Cash)',
    timerText: 'READY (01:40)',
    targetText: 'Dilshan paged',
    delayed: false,
    station: 'Wok',
    subtotal: 4727.27,
    serviceCharge: 472.73,
    grandTotal: 5200.0,
    createdAtTime: '13:07',
    items: [
      {
        dishId: 'DISH-05',
        name: '2x Negombo Prawn Curry',
        quantity: 2,
        unitPrice: 2600,
        modifiers: 'Lagoon Gravy',
        done: true,
        doneBy: 'Chef Sahan',
      },
      {
        dishId: 'DISH-02',
        name: '4x Woodfired Roast Paan',
        quantity: 4,
        unitPrice: 0,
        modifiers: 'Side',
        done: true,
        doneBy: 'Chef Sahan',
      },
    ],
  },
  {
    id: '#ORD-8489',
    tableId: 'TAKEAWAY',
    tableLabel: 'Pickup Desk',
    guestOrWaiter: 'Bag #4',
    waiterName: 'Kasun P.',
    orderType: 'TAKEAWAY · PACKED',
    kdsStage: 'READY',
    statusLabel: 'Food Ready',
    paymentStatus: 'Paid (Card)',
    timerText: 'PICKUP DESK',
    targetText: 'Bag #4',
    delayed: false,
    station: 'Bar',
    subtotal: 2150.0,
    serviceCharge: 0,
    grandTotal: 2150.0,
    createdAtTime: '13:20',
    items: [
      {
        dishId: 'DISH-08',
        name: '2x Lime & Mint Soda',
        quantity: 2,
        unitPrice: 650,
        modifiers: 'Chilled',
        done: true,
        doneBy: 'Barista',
      },
      {
        dishId: 'DISH-07',
        name: '1x Jaggery Watalappam',
        quantity: 1,
        unitPrice: 850,
        modifiers: 'Cashew Topping',
        done: true,
        doneBy: 'Barista',
      },
    ],
  },
  {
    id: '#ORD-8486',
    tableId: 'T-05',
    tableLabel: 'Table T-05',
    guestOrWaiter: 'Dr. Chathura S.',
    waiterName: 'Nisal R.',
    orderType: 'DINE-IN · TABLE T-05',
    kdsStage: 'COMPLETED',
    statusLabel: 'Fulfilled',
    paymentStatus: 'Paid (Card)',
    timerText: '13:28 (10m prep)',
    targetText: 'Table T-05 · 3x Cheese Kottu, 2x Milo',
    delayed: false,
    station: 'Kottu',
    subtotal: 6681.82,
    serviceCharge: 668.18,
    grandTotal: 7350.0,
    createdAtTime: '13:18',
    items: [
      {
        dishId: 'DISH-02',
        name: 'Cheese Chicken Kottu',
        quantity: 3,
        unitPrice: 1950,
        modifiers: 'Regular',
        done: true,
      },
      {
        dishId: 'DISH-06',
        name: 'Iced Milo Dinosaur',
        quantity: 2,
        unitPrice: 750,
        modifiers: 'Regular',
        done: true,
      },
    ],
  },
  {
    id: '#ORD-8485',
    tableId: 'T-01',
    tableLabel: 'Table T-01',
    guestOrWaiter: 'Walk-in Guest',
    waiterName: 'Nisal R.',
    orderType: 'DINE-IN · TABLE T-01',
    kdsStage: 'COMPLETED',
    statusLabel: 'Fulfilled',
    paymentStatus: 'Paid (Cash)',
    timerText: '13:15 (8m prep)',
    targetText: 'Table T-01 · 1x Dum Biryani, 1x Soda',
    delayed: false,
    station: 'Wok',
    subtotal: 2818.18,
    serviceCharge: 281.82,
    grandTotal: 3100.0,
    createdAtTime: '13:05',
    items: [
      {
        dishId: 'DISH-03',
        name: 'Mutton Dum Biryani',
        quantity: 1,
        unitPrice: 2450,
        modifiers: 'Regular',
        done: true,
      },
      {
        dishId: 'DISH-08',
        name: 'Lime & Mint Soda',
        quantity: 1,
        unitPrice: 650,
        modifiers: 'Regular',
        done: true,
      },
    ],
  },
];

const INITIAL_INGREDIENTS: Ingredient[] = [
  {
    id: 'ING-01',
    code: 'BR',
    name: 'Aged Basmati Rice',
    skuSubtext: 'SKU-ING-01 · 25kg Sacks',
    category: 'Grains & Meat',
    stockQty: 8.5,
    unit: 'kg',
    unitCost: 680,
    reorderLevel: 15.0,
    supplier: 'Lanka Grains Co.',
    status: 'LOW_STOCK',
  },
  {
    id: 'ING-02',
    code: 'CP',
    name: 'Free-Range Chicken Breast',
    skuSubtext: 'SKU-ING-04 · Chilled Halal',
    category: 'Grains & Meat',
    stockQty: 42.0,
    unit: 'kg',
    unitCost: 1450,
    reorderLevel: 12.0,
    supplier: 'Ceylon Poultry Farms',
    status: 'HEALTHY',
  },
  {
    id: 'ING-03',
    code: 'CC',
    name: 'Creamy Cheddar & Mozzarella',
    skuSubtext: 'SKU-ING-09 · Kottu Blend',
    category: 'Dairy',
    stockQty: 18.5,
    unit: 'kg',
    unitCost: 2200,
    reorderLevel: 8.0,
    supplier: 'Ambewela Dairy',
    status: 'FRESH_DAIRY',
  },
  {
    id: 'ING-04',
    code: 'LP',
    name: 'Negombo Lagoon Jumbo Prawns',
    skuSubtext: 'SKU-ING-14 · Fresh Catch',
    category: 'Seafood',
    stockQty: 0.0,
    unit: 'kg',
    unitCost: 3400,
    reorderLevel: 10.0,
    supplier: 'Negombo Fishery Harbor',
    status: 'DEPLETED',
  },
];

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'STF-01',
    initials: 'KP',
    name: 'Kasun Perera',
    email: 'kasun.perera@restroflow.lk',
    employeeCode: 'EMP-0142',
    role: 'Cashier',
    stationNote: 'Terminal #01',
    branchShift: 'Colombo Flagship · Shift #2',
    pinStatus: 'PIN #4482 · 2FA',
    status: 'Active',
  },
  {
    id: 'STF-02',
    initials: 'CS',
    name: 'Chef Sahan',
    email: 'sahan.wok@restroflow.lk',
    employeeCode: 'EMP-0108',
    role: 'Kitchen',
    stationNote: 'Hot Wok',
    branchShift: 'Colombo Flagship · Main Kitchen',
    pinStatus: 'KDS Badge #02',
    status: 'Active',
  },
  {
    id: 'STF-03',
    initials: 'NR',
    name: 'Nisal R.',
    email: 'nisal.floor@restroflow.lk',
    employeeCode: 'EMP-0165',
    role: 'Waiter',
    stationNote: 'Ground Floor',
    branchShift: 'Colombo Flagship · Dining Hall',
    pinStatus: 'PIN #1190',
    status: 'Active',
  },
  {
    id: 'STF-04',
    initials: 'DK',
    name: 'Dilshan K.',
    email: 'dilshan.mgr@restroflow.lk',
    employeeCode: 'EMP-0019',
    role: 'Manager',
    stationNote: 'All Zones',
    branchShift: 'Colombo Flagship · Full Access',
    pinStatus: 'Biometric + PIN',
    status: 'Active',
  },
];

interface RestroFlowContextType {
  dishes: Dish[];
  tables: DiningTable[];
  orders: Order[];
  ingredients: Ingredient[];
  staff: StaffMember[];
  activeTableId: string;
  setActiveTableId: (id: string) => void;
  posCart: CartItem[];
  addToPosCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  updatePosCartQty: (cartItemId: string, delta: number) => void;
  removeFromPosCart: (cartItemId: string) => void;
  clearPosCart: () => void;
  submitPosOrder: (paymentMethod?: string) => Order;
  qrCart: Record<string, number>;
  updateQrCart: (dishId: string, delta: number) => void;
  submitQrOrder: () => Order | null;
  advanceOrderKdsStage: (orderId: string, nextStage: Order['kdsStage']) => void;
  toggleOrderItemDone: (orderId: string, itemIdx: number) => void;
  updateTableStatus: (tableId: string, status: DiningTable['status']) => void;
  toggleDishAvailability: (dishId: string) => void;
  addDish: (dish: Omit<Dish, 'id'>) => void;
  restockIngredient: (ingId: string, amount: number) => void;
  addIngredient: (ing: Omit<Ingredient, 'id'>) => void;
  addStaffMember: (member: Omit<StaffMember, 'id'>) => void;
  quickDispatchOrder: (promptText: string, tableId: string, priority: string, orderType: string) => Order;
  currentUser: StaffMember;
  setCurrentUserByRole: (role: StaffMember['role']) => void;
  backendConnected: boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const RestroFlowContext = createContext<RestroFlowContextType | undefined>(undefined);

export const RestroFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dishes, setDishes] = useState<Dish[]>(INITIAL_DISHES);
  const [tables, setTables] = useState<DiningTable[]>(INITIAL_TABLES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [activeTableId, setActiveTableId] = useState<string>('T-04');
  const [currentUser, setCurrentUser] = useState<StaffMember>(INITIAL_STAFF[0]);
  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [posCart, setPosCart] = useState<CartItem[]>([
    {
      cartItemId: 'cart-1',
      dishId: 'DISH-01',
      name: 'Chicken Fried Rice',
      unitPrice: 2450,
      quantity: 1,
      modifiers: 'Large · Extra Chicken',
      kitchenNote: 'Separate chili paste',
    },
    {
      cartItemId: 'cart-2',
      dishId: 'DISH-02',
      name: 'Cheese Chicken Kottu',
      unitPrice: 1950,
      quantity: 1,
      modifiers: 'Regular · Extra Spicy',
    },
  ]);

  const [qrCart, setQrCart] = useState<Record<string, number>>({
    'DISH-01': 1,
    'DISH-06': 2,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Attempt to sync with Spring Boot Backend API on port 8080
  useEffect(() => {
    fetch('/api/bootstrap', {
      headers: { 'X-Staff-Role': currentUser.role.toUpperCase() },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Backend offline');
        return res.json();
      })
      .then((data) => {
        if (data.dishes?.length) setDishes(data.dishes);
        if (data.tables?.length) setTables(data.tables);
        if (data.orders?.length) setOrders(data.orders);
        if (data.ingredients?.length) setIngredients(data.ingredients);
        if (data.staff?.length) setStaff(data.staff);
        setBackendConnected(true);
      })
      .catch(() => {
        setBackendConnected(false);
      });
  }, []);

  const addToPosCart = (item: Omit<CartItem, 'cartItemId'>) => {
    setPosCart((prev) => {
      const existing = prev.find((c) => c.dishId === item.dishId && c.modifiers === item.modifiers);
      if (existing) {
        return prev.map((c) =>
          c.cartItemId === existing.cartItemId ? { ...c, quantity: c.quantity + item.quantity } : c
        );
      }
      return [...prev, { ...item, cartItemId: 'cart-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6) }];
    });
    showToast(`Added ${item.name} to ${activeTableId} ticket`);
  };

  const updatePosCartQty = (cartItemId: string, delta: number) => {
    setPosCart((prev) =>
      prev
        .map((c) => (c.cartItemId === cartItemId ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const removeFromPosCart = (cartItemId: string) => {
    setPosCart((prev) => prev.filter((c) => c.cartItemId !== cartItemId));
  };

  const clearPosCart = () => setPosCart([]);

  const deductIngredientsOnOrder = () => {
    setIngredients((prev) =>
      prev.map((ing) => {
        if (ing.id === 'ING-01' || ing.id === 'ING-02') {
          const nextQty = Math.max(0, Math.round((ing.stockQty - 0.3) * 10) / 10);
          const nextStatus =
            nextQty === 0 ? 'DEPLETED' : nextQty < ing.reorderLevel ? 'LOW_STOCK' : ing.status;
          return { ...ing, stockQty: nextQty, status: nextStatus };
        }
        return ing;
      })
    );
  };

  const submitPosOrder = (paymentMethod = 'Paid (Card)'): Order => {
    const subtotal = posCart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    const serviceCharge = Math.round(subtotal * 0.1);
    const grandTotal = subtotal + serviceCharge;
    const newId = `#ORD-${8497 + orders.length}`;
    const nowTime = new Date().toTimeString().slice(0, 5);

    const newOrder: Order = {
      id: newId,
      tableId: activeTableId,
      tableLabel: `Table ${activeTableId}`,
      guestOrWaiter: currentUser.name,
      waiterName: 'Nisal R.',
      orderType: `DINE-IN · TABLE ${activeTableId}`,
      kdsStage: 'NEW',
      statusLabel: 'New',
      paymentStatus: paymentMethod,
      timerText: '00:10',
      targetText: 'Waiter: Nisal R.',
      delayed: false,
      station: 'Wok',
      subtotal,
      serviceCharge,
      grandTotal,
      createdAtTime: nowTime,
      items: posCart.map((c) => ({
        dishId: c.dishId,
        name: c.name,
        quantity: c.quantity,
        unitPrice: c.unitPrice,
        modifiers: c.modifiers,
        kitchenNote: c.kitchenNote,
        done: false,
      })),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setTables((prev) =>
      prev.map((t) =>
        t.id === activeTableId
          ? {
              ...t,
              status: 'NEW_ORDER',
              activeOrderId: newId,
              activeOrderTotal: grandTotal,
              orderSummary: posCart.map((i) => `${i.quantity}x ${i.name}`).join(', '),
              statusNote: 'Sent to kitchen just now',
              elapsedText: '01m',
            }
          : t
      )
    );
    deductIngredientsOnOrder();

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Staff-Role': currentUser.role.toUpperCase() },
      body: JSON.stringify(newOrder),
    }).catch(() => {});

    showToast(`Order ${newId} dispatched to KDS & Inventory auto-deducted!`);
    return newOrder;
  };

  const updateQrCart = (dishId: string, delta: number) => {
    setQrCart((prev) => {
      const next = (prev[dishId] || 0) + delta;
      const copy = { ...prev };
      if (next <= 0) delete copy[dishId];
      else copy[dishId] = next;
      return copy;
    });
  };

  const submitQrOrder = (): Order | null => {
    const entries = Object.entries(qrCart);
    if (entries.length === 0) return null;
    const orderItems: OrderItem[] = entries.map(([dishId, qty]) => {
      const d = dishes.find((x) => x.id === dishId) || dishes[0];
      return {
        dishId: d.id,
        name: d.name,
        quantity: qty,
        unitPrice: d.price,
        modifiers: 'QR Guest Selection',
        done: false,
      };
    });
    const subtotal = orderItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const serviceCharge = Math.round(subtotal * 0.1);
    const grandTotal = subtotal + serviceCharge;
    const newId = `#ORD-${8497 + orders.length}`;

    const newOrder: Order = {
      id: newId,
      tableId: 'T-04',
      tableLabel: 'Table T-04',
      guestOrWaiter: 'QR Guest · T-04',
      waiterName: 'QR Online',
      orderType: 'DINE-IN · QR MOBILE',
      kdsStage: 'NEW',
      statusLabel: 'New',
      paymentStatus: 'Unpaid',
      timerText: '00:05',
      targetText: 'Table T-04 QR',
      delayed: false,
      station: 'Wok',
      subtotal,
      serviceCharge,
      grandTotal,
      createdAtTime: new Date().toTimeString().slice(0, 5),
      items: orderItems,
    };

    setOrders((prev) => [newOrder, ...prev]);
    deductIngredientsOnOrder();
    showToast(`QR Order ${newId} sent to Kitchen Display System!`);
    return newOrder;
  };

  const advanceOrderKdsStage = (orderId: string, nextStage: Order['kdsStage']) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const statusMap: Record<Order['kdsStage'], string> = {
          NEW: 'New',
          PREPARING: 'Preparing',
          READY: 'Food Ready',
          COMPLETED: 'Fulfilled',
        };
        const timerMap: Record<Order['kdsStage'], string> = {
          NEW: '01:00',
          PREPARING: '05:12',
          READY: 'READY (00:30)',
          COMPLETED: `${o.createdAtTime} (9m prep)`,
        };
        return {
          ...o,
          kdsStage: nextStage,
          statusLabel: statusMap[nextStage],
          timerText: timerMap[nextStage],
          delayed: false,
          items: nextStage === 'READY' || nextStage === 'COMPLETED'
            ? o.items.map((it) => ({ ...it, done: true, doneBy: it.doneBy || 'Chef Sahan' }))
            : o.items,
        };
      })
    );

    const targetOrder = orders.find((o) => o.id === orderId);
    if (targetOrder && targetOrder.tableId !== 'TAKEAWAY') {
      setTables((prev) =>
        prev.map((t) => {
          if (t.id !== targetOrder.tableId) return t;
          if (nextStage === 'PREPARING') return { ...t, status: 'PREPARING', statusNote: 'Kitchen preparing ticket' };
          if (nextStage === 'READY') return { ...t, status: 'FOOD_READY', statusNote: 'Kitchen ticket waiting at pass counter' };
          if (nextStage === 'COMPLETED') return { ...t, status: 'CLEANING', statusNote: 'Sanitizing surface and resetting menus.' };
          return t;
        })
      );
    }

    fetch(`/api/orders/${encodeURIComponent(orderId.replace('#', ''))}/stage`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-Staff-Role': currentUser.role.toUpperCase() },
      body: JSON.stringify({ kdsStage: nextStage }),
    }).catch(() => {});

    showToast(`Ticket ${orderId} moved to ${nextStage}`);
  };

  const toggleOrderItemDone = (orderId: string, itemIdx: number) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const nextItems = o.items.map((it, idx) =>
          idx === itemIdx ? { ...it, done: !it.done, doneBy: !it.done ? 'Chef Sahan' : undefined } : it
        );
        return { ...o, items: nextItems };
      })
    );
  };

  const updateTableStatus = (tableId: string, status: DiningTable['status']) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        if (status === 'AVAILABLE') {
          return {
            ...t,
            status: 'AVAILABLE',
            activeOrderId: null,
            activeOrderTotal: 0,
            orderSummary: null,
            statusNote: 'Ready for guest seating',
            elapsedText: null,
          };
        }
        return { ...t, status };
      })
    );

    fetch(`/api/tables/${tableId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-Staff-Role': currentUser.role.toUpperCase() },
      body: JSON.stringify({ status }),
    }).catch(() => {});

    showToast(`Table ${tableId} updated to ${status.replace('_', ' ')}`);
  };

  const toggleDishAvailability = (dishId: string) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, available: !d.available } : d))
    );
    fetch(`/api/dishes/${dishId}/toggle-availability`, {
      method: 'PATCH',
      headers: { 'X-Staff-Role': currentUser.role.toUpperCase() },
    }).catch(() => {});
    showToast('Updated dish stock status');
  };

  const addDish = (dish: Omit<Dish, 'id'>) => {
    const newDish: Dish = {
      ...dish,
      id: `DISH-0${dishes.length + 1}`,
    };
    setDishes((prev) => [newDish, ...prev]);
    fetch('/api/dishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Staff-Role': currentUser.role.toUpperCase() },
      body: JSON.stringify(newDish),
    }).catch(() => {});
    showToast(`Added "${dish.name}" to Menu Catalog`);
  };

  const restockIngredient = (ingId: string, amount: number) => {
    setIngredients((prev) =>
      prev.map((ing) => {
        if (ing.id !== ingId) return ing;
        const nextQty = Math.round((ing.stockQty + amount) * 10) / 10;
        const nextStatus =
          nextQty >= ing.reorderLevel
            ? ing.category === 'Dairy'
              ? 'FRESH_DAIRY'
              : 'HEALTHY'
            : 'LOW_STOCK';
        return { ...ing, stockQty: nextQty, status: nextStatus };
      })
    );
    fetch(`/api/ingredients/${ingId}/restock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-Staff-Role': currentUser.role.toUpperCase() },
      body: JSON.stringify({ amount }),
    }).catch(() => {});
    showToast(`Restocked +${amount}kg to Inventory Ledger`);
  };

  const addIngredient = (ing: Omit<Ingredient, 'id'>) => {
    const newIng: Ingredient = { ...ing, id: `ING-0${ingredients.length + 1}` };
    setIngredients((prev) => [newIng, ...prev]);
    showToast(`Added ingredient "${ing.name}"`);
  };

  const addStaffMember = (member: Omit<StaffMember, 'id'>) => {
    const newMember: StaffMember = { ...member, id: `STF-0${staff.length + 1}` };
    setStaff((prev) => [newMember, ...prev]);
    fetch('/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Staff-Role': currentUser.role.toUpperCase() },
      body: JSON.stringify(newMember),
    }).catch(() => {});
    showToast(`Invited ${member.name} (${member.role}) to RestroFlow RBAC`);
  };

  const quickDispatchOrder = (promptText: string, tableId: string, priority: string, orderType: string): Order => {
    const newId = `#ORD-${8497 + orders.length}`;
    const matchedDish =
      dishes.find((d) => promptText.toLowerCase().includes(d.name.toLowerCase().split(' ')[0])) || dishes[0];
    const subtotal = matchedDish.price * 2;
    const serviceCharge = Math.round(subtotal * 0.1);
    const grandTotal = subtotal + serviceCharge;

    const newOrder: Order = {
      id: newId,
      tableId: orderType === 'Takeaway' ? 'TAKEAWAY' : tableId,
      tableLabel: orderType === 'Takeaway' ? 'Takeaway' : `Table ${tableId}`,
      guestOrWaiter: `${currentUser.name} (${priority})`,
      waiterName: 'Nisal R.',
      orderType: orderType === 'Takeaway' ? 'TAKEAWAY · FAST DISPATCH' : `DINE-IN · TABLE ${tableId}`,
      kdsStage: 'NEW',
      statusLabel: 'New',
      paymentStatus: 'Unpaid',
      timerText: '00:05',
      targetText: priority,
      delayed: priority.toLowerCase().includes('high'),
      station: matchedDish.station,
      subtotal,
      serviceCharge,
      grandTotal,
      createdAtTime: new Date().toTimeString().slice(0, 5),
      items: [
        {
          dishId: matchedDish.id,
          name: matchedDish.name,
          quantity: 2,
          unitPrice: matchedDish.price,
          modifiers: promptText.trim() || 'Quick Terminal Dispatch',
          done: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    deductIngredientsOnOrder();
    showToast(`Dispatched ${newId} to KDS (${tableId})`);
    return newOrder;
  };

  const setCurrentUserByRole = (role: StaffMember['role']) => {
    const found = staff.find((s) => s.role.toLowerCase() === role.toLowerCase());
    if (found) {
      setCurrentUser(found);
    } else {
      setCurrentUser({
        id: 'STF-ADMIN',
        initials: role.slice(0, 2).toUpperCase(),
        name: `${role} User`,
        email: `${role.toLowerCase()}@restroflow.lk`,
        employeeCode: 'EMP-0001',
        role,
        stationNote: 'All Terminals',
        branchShift: 'Colombo Flagship',
        pinStatus: '2FA Active',
        status: 'Active',
      });
    }
    showToast(`Switched active session role to ${role}`);
  };

  return (
    <RestroFlowContext.Provider
      value={{
        dishes,
        tables,
        orders,
        ingredients,
        staff,
        activeTableId,
        setActiveTableId,
        posCart,
        addToPosCart,
        updatePosCartQty,
        removeFromPosCart,
        clearPosCart,
        submitPosOrder,
        qrCart,
        updateQrCart,
        submitQrOrder,
        advanceOrderKdsStage,
        toggleOrderItemDone,
        updateTableStatus,
        toggleDishAvailability,
        addDish,
        restockIngredient,
        addIngredient,
        addStaffMember,
        quickDispatchOrder,
        currentUser,
        setCurrentUserByRole,
        backendConnected,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </RestroFlowContext.Provider>
  );
};

export const useRestroFlow = () => {
  const ctx = useContext(RestroFlowContext);
  if (!ctx) throw new Error('useRestroFlow must be used inside RestroFlowProvider');
  return ctx;
};
