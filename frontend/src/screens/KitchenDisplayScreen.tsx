import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestroFlow } from '../context/RestroFlowContext';

const ASSETS = {
  kdsLogo: '/assets/figma/185fc3d7-c95f-4407-bf43-067e5d16a080.svg',
  audioIcon: '/assets/figma/c519326d-ae38-4eb1-889d-506faef75f78.svg',
  exitIcon: '/assets/figma/3de73244-e4ff-4fad-b85f-8727e7e2c12e.svg',
  startPrepIcon: '/assets/figma/6f3bea29-15bf-4d9d-90a2-966688d330cb.svg',
  checkAmberDone: '/assets/figma/966a573e-4674-40d5-87da-503aaa2c22bd.svg',
  markReadyIcon: '/assets/figma/c4c714ea-b346-4988-b4bb-94c41975bf77.svg',
  expediteIcon: '/assets/figma/5cf55407-14fd-4e84-adf2-d404cb0c68ff.svg',
  readyCheckItem: '/assets/figma/abe619e2-e6fd-4576-a4b3-c7f5492e048b.svg',
  servedCompleteIcon: '/assets/figma/56325610-72af-4f9a-a94b-65610764cbe2.svg',
  handedGuestIcon: '/assets/figma/10bc0a77-5cc3-4f70-a456-0c6f84e436d4.svg',
  fulfilledIcon: '/assets/figma/2ed90aee-c5db-4283-a5e3-83e813279787.svg',
};

const STATIONS = [
  { label: 'All', key: 'All' },
  { label: 'Wok (6)', key: 'Wok' },
  { label: 'Kottu (4)', key: 'Kottu' },
  { label: 'Grill (3)', key: 'Grill' },
  { label: 'Bar (2)', key: 'Bar' },
];

export const KitchenDisplayScreen: React.FC = () => {
  const navigate = useNavigate();
  const { orders, advanceOrderKdsStage, toggleOrderItemDone, showToast } = useRestroFlow();

  const [selectedStation, setSelectedStation] = useState('All');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [clockStr, setClockStr] = useState('13:42:08');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setClockStr(now.toTimeString().slice(0, 8));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredOrders = orders.filter((o) =>
    selectedStation === 'All' ? true : o.station === selectedStation
  );

  const newOrders = filteredOrders.filter((o) => o.kdsStage === 'NEW');
  const prepOrders = filteredOrders.filter((o) => o.kdsStage === 'PREPARING');
  const readyOrders = filteredOrders.filter((o) => o.kdsStage === 'READY');
  const completedOrders = filteredOrders.filter((o) => o.kdsStage === 'COMPLETED');
  const lateCount = orders.filter((o) => o.delayed).length;

  return (
    <div
      className="flex flex-col min-h-screen w-full bg-[#1c1917] text-white"
      data-node-id="1:315"
    >
      {/* HIGH-CONTRAST KDS HEADER BAR */}
      <header className="bg-[#0f172a] border-b border-[#44403c] h-[64px] px-[24px] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-[24px]">
          <div className="flex items-center gap-[12px]">
            <div className="size-[40px] rounded-[16px] bg-[#9a3412] flex items-center justify-center shadow">
              <img src={ASSETS.kdsLogo} alt="KDS" className="size-[26px]" />
            </div>
            <div>
              <div className="flex items-center gap-[8px]">
                <span className="font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
                  RESTROFLOW KDS
                </span>
                <span className="bg-[#1e293b] border border-[#f59e0b]/30 px-[9px] py-[3px] rounded-[12px] font-bold text-[11px] leading-[14px] text-[#fcd34d]">
                  MAIN KITCHEN
                </span>
              </div>
              <p className="text-[12px] leading-[16px] text-[#cbd5e1]">
                Station 1: Hot Wok &amp; Grill · Flagship
              </p>
            </div>
          </div>

          {/* Station Filter Pills */}
          <div className="bg-[#1e293b] border border-[#44403c] p-[5px] rounded-[16px] flex items-center gap-[4px]">
            {STATIONS.map((st) => {
              const active = selectedStation === st.key;
              return (
                <button
                  key={st.key}
                  onClick={() => setSelectedStation(st.key)}
                  className={`px-[10px] py-[4px] rounded-[12px] text-[11px] leading-[14px] transition ${
                    active
                      ? 'bg-[#881337] text-white font-semibold'
                      : 'text-[#cbd5e1] font-medium hover:text-white'
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Telemetry & Sound Alerts */}
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <div className="bg-[#1e293b] border border-[#44403c] px-[11px] py-[5px] rounded-[12px] flex items-center gap-[6px]">
              <span className="size-[8px] rounded-full bg-[#881337]" />
              <span className="font-mono-num text-[11px] text-[#cbd5e1]">NEW:</span>
              <span className="font-mono-num font-bold text-[11px] text-white">
                {newOrders.length}
              </span>
            </div>

            <div className="bg-[#1e293b] border border-[#44403c] px-[11px] py-[5px] rounded-[12px] flex items-center gap-[6px]">
              <span className="size-[8px] rounded-full bg-[#fbbf24]" />
              <span className="font-mono-num text-[11px] text-[#cbd5e1]">PREP:</span>
              <span className="font-mono-num font-bold text-[11px] text-[#fcd34d]">
                {prepOrders.length}
              </span>
            </div>

            <div className="bg-[#1e293b] border border-[#44403c] px-[11px] py-[5px] rounded-[12px] flex items-center gap-[6px]">
              <span className="size-[8px] rounded-full bg-[#f87171]" />
              <span className="font-mono-num text-[11px] text-[#cbd5e1]">LATE:</span>
              <span className="font-mono-num font-bold text-[11px] text-[#fca5a5]">
                {lateCount}
              </span>
            </div>
          </div>

          <div className="bg-[#44403c] h-[24px] w-px" />

          <div className="flex items-center gap-[12px]">
            <button
              onClick={() => {
                setAudioEnabled(!audioEnabled);
                showToast(`KDS Audio Alerts ${!audioEnabled ? 'Enabled' : 'Muted'}`);
              }}
              className={`bg-[#1e293b] border px-[9px] py-[5px] rounded-[12px] flex items-center gap-[4px] ${
                audioEnabled ? 'border-[#44403c] text-[#e2e8f0]' : 'border-[#be123c] text-[#fca5a5]'
              }`}
            >
              <img src={ASSETS.audioIcon} alt="" className="size-[16px]" />
              <span className="font-mono-num font-medium text-[11px]">
                {audioEnabled ? 'AUDIO' : 'MUTED'}
              </span>
            </button>

            <div className="text-right">
              <p className="font-mono-num font-bold text-[14px] leading-[17.5px] tracking-[0.7px] text-white">
                {clockStr}
              </p>
              <p className="font-medium text-[11px] leading-[14px] text-[#cbd5e1]">19 Nov</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/pos')}
            title="Return to POS Terminal"
            className="bg-[#1e293b] border border-[#44403c] px-[9px] py-[10px] rounded-[12px] hover:border-[#881337] transition"
          >
            <img src={ASSETS.exitIcon} alt="Exit" className="w-[18px] h-[13.5px]" />
          </button>
        </div>
      </header>

      {/* MAIN KDS KANBAN COLUMNS */}
      <main className="flex-1 p-[20px] grid grid-cols-4 gap-[16px] overflow-x-auto">
        {/* COLUMN 1: NEW ORDERS */}
        <section className="bg-[#0f172a] border border-[#44403c] rounded-[20px] flex flex-col overflow-hidden">
          <div className="bg-[#172554] border-b border-[#44403c] px-[14px] py-[14px] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <span className="size-[12px] rounded-full bg-[#881337]" />
              <h2 className="font-bold text-[16px] leading-[24px] text-white">NEW ORDERS</h2>
            </div>
            <span className="bg-[#881337] px-[8px] py-[2px] rounded-[12px] font-mono-num font-bold text-[11px] text-white">
              {newOrders.length} TICKETS
            </span>
          </div>

          <div className="p-[12px] flex flex-col gap-[12px] flex-1 overflow-y-auto">
            {newOrders.map((ticket, idx) => (
              <div
                key={ticket.id}
                className={`bg-[#292524] rounded-[16px] p-[18px] flex flex-col justify-between shadow-lg ${
                  idx === 0 ? 'border-2 border-[#881337]' : 'border border-[#44403c]'
                }`}
              >
                <div className="flex flex-col gap-[12px]">
                  <div className="border-b border-[#334155] pb-[11px] flex items-start justify-between">
                    <div className="flex flex-col gap-[5px]">
                      <span className="font-mono-num font-bold text-[16px] leading-[24px] text-white">
                        {ticket.id}
                      </span>
                      <span
                        className={`px-[8px] py-[2px] rounded-[12px] font-semibold text-[11px] leading-[14px] text-white w-fit ${
                          ticket.orderType.includes('TAKEAWAY') ? 'bg-[#047857]' : 'bg-[#881337]'
                        }`}
                      >
                        {ticket.orderType}
                      </span>
                    </div>
                    <div className="text-right flex flex-col gap-[5px]">
                      <span className="font-mono-num font-bold text-[12px] text-[#93c5fd]">
                        {ticket.timerText}
                      </span>
                      <span className="font-medium text-[11px] text-[#cbd5e1]">
                        {ticket.targetText}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    {ticket.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className={`flex items-start gap-[8px] ${
                          iIdx > 0 ? 'border-t border-[#334155] pt-[8px]' : ''
                        }`}
                      >
                        <span className="size-[24px] rounded-[12px] bg-[#1e293b] font-mono-num font-bold text-[12px] text-white flex items-center justify-center shrink-0">
                          {item.quantity}
                        </span>
                        <div>
                          <p className="font-semibold text-[12px] leading-[16px] text-white">
                            {item.name}
                          </p>
                          <p className="font-medium text-[11px] leading-[14px] text-[#fcd34d]">
                            {item.modifiers}
                          </p>
                          {item.kitchenNote && (
                            <p className="italic font-medium text-[11px] leading-[14px] text-[#cbd5e1]">
                              {item.kitchenNote}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-[16px]">
                  <div className="border-t border-[#334155] pt-[13px]">
                    <button
                      onClick={() => advanceOrderKdsStage(ticket.id, 'PREPARING')}
                      className="w-full bg-[#881337] hover:bg-[#9f1239] text-white rounded-[12px] py-[10px] flex items-center justify-center gap-[8px] font-bold text-[12px] shadow transition"
                    >
                      <img src={ASSETS.startPrepIcon} alt="" className="size-[18px]" />
                      <span>START PREPARING</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COLUMN 2: PREPARING */}
        <section className="bg-[#0f172a] border border-[#44403c] rounded-[20px] flex flex-col overflow-hidden">
          <div className="bg-[#451a03] border-b border-[#44403c] px-[14px] py-[14px] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <span className="size-[12px] rounded-full bg-[#fbbf24]" />
              <h2 className="font-bold text-[16px] leading-[24px] text-white">PREPARING</h2>
            </div>
            <span className="bg-[#f59e0b] px-[8px] py-[2px] rounded-[12px] font-mono-num font-bold text-[11px] text-[#020617]">
              {prepOrders.length} TICKETS
            </span>
          </div>

          <div className="p-[12px] flex flex-col gap-[12px] flex-1 overflow-y-auto">
            {prepOrders.map((ticket) => (
              <div
                key={ticket.id}
                className={`bg-[#292524] rounded-[16px] p-[18px] flex flex-col justify-between relative overflow-hidden shadow-lg ${
                  ticket.delayed ? 'border-2 border-[#be123c]' : 'border-2 border-[#f59e0b]'
                }`}
              >
                {ticket.delayed && (
                  <div className="absolute top-[12px] right-[-28px] rotate-45 bg-[#be123c] px-[32px] py-[2px] font-bold text-[10px] text-white shadow">
                    DELAYED
                  </div>
                )}

                <div className="flex flex-col gap-[12px]">
                  <div className="border-b border-[#334155] pb-[11px] flex items-start justify-between">
                    <div className="flex flex-col gap-[5px]">
                      <span className="font-mono-num font-bold text-[16px] leading-[24px] text-white">
                        {ticket.id}
                      </span>
                      <span className="bg-[#881337] px-[8px] py-[2px] rounded-[12px] font-semibold text-[11px] leading-[14px] text-white w-fit">
                        {ticket.orderType}
                      </span>
                    </div>
                    <div className="text-right flex flex-col gap-[5px] pr-3">
                      <span
                        className={`font-mono-num font-bold ${
                          ticket.delayed ? 'text-[16px] text-[#f87171]' : 'text-[12px] text-[#fcd34d]'
                        }`}
                      >
                        {ticket.timerText}
                      </span>
                      <span
                        className={`font-medium text-[11px] ${
                          ticket.delayed ? 'text-[#fca5a5]' : 'text-[#cbd5e1]'
                        }`}
                      >
                        {ticket.targetText}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    {ticket.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        onClick={() => toggleOrderItemDone(ticket.id, iIdx)}
                        className={`flex items-start justify-between cursor-pointer ${
                          iIdx > 0 ? 'border-t border-[#334155] pt-[8px]' : ''
                        }`}
                      >
                        <div className="flex items-start gap-[8px]">
                          <span
                            className={`size-[24px] rounded-[12px] font-mono-num font-bold text-[12px] text-white flex items-center justify-center shrink-0 ${
                              item.done ? 'bg-[#1e293b]' : 'bg-[#f59e0b]/20'
                            }`}
                          >
                            {item.quantity}
                          </span>
                          <div>
                            <p
                              className={`font-semibold text-[12px] leading-[16px] ${
                                item.done
                                  ? 'line-through text-white/50'
                                  : 'text-[#fde68a]'
                              }`}
                            >
                              {item.name}
                            </p>
                            {item.done ? (
                              <p className="font-semibold text-[11px] leading-[14px] text-[#34d399]">
                                Done by {item.doneBy || 'Chef Sahan'}
                              </p>
                            ) : (
                              <p className="font-medium text-[11px] leading-[14px] text-[#fcd34d]">
                                {item.modifiers}
                              </p>
                            )}
                          </div>
                        </div>

                        {item.done ? (
                          <img src={ASSETS.checkAmberDone} alt="Done" className="size-[18px]" />
                        ) : (
                          <span className="font-mono-num font-bold text-[11px] text-[#fbbf24]">
                            COOKING
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-[16px]">
                  <div className="border-t border-[#334155] pt-[13px] flex flex-col gap-[8px]">
                    {!ticket.delayed && (
                      <div className="bg-[#1e293b] h-[8px] rounded-full overflow-hidden">
                        <div className="bg-[#fbbf24] h-full w-3/4 rounded-full" />
                      </div>
                    )}

                    <button
                      onClick={() => advanceOrderKdsStage(ticket.id, 'READY')}
                      className={`w-full text-white rounded-[12px] py-[10px] flex items-center justify-center gap-[8px] font-bold text-[12px] shadow transition ${
                        ticket.delayed
                          ? 'bg-[#be123c] hover:bg-[#9f1239]'
                          : 'bg-[#15803d] hover:bg-[#16a34a]'
                      }`}
                    >
                      <img
                        src={ticket.delayed ? ASSETS.expediteIcon : ASSETS.markReadyIcon}
                        alt=""
                        className="size-[18px]"
                      />
                      <span>{ticket.delayed ? 'EXPEDITE & READY' : 'MARK ALL READY'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COLUMN 3: READY TO SERVE */}
        <section className="bg-[#0f172a] border border-[#44403c] rounded-[20px] flex flex-col overflow-hidden">
          <div className="bg-[#022c22] border-b border-[#44403c] px-[14px] py-[14px] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <span className="size-[12px] rounded-full bg-[#34d399]" />
              <h2 className="font-bold text-[16px] leading-[24px] text-white">READY TO SERVE</h2>
            </div>
            <span className="bg-[#15803d] px-[8px] py-[2px] rounded-[12px] font-mono-num font-bold text-[11px] text-white">
              {readyOrders.length} TICKETS
            </span>
          </div>

          <div className="p-[12px] flex flex-col gap-[12px] flex-1 overflow-y-auto">
            {readyOrders.map((ticket, idx) => {
              const isTakeaway = ticket.orderType.includes('TAKEAWAY');
              return (
                <div
                  key={ticket.id}
                  className={`bg-[#292524] rounded-[16px] p-[18px] flex flex-col justify-between shadow-lg ${
                    idx === 0 ? 'border-2 border-[#10b981]' : 'border border-[#44403c]'
                  }`}
                >
                  <div className="flex flex-col gap-[12px]">
                    <div className="border-b border-[#334155] pb-[11px] flex items-start justify-between">
                      <div className="flex flex-col gap-[5px]">
                        <span className="font-mono-num font-bold text-[16px] leading-[24px] text-white">
                          {ticket.id}
                        </span>
                        <span
                          className={`px-[8px] py-[2px] rounded-[12px] font-semibold text-[11px] leading-[14px] text-white w-fit ${
                            isTakeaway ? 'bg-[#047857]' : 'bg-[#881337]'
                          }`}
                        >
                          {ticket.orderType}
                        </span>
                      </div>
                      <div className="text-right flex flex-col gap-[5px]">
                        <span className="font-mono-num font-bold text-[12px] text-[#34d399]">
                          {ticket.timerText}
                        </span>
                        <span className="font-medium text-[11px] text-[#cbd5e1]">
                          {ticket.targetText}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-[6px]">
                      {ticket.items.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-[8px]">
                          <img src={ASSETS.readyCheckItem} alt="" className="size-[16px]" />
                          <span className="text-[12px] leading-[16px] text-[#e2e8f0]">
                            {item.name.startsWith('2x') || item.name.startsWith('4x') || item.name.startsWith('1x')
                              ? item.name
                              : `${item.quantity}x ${item.name}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-[16px]">
                    <div className="border-t border-[#334155] pt-[13px]">
                      <button
                        onClick={() => advanceOrderKdsStage(ticket.id, 'COMPLETED')}
                        className="w-full bg-[#1e293b] border border-[#44403c] hover:border-[#34d399] text-[#e2e8f0] rounded-[12px] py-[11px] flex items-center justify-center gap-[8px] font-semibold text-[12px] transition"
                      >
                        <img
                          src={isTakeaway ? ASSETS.handedGuestIcon : ASSETS.servedCompleteIcon}
                          alt=""
                          className="size-[18px]"
                        />
                        <span>{isTakeaway ? 'HANDED TO GUEST' : 'SERVED & COMPLETE'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* COLUMN 4: COMPLETED */}
        <section className="bg-[#0f172a] border border-[#44403c] rounded-[20px] flex flex-col overflow-hidden">
          <div className="bg-[#1e293b] border-b border-[#44403c] px-[14px] py-[14px] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <span className="size-[12px] rounded-full bg-[#94a3b8]" />
              <h2 className="font-bold text-[16px] leading-[24px] text-[#e2e8f0]">COMPLETED</h2>
            </div>
            <span className="bg-[#1e293b] px-[8px] py-[2px] rounded-[12px] font-mono-num font-bold text-[11px] text-[#cbd5e1]">
              RECENT
            </span>
          </div>

          <div className="p-[12px] flex flex-col gap-[12px] flex-1 overflow-y-auto">
            {completedOrders.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-[#292524] border border-[#1e293b] rounded-[16px] p-[15px] flex flex-col gap-[8px]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-num font-bold text-[16px] leading-[24px] text-[#e2e8f0]">
                    {ticket.id}
                  </span>
                  <span className="font-mono-num font-medium text-[11px] text-[#cbd5e1]">
                    {ticket.timerText}
                  </span>
                </div>

                <p className="text-[12px] leading-[16px] text-[#cbd5e1]">
                  {ticket.tableLabel} · {ticket.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                </p>

                <div className="border-t border-[#1e293b] pt-[9px] flex items-center justify-between">
                  <div className="flex items-center gap-[4px]">
                    <img src={ASSETS.fulfilledIcon} alt="" className="size-[14px]" />
                    <span className="font-medium text-[11px] text-[#34d399]">Fulfilled</span>
                  </div>
                  <button
                    onClick={() => advanceOrderKdsStage(ticket.id, 'PREPARING')}
                    className="font-medium text-[11px] text-[#cbd5e1] underline hover:text-white"
                  >
                    Recall
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
