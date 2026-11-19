import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestroFlow, Order } from '../context/RestroFlowContext';

const ASSETS = {
  brandLogo: '/assets/figma/6252373a-2ce5-4b10-853a-a85cfedf81d9.svg',
  navDash: '/assets/figma/04ee6187-b70e-4e78-9efa-294d88bb336e.svg',
  navPos: '/assets/figma/5c7e5267-ecd5-47b0-b4a2-58a22876906c.svg',
  navKds: '/assets/figma/c2a9b733-4d70-46df-9684-e7e57a547f60.svg',
  navTables: '/assets/figma/b6b93958-c47e-4693-9743-9266ad991c23.svg',
  navOrders: '/assets/figma/c0afbd63-561e-4895-a851-944cb138f387.svg',
  plusIcon: '/assets/figma/723fa5f2-8737-48dc-a885-92e80be57ecd.svg',
  searchIcon: '/assets/figma/3a1a733e-3272-4bb4-b59e-9f5e68b2ce99.svg',
  dateIcon: '/assets/figma/4cdf82ad-566f-4eb4-a61a-85a924bf833e.svg',
  printIcon: '/assets/figma/b3048224-adc2-4a12-802e-72851ac9ee3e.svg',
};

const FILTER_TABS = ['All Orders (142)', 'Dine-In (98)', 'Takeaway (34)', 'Completed', 'Unpaid'] as const;

export const OrderManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const { orders, advanceOrderKdsStage, showToast } = useRestroFlow();

  const [selectedTab, setSelectedTab] = useState<string>('All Orders (142)');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [paymentFilter, setPaymentFilter] = useState<string>('All Payments');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('#ORD-8492');

  const filteredOrders = orders.filter((o) => {
    if (selectedTab.startsWith('Dine-In') && !o.orderType.includes('DINE-IN')) return false;
    if (selectedTab.startsWith('Takeaway') && !o.orderType.includes('TAKEAWAY')) return false;
    if (selectedTab === 'Completed' && o.kdsStage !== 'COMPLETED') return false;
    if (selectedTab === 'Unpaid' && o.paymentStatus !== 'Unpaid') return false;
    if (paymentFilter !== 'All Payments' && !o.paymentStatus.includes(paymentFilter)) return false;
    if (statusFilter !== 'All Statuses' && o.statusLabel !== statusFilter) return false;
    if (
      searchQuery.trim() &&
      !o.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !o.guestOrWaiter.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !o.tableLabel.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const activeOrder: Order =
    orders.find((o) => o.id === selectedOrderId) || filteredOrders[0] || orders[0];

  return (
    <div className="flex min-h-screen w-full bg-[#fff1f2] text-[#1c1917]" data-node-id="1:1495">
      {/* COLLAPSIBLE ENTERPRISE SIDEBAR (Shared App Shell) */}
      <aside className="w-[256px] bg-white border-r border-[#ffe4e6] flex flex-col justify-between shrink-0 min-h-[1024px]">
        <div>
          {/* Brand Header */}
          <div className="h-[64px] px-[20px] border-b border-[#ffe4e6] flex items-center justify-between">
            <div
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-[12px] cursor-pointer"
            >
              <div className="size-[36px] rounded-[16px] wine-logo-gradient flex items-center justify-center shadow-sm">
                <img src={ASSETS.brandLogo} alt="" className="size-[20px]" />
              </div>
              <div>
                <p className="font-bold text-[15px] leading-[20px] text-[#1c1917]">RestroFlow</p>
                <p className="font-semibold text-[10px] leading-[14px] text-[#4c0519] uppercase">
                  ENTERPRISE
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu Items */}
          <div className="p-[12px] flex flex-col gap-[4px]">
            <p className="px-[12px] py-[6px] font-bold text-[10px] tracking-[0.55px] text-[#4c0519] uppercase">
              OVERVIEW
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full h-[36px] px-[12px] rounded-[14px] flex items-center gap-[12px] text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <img src={ASSETS.navDash} alt="" className="size-[18px]" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/pos')}
              className="w-full h-[36px] px-[12px] rounded-[14px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navPos} alt="" className="size-[18px]" />
                <span>POS Terminal</span>
              </div>
              <span className="bg-[#fce7f3] text-[#881337] font-mono-num font-bold text-[10px] px-1.5 py-0.5 rounded">
                F2
              </span>
            </button>
            <button
              onClick={() => navigate('/kds')}
              className="w-full h-[36px] px-[12px] rounded-[14px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navKds} alt="" className="size-[18px]" />
                <span>Kitchen Display</span>
              </div>
              <span className="bg-[#fef3c7] text-[#9a3412] font-mono-num font-bold text-[10px] px-1.5 py-0.5 rounded">
                8 LIVE
              </span>
            </button>
            <button
              onClick={() => navigate('/tables')}
              className="w-full h-[36px] px-[12px] rounded-[14px] flex items-center gap-[12px] text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <img src={ASSETS.navTables} alt="" className="size-[18px]" />
              <span>Floor &amp; Tables</span>
            </button>

            <p className="px-[12px] pt-[16px] pb-[6px] font-bold text-[10px] tracking-[0.55px] text-[#4c0519] uppercase">
              OPERATIONS
            </p>
            <button
              onClick={() => navigate('/orders')}
              className="w-full h-[36px] px-[12px] rounded-[14px] bg-[#fff1f2] border border-[#ffe4e6] flex items-center justify-between text-[12px] font-bold text-[#881337]"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navOrders} alt="" className="size-[18px]" />
                <span>Order Ledger</span>
              </div>
              <span className="bg-[#881337] text-white font-mono-num font-bold text-[10px] px-2 py-0.5 rounded-full">
                142
              </span>
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="w-full h-[36px] px-[12px] rounded-[14px] flex items-center gap-[12px] text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <span>Menu Catalog</span>
            </button>
            <button
              onClick={() => navigate('/inventory')}
              className="w-full h-[36px] px-[12px] rounded-[14px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <span>Inventory &amp; Stock</span>
              <span className="bg-[#ffe4e6] text-[#be123c] font-mono-num font-bold text-[10px] px-1.5 py-0.5 rounded">
                4 LOW
              </span>
            </button>
            <button
              onClick={() => navigate('/qr-order')}
              className="w-full h-[36px] px-[12px] rounded-[14px] flex items-center gap-[12px] text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <span>QR Mobile Menu</span>
            </button>

            <p className="px-[12px] pt-[16px] pb-[6px] font-bold text-[10px] tracking-[0.55px] text-[#4c0519] uppercase">
              ADMINISTRATION
            </p>
            <button
              onClick={() => navigate('/staff')}
              className="w-full h-[36px] px-[12px] rounded-[14px] flex items-center gap-[12px] text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <span>Staff &amp; RBAC</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full h-[36px] px-[12px] rounded-[14px] flex items-center gap-[12px] text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <span>Switch Terminal User</span>
            </button>
          </div>
        </div>

        {/* Branch Status Footer */}
        <div className="h-[57px] px-[12px] border-t border-[#ffe4e6] flex items-center gap-[12px]">
          <div className="size-[32px] rounded-full bg-[#fce7f3] font-bold text-[11px] text-[#881337] flex items-center justify-center">
            RF
          </div>
          <div>
            <p className="font-bold text-[11px] leading-[14px] text-[#1c1917]">
              RestroFlow Cloud v3.4
            </p>
            <div className="flex items-center gap-[4px]">
              <span className="size-[6px] rounded-full bg-[#15803d]" />
              <span className="text-[11px] text-[#4c0519]">Colombo Flagship</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN ORDER MANAGEMENT CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP HEADER */}
        <header className="bg-white border-b border-[#ffe4e6] h-[64px] px-[24px] flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-bold text-[18px] leading-[24px] text-[#1c1917]">
              Order Management
            </h1>
            <p className="text-[12px] leading-[16px] text-[#4c0519]">
              Live transaction ledger, billing settlements &amp; thermal receipt audit
            </p>
          </div>

          <div className="flex items-center gap-[12px]">
            <button
              onClick={() => navigate('/pos')}
              className="wine-pill-gradient text-white px-[14px] py-[7px] rounded-full flex items-center gap-[6px] font-bold text-[11px] shadow-sm"
            >
              <img src={ASSETS.plusIcon} alt="" className="size-[14px]" />
              <span>+ New POS Order</span>
            </button>
            <button
              onClick={() => showToast('Exported 142 order ledger rows to CSV')}
              className="bg-white border border-[#ffe4e6] px-[14px] py-[7px] rounded-full font-semibold text-[11px] text-[#1c1917] hover:bg-[#fff1f2]"
            >
              Export CSV
            </button>
          </div>
        </header>

        {/* SPLIT VIEW: LEFT ORDERS DATA LEDGER & RIGHT THERMAL RECEIPT PREVIEW */}
        <main className="p-[24px] flex gap-[24px] flex-1">
          {/* LEFT: ORDERS DATA LEDGER */}
          <div className="flex-1 bg-white border border-[#ffe4e6] rounded-[24px] flex flex-col justify-between overflow-hidden shadow-sm">
            <div>
              {/* Toolbar: Tabs, Search, Filters */}
              <div className="p-[16px] border-b border-[#ffe4e6] flex flex-col gap-[12px]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="bg-[#fff1f2] border border-[#ffe4e6] p-[4px] rounded-[14px] flex items-center gap-[4px]">
                    {FILTER_TABS.map((tab) => {
                      const active = selectedTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setSelectedTab(tab)}
                          className={`px-[12px] py-[4px] rounded-[10px] text-[11px] transition ${
                            active
                              ? 'bg-[#881337] text-white font-bold shadow-xs'
                              : 'text-[#4c0519] font-medium hover:text-[#1c1917]'
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-white border border-[#ffe4e6] px-[12px] py-[6px] rounded-[12px] flex items-center gap-[6px]">
                    <img src={ASSETS.dateIcon} alt="" className="size-[14px]" />
                    <span className="font-medium text-[11px] text-[#1c1917]">Today, 19 Nov</span>
                  </div>
                </div>

                {/* Search & Secondary Filter Dropdowns */}
                <div className="flex items-center gap-[12px]">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by Order ID, Table or Guest name..."
                      className="w-full h-[34px] bg-[#fff1f2] border border-[#ffe4e6] rounded-full pl-[36px] pr-[14px] text-[12px] text-[#1c1917] placeholder-[#6b7280] focus:outline-none focus:border-[#881337]"
                    />
                    <img
                      src={ASSETS.searchIcon}
                      alt=""
                      className="absolute left-[12px] top-[9px] size-[16px]"
                    />
                  </div>

                  <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="h-[34px] bg-white border border-[#ffe4e6] rounded-[14px] px-[12px] text-[11px] font-semibold text-[#1c1917]"
                  >
                    <option value="All Payments">All Payments</option>
                    <option value="Paid (Card)">Paid (Card)</option>
                    <option value="Paid (Cash)">Paid (Cash)</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-[34px] bg-white border border-[#ffe4e6] rounded-[14px] px-[12px] text-[11px] font-semibold text-[#1c1917]"
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Food Ready">Food Ready</option>
                    <option value="Fulfilled">Fulfilled</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#ffe4e6] bg-[#fff1f2]/50 text-[11px] font-bold text-[#4c0519]">
                      <th className="py-[14px] px-[16px]">Order ID</th>
                      <th className="py-[14px] px-[12px]">Table</th>
                      <th className="py-[14px] px-[12px]">Guest / Server</th>
                      <th className="py-[14px] px-[12px]">Channel</th>
                      <th className="py-[14px] px-[12px]">Total (LKR)</th>
                      <th className="py-[14px] px-[12px]">Payment</th>
                      <th className="py-[14px] px-[12px]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ffe4e6] text-[12px]">
                    {filteredOrders.map((ord) => {
                      const isSelected = activeOrder?.id === ord.id;
                      return (
                        <tr
                          key={ord.id}
                          onClick={() => setSelectedOrderId(ord.id)}
                          className={`cursor-pointer transition ${
                            isSelected
                              ? 'bg-[#fff1f2] border-l-4 border-l-[#881337]'
                              : 'hover:bg-[#fff1f2]/40'
                          }`}
                        >
                          <td className="py-[14px] px-[16px] font-mono-num font-bold text-[#881337]">
                            {ord.id}
                            <div className="text-[10px] font-normal text-[#4c0519]">
                              {ord.createdAtTime}
                            </div>
                          </td>
                          <td className="py-[14px] px-[12px] font-mono-num font-bold text-[#1c1917]">
                            {ord.tableId}
                          </td>
                          <td className="py-[14px] px-[12px]">
                            <p className="font-semibold text-[#1c1917]">{ord.guestOrWaiter}</p>
                            <p className="text-[11px] text-[#4c0519]">Waiter: {ord.waiterName}</p>
                          </td>
                          <td className="py-[14px] px-[12px]">
                            <span className="bg-[#fce7f3] text-[#881337] font-semibold text-[10px] px-[8px] py-[2px] rounded-full">
                              {ord.orderType.includes('TAKEAWAY') ? 'TAKEAWAY' : 'DINE-IN'}
                            </span>
                          </td>
                          <td className="py-[14px] px-[12px] font-mono-num font-bold text-[#1c1917]">
                            {ord.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-[14px] px-[12px]">
                            <span
                              className={`px-[8px] py-[2px] rounded-full font-semibold text-[10px] ${
                                ord.paymentStatus.includes('Paid')
                                  ? 'bg-[#dcfce7] text-[#15803d]'
                                  : 'bg-[#ffe4e6] text-[#be123c]'
                              }`}
                            >
                              {ord.paymentStatus}
                            </span>
                          </td>
                          <td className="py-[14px] px-[12px]">
                            <span
                              className={`px-[8px] py-[2px] rounded-full font-semibold text-[10px] ${
                                ord.statusLabel === 'Preparing'
                                  ? 'bg-[#fef3c7] text-[#9a3412]'
                                  : ord.statusLabel === 'Food Ready' || ord.statusLabel === 'Fulfilled'
                                  ? 'bg-[#dcfce7] text-[#15803d]'
                                  : 'bg-[#fce7f3] text-[#881337]'
                              }`}
                            >
                              {ord.statusLabel}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Pagination */}
            <div className="h-[51px] px-[16px] border-t border-[#ffe4e6] flex items-center justify-between text-[12px]">
              <span className="text-[#4c0519]">
                Showing 1 to {filteredOrders.length} of 142 transactions
              </span>
              <div className="flex items-center gap-[6px]">
                <button className="px-[11px] py-[4px] rounded-[8px] border border-[#ffe4e6] text-[11px] font-medium text-[#4c0519]">
                  Prev
                </button>
                <button className="px-[10px] py-[4px] rounded-[8px] bg-[#881337] text-white font-mono-num font-bold text-[11px]">
                  1
                </button>
                <button className="px-[10px] py-[4px] rounded-[8px] border border-[#ffe4e6] font-mono-num text-[11px]">
                  2
                </button>
                <button className="px-[10px] py-[4px] rounded-[8px] border border-[#ffe4e6] font-mono-num text-[11px]">
                  3
                </button>
                <button className="px-[11px] py-[4px] rounded-[8px] border border-[#ffe4e6] text-[11px] font-medium text-[#4c0519]">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER DETAILS & THERMAL RECEIPT PREVIEW (384px) */}
          {activeOrder && (
            <aside className="w-[384px] bg-white border border-[#ffe4e6] rounded-[24px] flex flex-col justify-between overflow-hidden shadow-sm shrink-0">
              {/* Drawer Header */}
              <div className="h-[71px] px-[16px] border-b border-[#ffe4e6] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-[8px]">
                    <span className="font-mono-num font-bold text-[16px] text-[#1c1917]">
                      {activeOrder.id}
                    </span>
                    <span className="bg-[#dcfce7] text-[#15803d] font-bold text-[10px] px-[8px] py-[2px] rounded-full">
                      {activeOrder.paymentStatus.includes('Paid') ? 'PAID' : 'OPEN'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4c0519]">
                    {activeOrder.tableLabel} · {activeOrder.createdAtTime}
                  </p>
                </div>

                <button
                  onClick={() => showToast(`Sent ${activeOrder.id} to 80mm Epson Thermal Printer`)}
                  className="bg-[#fff1f2] border border-[#ffe4e6] px-[12px] py-[6px] rounded-[12px] flex items-center gap-[6px] font-semibold text-[11px] text-[#881337] hover:bg-[#ffe4e6]"
                >
                  <img src={ASSETS.printIcon} alt="" className="size-[14px]" />
                  <span>Print</span>
                </button>
              </div>

              {/* Stylized Thermal Receipt Paper */}
              <div className="p-[16px] flex-1 flex flex-col justify-between bg-[#fff1f2]/40">
                <div className="bg-white border border-dashed border-[#cbd5e1] rounded-[16px] p-[18px] shadow-inner font-mono-num text-[11px] text-[#1c1917] flex flex-col gap-[12px]">
                  <div className="border-b border-dashed border-[#cbd5e1] pb-[12px] text-center">
                    <p className="font-bold text-[14px] tracking-wide">RESTROFLOW FLAGSHIP</p>
                    <p className="text-[10px] text-[#4c0519]">
                      No. 42 Galle Road, Colombo 03 · Sri Lanka
                    </p>
                    <p className="text-[10px] text-[#4c0519]">
                      VAT Reg: 114928402-7000 · Tel: 011-2448899
                    </p>
                  </div>

                  {/* Receipt Meta */}
                  <div className="border-b border-dashed border-[#cbd5e1] pb-[10px] flex flex-col gap-[4px] text-[10px]">
                    <div className="flex justify-between">
                      <span>RECEIPT: {activeOrder.id}</span>
                      <span>DATE: 19/11/2026 {activeOrder.createdAtTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TABLE: {activeOrder.tableLabel}</span>
                      <span>SERVER: {activeOrder.waiterName}</span>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="border-b border-dashed border-[#cbd5e1] pb-[12px] flex flex-col gap-[8px]">
                    {activeOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-[11px]">
                            {item.quantity}x {item.name}
                          </p>
                          <p className="text-[10px] text-[#4c0519]">{item.modifiers}</p>
                        </div>
                        <span className="font-bold">
                          {(item.unitPrice * item.quantity).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="border-b border-dashed border-[#cbd5e1] pb-[10px] flex flex-col gap-[4px] text-[11px]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>
                        LKR{' '}
                        {activeOrder.subtotal.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Charge (10%)</span>
                      <span>
                        LKR{' '}
                        {activeOrder.serviceCharge.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method</span>
                      <span>{activeOrder.paymentStatus}</span>
                    </div>
                  </div>

                  {/* Final Grand Total */}
                  <div className="flex items-center justify-between font-bold text-[15px] text-[#881337] pt-[2px]">
                    <span>GRAND TOTAL</span>
                    <span>
                      LKR{' '}
                      {activeOrder.grandTotal.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-[#cbd5e1] pt-[10px] text-center text-[10px] text-[#4c0519]">
                    <p>*** THANK YOU FOR DINING WITH US! ***</p>
                    <p className="mt-0.5">Scan QR at table for instant digital invoice</p>
                  </div>
                </div>

                {/* Order Lifecycle Action Controls */}
                <div className="flex flex-col gap-[8px] mt-[16px]">
                  <button
                    onClick={() =>
                      showToast(`Printed 80mm thermal customer copy for ${activeOrder.id}`)
                    }
                    className="w-full h-[40px] wine-pill-gradient text-white rounded-full font-bold text-[12px] flex items-center justify-center gap-[8px] shadow"
                  >
                    <span>Print Thermal Receipt (80mm)</span>
                  </button>

                  <button
                    onClick={() => advanceOrderKdsStage(activeOrder.id, 'COMPLETED')}
                    className="w-full h-[38px] bg-white border border-[#ffe4e6] hover:border-[#881337] rounded-full font-semibold text-[12px] text-[#4c0519] transition"
                  >
                    Mark Order Settled &amp; Archive
                  </button>
                </div>
              </div>
            </aside>
          )}
        </main>
      </div>
    </div>
  );
};
