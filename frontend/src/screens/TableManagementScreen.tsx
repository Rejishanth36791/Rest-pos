import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestroFlow, DiningTable } from '../context/RestroFlowContext';

const ASSETS = {
  headerLogo: '/assets/figma/502c0e5f-38d9-4b3b-8675-ee0659835dd4.svg',
  openPosIcon: '/assets/figma/0e52f673-6ad7-49d7-81bb-b019664dcf72.svg',
  transferIcon: '/assets/figma/de700e02-a7b8-4fec-bb3d-8e9fe1691e4f.svg',
  mergeIcon: '/assets/figma/22299cad-f007-4840-b420-263cee497cf7.svg',
  qrIcon: '/assets/figma/d76e7f0f-9888-43fd-8af2-573bf45324ad.svg',
  chevronDown: '/assets/figma/b77de76a-332d-4be0-b52a-764db1f4bdda.svg',
  seatsIcon: '/assets/figma/e223726c-26c6-4b8f-800d-c4b45faed604.svg',
  windowPosIcon: '/assets/figma/b283ba83-42bd-4eb8-8b48-1c9adf2c4ebf.svg',
  plusOrderIcon: '/assets/figma/2e03a7e9-9992-4b2d-aa3c-38a5ac088f2a.svg',
  waiterIcon: '/assets/figma/1b0a0ccf-93d4-4564-a8e2-e3017ffca56d.svg',
  printBillIcon: '/assets/figma/b3048224-adc2-4a12-802e-72851ac9ee3e.svg',
  clockResIcon: '/assets/figma/6a7b4278-b991-4e44-84c6-ea723c0c9c50.svg',
  busboyIcon: '/assets/figma/6dfb72eb-0e50-4bf0-b4c7-9889533f327c.svg',
};

export const TableManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const { tables, setActiveTableId, updateTableStatus, showToast } = useRestroFlow();

  const [selectedArea, setSelectedArea] = useState<'Ground Floor' | 'Upper Balcony' | 'VIP Lounge'>('Ground Floor');
  const [waiterFilter, setWaiterFilter] = useState<string>('All Waiters (4 Active)');
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);

  const freeCount = tables.filter((t) => t.status === 'AVAILABLE').length;
  const busyCount = tables.filter((t) =>
    ['FOOD_READY', 'PREPARING', 'NEW_ORDER', 'LATE_PREP', 'CLEANING'].includes(t.status)
  ).length;
  const bookedCount = tables.filter((t) => t.status === 'RESERVED').length;

  const filteredTables = tables.filter((t) =>
    waiterFilter.startsWith('All') ? true : t.waiter.toLowerCase().includes(waiterFilter.toLowerCase())
  );

  const handleOpenTableInPos = (table: DiningTable) => {
    setActiveTableId(table.id);
    navigate('/pos');
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fff1f2] text-[#1c1917]" data-node-id="1:965">
      {/* TOP HEADER */}
      <header className="bg-white border-b border-[#ffe4e6] h-[64px] px-[24px] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-[24px]">
          <div
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-[12px] cursor-pointer"
          >
            <div className="size-[40px] rounded-[16px] bg-[#881337] flex items-center justify-center shadow-sm">
              <img src={ASSETS.headerLogo} alt="" className="size-[24px]" />
            </div>
            <div>
              <h1 className="font-bold text-[16px] leading-[20px] tracking-[-0.4px] text-[#1c1917]">
                Floor &amp; Table Management
              </h1>
              <p className="font-medium text-[11px] leading-[14px] text-[#4c0519]">
                Main Dining Hall &amp; Terrace · Colombo Flagship
              </p>
            </div>
          </div>

          {/* Area Switcher */}
          <div className="bg-[#fff1f2] border border-[#ffe4e6] p-[5px] rounded-[16px] flex items-center">
            {[
              { label: 'Ground Floor (16)', area: 'Ground Floor' as const },
              { label: 'Upper Balcony (8)', area: 'Upper Balcony' as const },
              { label: 'VIP Lounge (3)', area: 'VIP Lounge' as const },
            ].map((item) => {
              const active = selectedArea === item.area;
              return (
                <button
                  key={item.area}
                  onClick={() => setSelectedArea(item.area)}
                  className={`px-[14px] py-[4px] rounded-[12px] text-[11px] leading-[14px] transition ${
                    active
                      ? 'bg-[#881337] text-white font-semibold'
                      : 'text-[#4c0519] font-medium hover:text-[#1c1917]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Telemetry & Status Badges */}
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[12px] font-mono-num text-[11px]">
            <div className="flex items-center gap-[6px]">
              <span className="size-[10px] rounded-full bg-[#15803d]" />
              <span>Free:</span>
              <strong className="font-bold">{freeCount + 3}</strong>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="size-[10px] rounded-full bg-[#be123c]" />
              <span>Busy:</span>
              <strong className="font-bold">{busyCount + 3}</strong>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="size-[10px] rounded-full bg-[#f59e0b]" />
              <span>Booked:</span>
              <strong className="font-bold">{bookedCount + 1}</strong>
            </div>
          </div>

          <div className="bg-[#ffe4e6] h-[24px] w-px" />

          <button
            onClick={() => navigate('/pos')}
            className="bg-[#881337] hover:bg-[#9f1239] text-white px-[14px] py-[6px] flex items-center gap-[6px] shadow-sm transition"
          >
            <img src={ASSETS.openPosIcon} alt="" className="size-[18px]" />
            <span className="font-semibold text-[12px] leading-[16px]">Open POS</span>
          </button>
        </div>
      </header>

      {/* MAIN WORKSPACE: FLOOR MAP & TABLE CARDS */}
      <main className="p-[24px] flex flex-col gap-[24px]">
        {/* FLOATING ACTIONS BAR */}
        <div className="bg-white border border-[#ffe4e6] rounded-[20px] p-[15px] flex flex-wrap items-center justify-between gap-y-[16px] shadow-sm">
          <div className="flex items-center gap-[8px]">
            <button
              onClick={() => showToast('Select source & destination table to transfer guest ticket')}
              className="bg-[#fff1f2] border border-[#ffe4e6] px-[13px] py-[7px] flex items-center gap-[6px] hover:border-[#881337] transition"
            >
              <img src={ASSETS.transferIcon} alt="" className="size-[16px]" />
              <span className="font-semibold text-[11px] leading-[14px] text-[#1c1917]">
                Transfer Table
              </span>
            </button>

            <button
              onClick={() => showToast('Table Merge mode activated for large party seating')}
              className="bg-[#fff1f2] border border-[#ffe4e6] px-[13px] py-[7px] flex items-center gap-[6px] hover:border-[#881337] transition"
            >
              <img src={ASSETS.mergeIcon} alt="" className="size-[16px]" />
              <span className="font-semibold text-[11px] leading-[14px] text-[#1c1917]">
                Merge Tables
              </span>
            </button>

            <button
              onClick={() => setQrModalOpen(true)}
              className="bg-[#fff1f2] border border-[#ffe4e6] px-[13px] py-[7px] flex items-center gap-[6px] hover:border-[#881337] transition"
            >
              <img src={ASSETS.qrIcon} alt="" className="size-[16px]" />
              <span className="font-semibold text-[11px] leading-[14px] text-[#1c1917]">
                Table QRs
              </span>
            </button>
          </div>

          <div className="flex items-center gap-[12px]">
            <span className="text-[12px] text-[#4c0519]">Server:</span>
            <select
              value={waiterFilter}
              onChange={(e) => setWaiterFilter(e.target.value)}
              className="bg-white border border-[#ffe4e6] px-[11px] py-[5px] font-medium text-[12px] text-[#1c1917] focus:outline-none"
            >
              <option value="All Waiters (4 Active)">All Waiters (4 Active)</option>
              <option value="Nisal R.">Nisal R.</option>
              <option value="Dilshan">Dilshan</option>
              <option value="Busboy">Busboy</option>
            </select>
          </div>
        </div>

        {/* TABLE CARDS GRID (4x2) */}
        <div className="grid grid-cols-4 gap-[16px]">
          {filteredTables.map((table) => {
            // Card border styling based on status matching Figma node 1:1033
            let cardBorder = 'border border-[#10b981]/40';
            if (table.status === 'FOOD_READY') cardBorder = 'border-2 border-[#881337] shadow-md';
            else if (table.status === 'PREPARING') cardBorder = 'border border-[#9a3412]/50 shadow-md';
            else if (table.status === 'RESERVED') cardBorder = 'border border-[#fbbf24]/50 shadow-sm';
            else if (table.status === 'NEW_ORDER') cardBorder = 'border border-[#881337]/50 shadow-sm';
            else if (table.status === 'CLEANING') cardBorder = 'border border-dashed border-[#cbd5e1] opacity-90';
            else if (table.status === 'LATE_PREP') cardBorder = 'border-2 border-[#be123c] shadow-md';

            return (
              <div
                key={table.id}
                className={`bg-white rounded-[20px] p-[17px] flex flex-col justify-between ${cardBorder}`}
              >
                <div className="flex flex-col gap-[8px]">
                  {/* Top Row: Table Name + Badge + Elapsed */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <span className="font-mono-num font-bold text-[16px] leading-[24px] text-[#1c1917]">
                        {table.name}
                      </span>

                      {table.status === 'AVAILABLE' && (
                        <span className="bg-[#dcfce7] text-[#15803d] font-bold text-[11px] px-[8px] py-[2px] rounded-[12px]">
                          AVAILABLE
                        </span>
                      )}
                      {table.status === 'FOOD_READY' && (
                        <span className="bg-[#dcfce7] text-[#15803d] font-bold text-[11px] px-[8px] py-[2px] rounded-[12px]">
                          FOOD READY
                        </span>
                      )}
                      {table.status === 'PREPARING' && (
                        <span className="bg-[#fef3c7] text-[#9a3412] font-bold text-[11px] px-[8px] py-[2px] rounded-[12px]">
                          PREPARING
                        </span>
                      )}
                      {table.status === 'RESERVED' && (
                        <span className="bg-[#fef3c7] text-[#9a3412] font-bold text-[11px] px-[8px] py-[2px] rounded-[12px]">
                          RESERVED
                        </span>
                      )}
                      {table.status === 'NEW_ORDER' && (
                        <span className="bg-[#ffe4e6] text-[#881337] font-bold text-[11px] px-[8px] py-[2px] rounded-[12px]">
                          NEW ORDER
                        </span>
                      )}
                      {table.status === 'CLEANING' && (
                        <span className="bg-[#e2e8f0] text-[#1e293b] font-bold text-[11px] px-[8px] py-[2px] rounded-[12px]">
                          CLEANING
                        </span>
                      )}
                      {table.status === 'LATE_PREP' && (
                        <span className="bg-[#ffe4e6] text-[#be123c] font-bold text-[11px] px-[8px] py-[2px] rounded-[12px]">
                          LATE PREP
                        </span>
                      )}
                    </div>

                    {table.elapsedText && table.status !== 'RESERVED' && (
                      <span
                        className={`font-mono-num text-[11px] ${
                          table.status === 'LATE_PREP'
                            ? 'font-bold text-[#be123c]'
                            : table.status === 'PREPARING'
                            ? 'font-bold text-[#9a3412]'
                            : 'font-medium text-[#4c0519]'
                        }`}
                      >
                        {table.elapsedText}
                      </span>
                    )}
                  </div>

                  {/* Second Row: Seats & Position/Waiter */}
                  <div className="flex items-center gap-[16px] pt-[3.5px] text-[12px] text-[#4c0519]">
                    <div className="flex items-center gap-[4px]">
                      <img src={ASSETS.seatsIcon} alt="" className="size-[16px]" />
                      <span>
                        {table.seats === 8 ? '8 Seats (Large)' : `${table.seats} Seats`}
                      </span>
                    </div>

                    <div className="flex items-center gap-[4px]">
                      <img
                        src={
                          table.status === 'AVAILABLE'
                            ? ASSETS.windowPosIcon
                            : table.status === 'RESERVED'
                            ? ASSETS.clockResIcon
                            : table.status === 'CLEANING'
                            ? ASSETS.busboyIcon
                            : ASSETS.waiterIcon
                        }
                        alt=""
                        className="size-[16px]"
                      />
                      <span>
                        {table.status === 'AVAILABLE'
                          ? table.positionTag
                          : table.status === 'RESERVED'
                          ? table.elapsedText
                          : table.waiter}
                      </span>
                    </div>
                  </div>

                  {/* Body Content Box */}
                  {table.status === 'AVAILABLE' && (
                    <p className="italic text-[12px] leading-[16px] text-[#4c0519] pt-[4.5px]">
                      {table.statusNote}
                    </p>
                  )}

                  {table.status === 'CLEANING' && (
                    <p className="text-[12px] leading-[16px] text-[#4c0519]">
                      {table.statusNote}
                    </p>
                  )}

                  {table.status === 'RESERVED' && (
                    <div className="bg-[#fffbeb]/50 border border-[#fde68a]/60 rounded-[12px] p-[11px]">
                      <p className="font-bold text-[12px] leading-[16px] text-[#1c1917]">
                        {table.reservationGuest}
                      </p>
                      <p className="font-medium text-[11px] leading-[14px] text-[#4c0519]">
                        {table.reservationNote}
                      </p>
                    </div>
                  )}

                  {['FOOD_READY', 'PREPARING', 'NEW_ORDER', 'LATE_PREP'].includes(table.status) && (
                    <div
                      className={`rounded-[12px] p-[8px] flex flex-col gap-[4px] ${
                        table.status === 'LATE_PREP'
                          ? 'bg-[#ffe4e6]/30 border border-[#be123c]/30'
                          : 'bg-[#fff1f2]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#1c1917]">Order {table.activeOrderId}</span>
                        <span className="font-mono-num font-bold text-[#1c1917]">
                          LKR {table.activeOrderTotal.toLocaleString()}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] leading-[14px] ${
                          table.status === 'FOOD_READY'
                            ? 'font-medium text-[#15803d]'
                            : table.status === 'LATE_PREP'
                            ? 'font-semibold text-[#be123c]'
                            : table.status === 'NEW_ORDER'
                            ? 'font-medium text-[#881337]'
                            : 'font-medium text-[#4c0519]'
                        }`}
                      >
                        {table.statusNote}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-[16px]">
                  <div className="border-t border-[#fff1f2] pt-[13px] flex items-center gap-[8px]">
                    {table.status === 'AVAILABLE' && (
                      <button
                        onClick={() => handleOpenTableInPos(table)}
                        className="w-full bg-[#881337] hover:bg-[#9f1239] text-white py-[8px] flex items-center justify-center gap-[6px] font-semibold text-[11px] shadow-sm transition"
                      >
                        <img src={ASSETS.plusOrderIcon} alt="" className="size-[16px]" />
                        <span>
                          {table.seats >= 8 ? 'Seat Family & Order' : 'Create New Order'}
                        </span>
                      </button>
                    )}

                    {table.status === 'FOOD_READY' && (
                      <>
                        <button
                          onClick={() => handleOpenTableInPos(table)}
                          className="flex-1 bg-[#fff1f2] border border-[#ffe4e6] py-[9px] font-semibold text-[11px] text-[#1c1917] hover:bg-[#ffe4e6]"
                        >
                          View Order
                        </button>
                        <button
                          onClick={() => navigate('/orders')}
                          className="bg-[#881337] text-white px-[12px] py-[9px] font-semibold text-[11px] shadow-sm"
                        >
                          Bill
                        </button>
                      </>
                    )}

                    {table.status === 'PREPARING' && (
                      <>
                        <button
                          onClick={() => handleOpenTableInPos(table)}
                          className="flex-1 bg-[#fff1f2] border border-[#ffe4e6] py-[9px] font-semibold text-[11px] text-[#1c1917] hover:bg-[#ffe4e6]"
                        >
                          Modify Order
                        </button>
                        <button
                          onClick={() => navigate('/orders')}
                          className="bg-white border border-[#ffe4e6] px-[13px] py-[10px]"
                        >
                          <img src={ASSETS.printBillIcon} alt="Print" className="w-[18px] h-[12px]" />
                        </button>
                      </>
                    )}

                    {table.status === 'RESERVED' && (
                      <>
                        <button
                          onClick={() => {
                            updateTableStatus(table.id, 'NEW_ORDER');
                            handleOpenTableInPos(table);
                          }}
                          className="flex-1 bg-[#881337] text-white py-[9px] font-semibold text-[11px] shadow-sm"
                        >
                          Seat Guests
                        </button>
                        <button
                          onClick={() => showToast(`Editing reservation for ${table.reservationGuest}`)}
                          className="border border-[#ffe4e6] px-[13px] py-[9px] font-medium text-[11px] text-[#1c1917]"
                        >
                          Edit
                        </button>
                      </>
                    )}

                    {table.status === 'NEW_ORDER' && (
                      <button
                        onClick={() => handleOpenTableInPos(table)}
                        className="w-full bg-[#fff1f2] border border-[#ffe4e6] py-[9px] font-semibold text-[11px] text-[#1c1917] hover:bg-[#ffe4e6]"
                      >
                        Manage Table
                      </button>
                    )}

                    {table.status === 'CLEANING' && (
                      <button
                        onClick={() => updateTableStatus(table.id, 'AVAILABLE')}
                        className="w-full bg-[#15803d] hover:bg-[#16a34a] text-white py-[8px] font-bold text-[11px] shadow-sm transition"
                      >
                        Mark Clean &amp; Free
                      </button>
                    )}

                    {table.status === 'LATE_PREP' && (
                      <>
                        <button
                          onClick={() => navigate('/kds')}
                          className="flex-1 bg-[#be123c] text-white py-[8px] font-semibold text-[11px]"
                        >
                          View in KDS
                        </button>
                        <button
                          onClick={() => showToast('Applied 100% complimentary dessert voucher to Table T-11')}
                          className="bg-white border border-[#ffe4e6] px-[13px] py-[9px] font-medium text-[11px] text-[#1c1917]"
                        >
                          Complimentary
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Table QRs Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#ffe4e6] rounded-[24px] max-w-md w-full p-6 shadow-2xl text-center">
            <h3 className="font-bold text-lg text-[#1c1917]">Table T-04 · Contactless QR Menu</h3>
            <p className="text-xs text-[#4c0519] mt-1">
              Guests scan this QR code at Table T-04 to launch The Galle Pavilion mobile self-ordering menu.
            </p>
            <div className="my-5 mx-auto size-44 bg-[#fff1f2] border-2 border-[#881337] rounded-2xl flex flex-col items-center justify-center p-4">
              <img src={ASSETS.qrIcon} alt="QR" className="size-20" />
              <span className="font-mono-num font-bold text-xs text-[#881337] mt-2">
                RESTROFLOW · T-04
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setQrModalOpen(false);
                  navigate('/qr-order');
                }}
                className="flex-1 wine-pill-gradient text-white font-bold text-xs py-3 rounded-full shadow"
              >
                Open Mobile QR Screen
              </button>
              <button
                onClick={() => setQrModalOpen(false)}
                className="px-5 py-3 bg-[#fff1f2] border border-[#ffe4e6] rounded-full font-semibold text-xs text-[#4c0519]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
