import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestroFlow } from '../context/RestroFlowContext';

const ASSETS = {
  brandLogo: '/assets/figma/6252373a-2ce5-4b10-853a-a85cfedf81d9.svg',
  newOrderPlus: '/assets/figma/7b3bff58-d31c-42c5-9309-ff600fd9811a.svg',
  navDash: '/assets/figma/04ee6187-b70e-4e78-9efa-294d88bb336e.svg',
  navPos: '/assets/figma/5c7e5267-ecd5-47b0-b4a2-58a22876906c.svg',
  navKds: '/assets/figma/c2a9b733-4d70-46df-9684-e7e57a547f60.svg',
  navTables: '/assets/figma/b6b93958-c47e-4693-9743-9266ad991c23.svg',
  navOrders: '/assets/figma/c0afbd63-561e-4895-a851-944cb138f387.svg',
  searchIcon: '/assets/figma/0e2a1c47-2c38-45ed-b67b-5fd484314f37.svg',
  searchRightIcon: '/assets/figma/9d045cf7-9abd-4cc2-9eee-b3c61eff06f6.svg',
  dateIcon: '/assets/figma/02f7bc34-24b7-46d2-9487-50d34cfe6c75.svg',
  sunIcon: '/assets/figma/05359feb-8c37-4d6d-bb59-ba74c8bff202.svg',
  statTotal: '/assets/figma/65719aff-16d9-43c7-91d2-63dd49131c89.svg',
  statCompleted: '/assets/figma/4111332e-2c0e-4044-926c-a38e7b669989.svg',
  statPending: '/assets/figma/b631f006-45b7-46e8-b3a6-78467da9a447.svg',
  statUrgent: '/assets/figma/a556879e-49eb-4f9c-9bf1-45dcac97ad0b.svg',
  priorityIcon: '/assets/figma/7aae93c4-e623-4d55-a66b-27313d9b0d08.svg',
  chevronDown: '/assets/figma/52c18a73-bf40-44ed-8b42-76a806ef0c24.svg',
  tableAssignIcon: '/assets/figma/d7776e34-44d2-4bec-8fd8-eeb3ed9e3ccd.svg',
  sendOrderIcon: '/assets/figma/62c56236-d70e-42be-b96b-f86ffacb4dcf.svg',
  viewAllArrow: '/assets/figma/5514d816-5957-4a37-812a-8180994161c3.svg',
};

export const RestaurantDashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const { orders, quickDispatchOrder, showToast } = useRestroFlow();

  const [dispatchText, setDispatchText] = useState('');
  const [priority, setPriority] = useState('Medium Priority');
  const [selectedTable, setSelectedTable] = useState('T-04');
  const [orderPreset, setOrderPreset] = useState<'Dine-in' | 'Takeaway'>('Dine-in');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDispatch = () => {
    quickDispatchOrder(
      dispatchText || '2x Chicken Fried Rice, 1x Milo Dinosaur',
      selectedTable,
      priority,
      orderPreset
    );
    setDispatchText('');
  };

  const pendingKitchenCount = orders.filter(
    (o) => o.kdsStage === 'NEW' || o.kdsStage === 'PREPARING'
  ).length;
  const urgentDelayedCount = orders.filter((o) => o.delayed).length;

  const filteredLiveOrders = orders.filter((o) =>
    searchQuery.trim()
      ? o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.tableLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.guestOrWaiter.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="flex min-h-screen w-full bg-[#fff1f2] text-[#1c1917]" data-node-id="1:655">
      {/* LEFT NAVIGATION BAR */}
      <aside className="w-[256px] bg-white border-r border-[#ffe4e6] px-[20px] py-[20px] flex flex-col justify-between shrink-0 min-h-[1024px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[12px] pb-[24px] px-[4px]">
            <div className="size-[40px] rounded-[20px] wine-logo-gradient flex items-center justify-center shadow-[0px_4px_6px_-1px_rgba(122,12,46,0.2)]">
              <img src={ASSETS.brandLogo} alt="RestroFlow" className="size-[24px]" />
            </div>
            <div>
              <p className="font-bold text-[16px] leading-[20px] tracking-[-0.4px] text-[#1c1917]">
                RestroFlow.
              </p>
              <p className="font-semibold text-[11px] leading-[14px] tracking-[0.55px] text-[#4c0519] uppercase mt-1">
                HOSPITALITY VAULT
              </p>
            </div>
          </div>

          {/* Prominent Primary Action Button (+ New Order) */}
          <button
            onClick={() => navigate('/pos')}
            className="w-full wine-pill-gradient text-white rounded-full px-[16px] py-[12px] flex items-center justify-center gap-[8px] shadow-[0px_10px_15px_-3px_rgba(122,12,46,0.25)] hover:opacity-95 transition"
          >
            <img src={ASSETS.newOrderPlus} alt="" className="size-[20px]" />
            <span className="font-semibold text-[12px] leading-[16px]">New Order</span>
          </button>

          <div className="pt-[24px] px-[12px]">
            <p className="font-bold text-[11px] leading-[16.5px] tracking-[0.55px] text-[#4c0519] uppercase">
              VIEWS
            </p>
          </div>

          <nav className="flex flex-col gap-[6px]">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-[#fff1f2] border border-[#ffe4e6] rounded-[20px] px-[15px] py-[11px] flex items-center justify-between"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navDash} alt="" className="size-[20px]" />
                <span className="font-bold text-[12px] leading-[16px] text-[#881337]">Dashboard</span>
              </div>
              <span className="size-[20px] rounded-full bg-[#881337] text-white font-mono-num font-bold text-[11px] flex items-center justify-center">
                4
              </span>
            </button>

            <button
              onClick={() => navigate('/pos')}
              className="w-full rounded-[20px] px-[14px] py-[10px] flex items-center justify-between hover:bg-[#fff1f2] transition"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navPos} alt="" className="size-[20px]" />
                <span className="font-medium text-[12px] leading-[16px] text-[#1c1917]">
                  POS Terminal
                </span>
              </div>
              <span className="font-mono-num font-medium text-[11px] text-[#4c0519]">0</span>
            </button>

            <button
              onClick={() => navigate('/kds')}
              className="w-full rounded-[20px] px-[14px] py-[10px] flex items-center justify-between hover:bg-[#fff1f2] transition"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navKds} alt="" className="size-[20px]" />
                <span className="font-medium text-[12px] leading-[16px] text-[#1c1917]">
                  Kitchen Display
                </span>
              </div>
              <span className="font-mono-num font-medium text-[11px] text-[#4c0519]">3</span>
            </button>

            <button
              onClick={() => navigate('/tables')}
              className="w-full rounded-[20px] px-[14px] py-[10px] flex items-center justify-between hover:bg-[#fff1f2] transition"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navTables} alt="" className="size-[20px]" />
                <span className="font-medium text-[12px] leading-[16px] text-[#1c1917]">
                  Tables &amp; Floor
                </span>
              </div>
              <span className="font-mono-num font-medium text-[11px] text-[#4c0519]">0</span>
            </button>

            <button
              onClick={() => navigate('/orders')}
              className="w-full rounded-[20px] px-[14px] py-[10px] flex items-center justify-between hover:bg-[#fff1f2] transition"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navOrders} alt="" className="size-[20px]" />
                <span className="font-medium text-[12px] leading-[16px] text-[#1c1917]">
                  All Orders
                </span>
              </div>
              <span className="font-mono-num font-medium text-[11px] text-[#4c0519]">2</span>
            </button>

            <div className="pt-3 px-[12px]">
              <p className="font-bold text-[10px] tracking-[0.55px] text-[#4c0519] uppercase">
                BACK-OFFICE &amp; MOBILE
              </p>
            </div>

            <button
              onClick={() => navigate('/menu')}
              className="w-full rounded-[20px] px-[14px] py-[8px] flex items-center justify-between hover:bg-[#fff1f2] text-left text-[12px] font-medium text-[#1c1917]"
            >
              <span>Menu Management</span>
              <span className="font-mono-num text-[11px] text-[#4c0519]">48</span>
            </button>
            <button
              onClick={() => navigate('/inventory')}
              className="w-full rounded-[20px] px-[14px] py-[8px] flex items-center justify-between hover:bg-[#fff1f2] text-left text-[12px] font-medium text-[#1c1917]"
            >
              <span>Inventory &amp; Recipes</span>
              <span className="font-mono-num text-[11px] text-[#4c0519]">84</span>
            </button>
            <button
              onClick={() => navigate('/staff')}
              className="w-full rounded-[20px] px-[14px] py-[8px] flex items-center justify-between hover:bg-[#fff1f2] text-left text-[12px] font-medium text-[#1c1917]"
            >
              <span>Staff &amp; RBAC</span>
              <span className="font-mono-num text-[11px] text-[#4c0519]">20</span>
            </button>
            <button
              onClick={() => navigate('/qr-order')}
              className="w-full rounded-[20px] px-[14px] py-[8px] flex items-center justify-between hover:bg-[#fff1f2] text-left text-[12px] font-medium text-[#881337]"
            >
              <span>Mobile QR Ordering</span>
              <span className="font-mono-num text-[10px] bg-[#fce7f3] px-1.5 py-0.5 rounded-full">
                T-04
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom Status Card */}
        <div className="border-t border-[#ffe4e6] pt-[17px] flex flex-col gap-[8px]">
          <div className="bg-[#fff1f2] border border-[#ffe4e6] rounded-full px-[15px] py-[9px] flex items-center gap-[8px]">
            <span className="size-[8px] rounded-full bg-[#15803d]" />
            <span className="font-semibold text-[11px] leading-[14px] text-[#1c1917]">
              Local Sync Active
            </span>
          </div>
          <p className="px-[4px] text-[11px] leading-[16.5px] text-[#4c0519]">
            RestroFlow v3.4 · Offline Ready
          </p>
        </div>
      </aside>

      {/* MAIN DASHBOARD CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP HEADER */}
        <header className="h-[80px] px-[32px] flex items-center justify-between shrink-0">
          <div>
            <p className="font-bold text-[11px] leading-[13.75px] tracking-[1.1px] text-[#881337] uppercase">
              GOOD EVENING
            </p>
            <h1 className="font-bold text-[20px] leading-[28px] tracking-[-0.15px] text-[#1c1917]">
              Ready to serve your dining guests?
            </h1>
          </div>

          <div className="flex items-center gap-[12px]">
            <div className="relative w-[288px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, dishes..."
                className="w-full h-[34px] bg-white border border-[#ffe4e6] rounded-full pl-[40px] pr-[36px] text-[12px] text-[#1c1917] placeholder-[#6b7280] focus:outline-none focus:border-[#881337]"
              />
              <img
                src={ASSETS.searchIcon}
                alt=""
                className="absolute left-[14px] top-[8px] size-[18px]"
              />
              <img
                src={ASSETS.searchRightIcon}
                alt=""
                className="absolute right-[12px] top-[9px] size-[16px]"
              />
            </div>

            <div className="bg-white border border-[#ffe4e6] rounded-full px-[17px] py-[9px] flex items-center gap-[6px]">
              <img src={ASSETS.dateIcon} alt="" className="size-[16px]" />
              <span className="font-medium text-[11px] leading-[14px] text-[#1c1917]">
                Thu, Nov 19
              </span>
            </div>

            <button
              onClick={() => navigate('/kds')}
              title="Switch to Dark KDS Mode"
              className="size-[36px] rounded-full bg-white border border-[#ffe4e6] flex items-center justify-center hover:bg-[#fff1f2]"
            >
              <img src={ASSETS.sunIcon} alt="" className="size-[18px]" />
            </button>
          </div>
        </header>

        {/* CONTENT BODY */}
        <main className="px-[32px] pb-[40px] flex flex-col gap-[24px]">
          {/* TASKFLOW HERO BANNER */}
          <div className="wine-gradient rounded-[24px] p-[32px] flex items-center justify-between relative overflow-hidden shadow-[0px_20px_25px_-5px_rgba(122,12,46,0.2)]">
            <div className="flex flex-col gap-[6px] z-10">
              <div className="backdrop-blur-[4px] bg-white/15 rounded-full px-[12px] py-[4px] flex items-center gap-[6px] w-fit">
                <span className="size-[6px] rounded-full bg-[#34d399]" />
                <span className="font-semibold text-[11px] leading-[14px] tracking-[0.275px] text-white">
                  HOSPITALITY FLOW
                </span>
              </div>
              <h2 className="pt-[6px] font-bold text-[28px] leading-[36px] tracking-[-0.25px] text-white">
                Active Restaurant Flow
              </h2>
              <p className="text-[14px] leading-[20px] text-white/80 max-w-[512px]">
                Monitor real-time kitchen efficiency, floor occupancy, and revenue pacing for
                <br />
                Colombo 03 Flagship.
              </p>
            </div>

            <div className="absolute bg-white/10 blur-[40px] right-[-64px] top-[-64px] size-[256px] rounded-full pointer-events-none" />

            {/* Circular Completion Rate Card */}
            <div className="backdrop-blur-[12px] bg-white/15 border border-white/20 rounded-[24px] pl-[16px] pr-[21px] py-[21px] flex items-center gap-[14px] shadow-lg z-10">
              <div className="size-[52px] rounded-full border-4 border-white/80 flex items-center justify-center">
                <span className="font-mono-num font-bold text-[14px] text-white">67%</span>
              </div>
              <div>
                <p className="font-medium text-[11px] leading-[14px] text-white">
                  Order Fulfillment
                </p>
                <p className="font-bold text-[16px] leading-[24px] text-white">Making Progress</p>
              </div>
            </div>
          </div>

          {/* 4 METRIC STAT CARDS */}
          <div className="grid grid-cols-4 gap-[16px]">
            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">Total Orders</span>
                <div className="size-[36px] rounded-[20px] bg-[#fce7f3] flex items-center justify-center">
                  <img src={ASSETS.statTotal} alt="" className="size-[20px]" />
                </div>
              </div>
              <div className="flex flex-col gap-[9.5px]">
                <span className="font-mono-num font-bold text-[36px] leading-[44px] tracking-[-0.5px] text-[#1c1917]">
                  {134 + orders.length}
                </span>
                <span className="text-[12px] leading-[16px] text-[#4c0519]">
                  Registered daily tickets
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">
                  Fulfilled &amp; Paid
                </span>
                <div className="size-[36px] rounded-[20px] bg-[#d1fae5] flex items-center justify-center">
                  <img src={ASSETS.statCompleted} alt="" className="size-[20px]" />
                </div>
              </div>
              <div className="flex flex-col gap-[9.5px]">
                <span className="font-mono-num font-bold text-[36px] leading-[44px] tracking-[-0.5px] text-[#1c1917]">
                  129
                </span>
                <span className="font-semibold text-[12px] leading-[16px] text-[#15803d]">
                  129 finished &amp; billed
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">Kitchen Pending</span>
                <div className="size-[36px] rounded-[20px] bg-[#fef3c7] flex items-center justify-center">
                  <img src={ASSETS.statPending} alt="" className="size-[20px]" />
                </div>
              </div>
              <div className="flex flex-col gap-[9.5px]">
                <span className="font-mono-num font-bold text-[36px] leading-[44px] tracking-[-0.5px] text-[#1c1917]">
                  {pendingKitchenCount + 4}
                </span>
                <span className="font-semibold text-[12px] leading-[16px] text-[#9a3412]">
                  {pendingKitchenCount + 4} remaining in prep
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">High Priority</span>
                <div className="size-[36px] rounded-[20px] bg-[#fce7f3] flex items-center justify-center">
                  <img src={ASSETS.statUrgent} alt="" className="size-[20px]" />
                </div>
              </div>
              <div className="flex flex-col gap-[9.5px]">
                <span className="font-mono-num font-bold text-[36px] leading-[44px] tracking-[-0.5px] text-[#1c1917]">
                  {urgentDelayedCount}
                </span>
                <span className="font-semibold text-[12px] leading-[16px] text-[#be123c]">
                  {urgentDelayedCount} urgent table delayed
                </span>
              </div>
            </div>
          </div>

          {/* QUICK ORDER DISPATCH */}
          <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col gap-[16px] shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <span className="size-[10px] rounded-full bg-[#881337]" />
                <h3 className="font-bold text-[16px] leading-[24px] text-[#1c1917]">
                  Quick Order Terminal Dispatch
                </h3>
              </div>
              <div className="flex items-center gap-1 font-mono-num text-[11px] text-[#4c0519]">
                <span>Press</span>
                <kbd className="bg-[#fff1f2] border border-[#ffe4e6] px-[7px] py-[2px] rounded-[12px] font-bold">
                  Enter
                </kbd>
                <span>to route instantly</span>
              </div>
            </div>

            <input
              type="text"
              value={dispatchText}
              onChange={(e) => setDispatchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleDispatch();
              }}
              placeholder="What dish or order needs to be dispatched? (e.g. 2x Chicken Fried Rice, 1x Milo Dinosaur for Table T-04)"
              className="w-full bg-[#fff1f2] border border-[#ffe4e6] rounded-[20px] px-[17px] py-[14px] text-[14px] text-[#1c1917] placeholder-[#4c0519]/60 focus:outline-none focus:border-[#881337]"
            />

            <div className="flex flex-wrap items-center justify-between gap-y-[16px] pt-[4px]">
              <div className="flex flex-wrap items-center gap-[12px]">
                {/* Priority Dropdown */}
                <div className="flex items-center gap-[8px]">
                  <img src={ASSETS.priorityIcon} alt="" className="size-[16px]" />
                  <span className="font-medium text-[11px] text-[#1c1917]">Priority:</span>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="bg-white border border-[#ffe4e6] rounded-[20px] px-[13px] py-[7px] font-semibold text-[11px] text-[#1c1917] focus:outline-none"
                  >
                    <option value="Medium Priority">Medium Priority</option>
                    <option value="High Priority">High Priority</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>

                {/* Table Assignment */}
                <div className="flex items-center gap-[8px]">
                  <img src={ASSETS.tableAssignIcon} alt="" className="size-[16px]" />
                  <span className="font-medium text-[11px] text-[#1c1917]">Table:</span>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="bg-white border border-[#ffe4e6] rounded-[20px] px-[13px] py-[7px] font-semibold text-[11px] text-[#1c1917] focus:outline-none"
                  >
                    <option value="T-04">Table T-04 (Dine-in)</option>
                    <option value="T-01">Table T-01 (Dine-in)</option>
                    <option value="T-02">Table T-02 (Dine-in)</option>
                    <option value="T-08">Table T-08 (Dine-in)</option>
                    <option value="T-12">Table T-12 (Dine-in)</option>
                  </select>
                </div>

                {/* Quick Preset Pills */}
                <div className="flex items-center gap-[6px]">
                  {(['Dine-in', 'Takeaway'] as const).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setOrderPreset(preset)}
                      className={`px-[13px] py-[7px] rounded-[20px] border text-[11px] font-medium transition ${
                        orderPreset === preset
                          ? 'bg-[#fce7f3] border-[#881337] text-[#881337] font-bold'
                          : 'bg-[#fff1f2] border-[#ffe4e6] text-[#1c1917]'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleDispatch}
                className="wine-pill-gradient text-white rounded-full px-[24px] py-[10px] flex items-center gap-[6px] shadow-[0px_4px_6px_-1px_rgba(122,12,46,0.2)] hover:opacity-95 transition"
              >
                <img src={ASSETS.sendOrderIcon} alt="" className="size-[18px]" />
                <span className="font-bold text-[12px] leading-[16px]">Send Order</span>
              </button>
            </div>
          </div>

          {/* LOWER SPLIT: POPULAR PRODUCTS & RECENT ORDERS TABLE */}
          <div className="grid grid-cols-3 gap-[24px]">
            {/* Top Selling Dishes (1 col) */}
            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col gap-[20px] shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[16px] leading-[24px] text-[#1c1917]">
                  Top Dishes Today
                </h3>
                <span className="font-bold text-[11px] leading-[14px] text-[#881337]">
                  LKR 254k
                </span>
              </div>

              <div className="flex flex-col gap-[16px]">
                {[
                  { rank: '01', name: 'Chicken Fried Rice', portions: '54 portions', revenue: 'LKR 89,100' },
                  { rank: '02', name: 'Cheese Kottu', portions: '38 portions', revenue: 'LKR 74,100' },
                  { rank: '03', name: 'Negombo Prawn Curry', portions: '22 portions', revenue: 'LKR 57,200' },
                ].map((item) => (
                  <div key={item.rank} className="flex items-center justify-between">
                    <div className="flex items-center gap-[12px]">
                      <div className="size-[32px] rounded-[20px] bg-[#fce7f3] flex items-center justify-center font-mono-num font-bold text-[11px] text-[#881337]">
                        {item.rank}
                      </div>
                      <div>
                        <p className="font-bold text-[12px] leading-[16px] text-[#1c1917]">
                          {item.name}
                        </p>
                        <p className="text-[12px] leading-[16px] text-[#4c0519]">
                          {item.portions}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono-num font-bold text-[12px] text-[#1c1917]">
                      {item.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders (2 cols) */}
            <div className="col-span-2 bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col gap-[16px] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[16px] leading-[24px] text-[#1c1917]">
                    Live Order Flow
                  </h3>
                  <p className="text-[12px] leading-[16px] text-[#4c0519]">
                    Recent dining floor and takeaway transactions
                  </p>
                </div>

                <button
                  onClick={() => navigate('/orders')}
                  className="flex items-center gap-[4px] font-bold text-[11px] text-[#881337] hover:underline"
                >
                  <span>View All (142)</span>
                  <img src={ASSETS.viewAllArrow} alt="" className="size-[16px]" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#ffe4e6] text-[11px] font-bold text-[#4c0519]">
                      <th className="pb-[12px]">Order ID</th>
                      <th className="pb-[12px]">Table / Guest</th>
                      <th className="pb-[12px]">Amount (LKR)</th>
                      <th className="pb-[12px]">Payment</th>
                      <th className="pb-[12px]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ffe4e6] text-[12px]">
                    {filteredLiveOrders.slice(0, 4).map((ord, idx) => (
                      <tr
                        key={ord.id}
                        onClick={() => navigate('/orders')}
                        className="hover:bg-[#fff1f2]/50 cursor-pointer"
                      >
                        <td
                          className={`py-[12px] font-mono-num font-bold ${
                            idx === 0 ? 'text-[#881337]' : 'text-[#1c1917]'
                          }`}
                        >
                          {ord.id}
                        </td>
                        <td className="py-[12px] font-medium text-[#1c1917]">
                          {ord.tableLabel} · {ord.guestOrWaiter}
                        </td>
                        <td className="py-[12px] font-mono-num font-bold text-[#1c1917]">
                          LKR {ord.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-[12px]">
                          <span
                            className={`px-[10px] py-[2px] rounded-full font-semibold text-[11px] ${
                              ord.paymentStatus.includes('Paid')
                                ? 'bg-[#15803d] text-white'
                                : 'bg-[#fce7f3] text-[#881337]'
                            }`}
                          >
                            {ord.paymentStatus}
                          </span>
                        </td>
                        <td className="py-[12px]">
                          <span
                            className={`px-[10px] py-[2px] rounded-full font-semibold text-[11px] ${
                              ord.statusLabel === 'Preparing'
                                ? 'bg-[#fef3c7] text-[#9a3412]'
                                : ord.statusLabel === 'Food Ready' || ord.statusLabel === 'Fulfilled'
                                ? 'bg-[#15803d] text-white'
                                : 'bg-[#fce7f3] text-[#881337]'
                            }`}
                          >
                            {ord.statusLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
