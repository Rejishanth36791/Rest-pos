import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRestroFlow } from '../context/RestroFlowContext';

const SCREENS = [
  { num: 1, name: 'POS / New Order', path: '/pos', node: '1:2' },
  { num: 2, name: 'Kitchen Display (KDS)', path: '/kds', node: '1:315' },
  { num: 3, name: 'Restaurant Dashboard', path: '/dashboard', node: '1:655' },
  { num: 4, name: 'Table Management', path: '/tables', node: '1:965' },
  { num: 5, name: 'Customer QR (Mobile)', path: '/qr-order', node: '1:1263' },
  { num: 6, name: 'Login Page', path: '/login', node: '1:1386' },
  { num: 7, name: 'Order Management', path: '/orders', node: '1:1495' },
  { num: 8, name: 'Menu Management', path: '/menu', node: '1:1902' },
  { num: 9, name: 'Inventory & Recipes', path: '/inventory', node: '1:2224' },
  { num: 10, name: 'Staff & RBAC', path: '/staff', node: '1:2540' },
];

export const ScreenRoleDock: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUserByRole, backendConnected, toastMessage } = useRestroFlow();

  const activeScreen = SCREENS.find((s) => s.path === location.pathname) || SCREENS[0];

  return (
    <>
      {toastMessage && (
        <div className="fixed top-4 right-4 z-[100] bg-[#1c1917] text-white border border-[#881337] px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2.5 text-xs font-medium animate-bounce">
          <span className="size-2 rounded-full bg-[#34d399]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
        {open && (
          <div className="mb-2 w-[320px] bg-white border border-[#ffe4e6] rounded-3xl shadow-2xl p-4 text-[#1c1917]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ffe4e6]">
              <div>
                <p className="text-xs font-bold text-[#881337] uppercase tracking-wider">RestroFlow Navigator</p>
                <p className="text-[11px] text-[#4c0519]">All 10 Figma Screens & RBAC Roles</p>
              </div>
              <span
                className={`text-[10px] font-mono-num px-2 py-0.5 rounded-full font-bold ${
                  backendConnected ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fce7f3] text-[#881337]'
                }`}
              >
                {backendConnected ? 'API :8080 LIVE' : 'LOCAL SYNC'}
              </span>
            </div>

            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase text-[#4c0519] mb-1.5">Active Staff Role (@PreAuthorize)</p>
              <div className="grid grid-cols-5 gap-1">
                {(['Admin', 'Manager', 'Cashier', 'Waiter', 'Kitchen'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setCurrentUserByRole(role)}
                    className={`px-1.5 py-1 rounded-lg text-[10px] font-semibold transition ${
                      currentUser.role === role
                        ? 'bg-[#881337] text-white shadow'
                        : 'bg-[#fff1f2] text-[#4c0519] hover:bg-[#ffe4e6]'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 max-h-[280px] overflow-y-auto pr-1">
              {SCREENS.map((scr) => {
                const isActive = location.pathname === scr.path;
                return (
                  <button
                    key={scr.path}
                    onClick={() => {
                      navigate(scr.path);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-left text-xs transition ${
                      isActive
                        ? 'wine-pill-gradient text-white font-bold shadow'
                        : 'hover:bg-[#fff1f2] text-[#1c1917] font-medium'
                    }`}
                  >
                    <span className="truncate">
                      <span className="font-mono-num mr-1.5 opacity-80">#{scr.num}</span>
                      {scr.name}
                    </span>
                    <span className={`text-[10px] font-mono-num ${isActive ? 'text-white/80' : 'text-[#4c0519]'}`}>
                      {scr.node}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="wine-pill-gradient text-white px-4 py-2.5 rounded-full shadow-xl border border-white/20 flex items-center gap-2.5 text-xs font-bold hover:opacity-95 transition"
        >
          <span className="size-2 rounded-full bg-[#34d399]" />
          <span>
            Screen {activeScreen.num}/10: {activeScreen.name}
          </span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full font-mono-num text-[10px]">
            {currentUser.role}
          </span>
        </button>
      </div>
    </>
  );
};
