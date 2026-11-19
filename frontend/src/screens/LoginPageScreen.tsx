import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestroFlow } from '../context/RestroFlowContext';

const ASSETS = {
  brandLogo: '/assets/figma/42ffd87a-06c1-47eb-923c-725763d00159.svg',
  kdsIcon: '/assets/figma/5306d121-283f-4c93-ba32-d5f65ddd2768.svg',
  floorIcon: '/assets/figma/aeee5ad5-30ac-4f3f-b558-25dd54fbcb66.svg',
  arrowIcon: '/assets/figma/5514d816-5957-4a37-812a-8180994161c3.svg',
};

const ROLE_TABS = [
  { label: 'Cashier', email: 'kasun.perera@restroflow.lk', route: '/pos' },
  { label: 'Kitchen', email: 'sahan.wok@restroflow.lk', route: '/kds' },
  { label: 'Manager', email: 'dilshan.mgr@restroflow.lk', route: '/dashboard' },
] as const;

export const LoginPageScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUserByRole, showToast } = useRestroFlow();

  const [selectedRoleTab, setSelectedRoleTab] = useState<'Cashier' | 'Kitchen' | 'Manager'>('Cashier');
  const [branch, setBranch] = useState('Colombo 03 Flagship · Terminal #01');
  const [email, setEmail] = useState('kasun.perera@restroflow.lk');
  const [password, setPassword] = useState('••••••••••••');
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleSwitch = (tab: typeof ROLE_TABS[number]) => {
    setSelectedRoleTab(tab.label);
    setEmail(tab.email);
    setCurrentUserByRole(tab.label);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUserByRole(selectedRoleTab);
    const target = ROLE_TABS.find((r) => r.label === selectedRoleTab)?.route || '/pos';
    navigate(target);
  };

  return (
    <div
      className="min-h-screen w-full bg-[#fff1f2] flex items-center justify-center p-6"
      data-node-id="1:1386"
    >
      {/* AUTHENTICATION CARD CONTAINER (Split 2-Column SaaS Layout 896x583) */}
      <div className="w-[896px] min-h-[583px] bg-white border border-[#ffe4e6] rounded-[28px] shadow-[0px_25px_50px_-12px_rgba(122,12,46,0.2)] grid grid-cols-2 overflow-hidden">
        {/* LEFT COLUMN: BRAND PROMOTION & RESTAURANT CONTEXT */}
        <div className="wine-gradient p-[32px] flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute -left-[96px] -top-[96px] size-[256px] rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-[16px] z-10">
            <div className="flex items-center gap-[12px]">
              <div className="size-[40px] rounded-[20px] bg-white/15 border border-white/20 flex items-center justify-center shadow">
                <img src={ASSETS.brandLogo} alt="RestroFlow" className="size-[22px]" />
              </div>
              <div>
                <p className="font-bold text-[16px] leading-[20px] tracking-[-0.4px] text-white">
                  RestroFlow.
                </p>
                <p className="font-semibold text-[11px] leading-[14px] tracking-[0.55px] text-white/75 uppercase">
                  HOSPITALITY VAULT
                </p>
              </div>
            </div>

            <h2 className="pt-[12px] font-bold text-[24px] leading-[30px] tracking-[-0.3px] text-white">
              Empowering High-Velocity Dining &amp; Kitchen Operations.
            </h2>

            <p className="text-[13px] leading-[20px] text-white/80">
              Seamlessly unify touchscreen POS terminals, live kitchen monitors, QR table ordering,
              and automated inventory reconciliation across all branches.
            </p>
          </div>

          {/* Middle Feature Badges */}
          <div className="flex flex-col gap-[12px] my-[24px] z-10">
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-[18px] p-[13px] flex items-center gap-[12px]">
              <div className="size-[34px] rounded-[12px] bg-white/15 flex items-center justify-center shrink-0">
                <img src={ASSETS.kdsIcon} alt="" className="size-[18px] brightness-200" />
              </div>
              <div>
                <p className="font-bold text-[13px] leading-[16px] text-white">
                  Real-Time POS → KDS Sync
                </p>
                <p className="text-[11px] leading-[14px] text-white/75 mt-1">
                  Sub-second ticket routing with automated recipe deduction
                </p>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-[18px] p-[13px] flex items-center gap-[12px]">
              <div className="size-[34px] rounded-[12px] bg-white/15 flex items-center justify-center shrink-0">
                <img src={ASSETS.floorIcon} alt="" className="size-[18px] brightness-200" />
              </div>
              <div>
                <p className="font-bold text-[13px] leading-[16px] text-white">
                  Role-Based Security (@PreAuthorize)
                </p>
                <p className="text-[11px] leading-[14px] text-white/75 mt-1">
                  Granular access control for Cashier, Waiter, Kitchen &amp; Admin
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Branch Badge */}
          <div className="border-t border-white/15 pt-[16px] flex items-center justify-between text-[11px] z-10">
            <div className="flex items-center gap-[6px]">
              <span className="size-[8px] rounded-full bg-[#34d399]" />
              <span className="font-medium text-white/90">Colombo Cloud Cluster Online</span>
            </div>
            <span className="font-mono-num font-bold text-white/80">v3.4</span>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGIN FORM */}
        <div className="p-[40px] flex flex-col justify-between bg-white">
          <form onSubmit={handleLogin} className="flex flex-col gap-[20px]">
            <div>
              <h1 className="font-bold text-[22px] leading-[28px] text-[#1c1917]">
                Sign In to Terminal
              </h1>
              <p className="text-[12px] leading-[16px] text-[#4c0519] mt-1">
                Enter your staff credentials or select quick-access PIN.
              </p>
            </div>

            {/* Role Tab Quick-Select */}
            <div className="bg-[#fff1f2] border border-[#ffe4e6] p-[5px] rounded-[16px] grid grid-cols-3 gap-[6px]">
              {ROLE_TABS.map((tab) => {
                const active = selectedRoleTab === tab.label;
                return (
                  <button
                    type="button"
                    key={tab.label}
                    onClick={() => handleRoleSwitch(tab)}
                    className={`h-[28px] rounded-[12px] text-[11px] font-semibold transition ${
                      active
                        ? 'bg-[#881337] text-white shadow-sm'
                        : 'text-[#4c0519] hover:text-[#1c1917]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Form Elements */}
            <div className="flex flex-col gap-[16px]">
              <div>
                <label className="block font-semibold text-[11px] leading-[14px] text-[#4c0519] mb-[6px]">
                  Assigned Restaurant Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full h-[42px] bg-[#fff1f2] border border-[#ffe4e6] rounded-[16px] px-[14px] text-[13px] font-medium text-[#1c1917] focus:outline-none focus:border-[#881337]"
                >
                  <option value="Colombo 03 Flagship · Terminal #01">
                    Colombo 03 Flagship · Terminal #01
                  </option>
                  <option value="The Galle Pavilion · Coastal Branch">
                    The Galle Pavilion · Coastal Branch
                  </option>
                  <option value="Kandy Heritage Lounge · Terminal #02">
                    Kandy Heritage Lounge · Terminal #02
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[11px] leading-[14px] text-[#4c0519] mb-[6px]">
                  Work Email or Staff ID
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[42px] bg-[#fff1f2] border border-[#ffe4e6] rounded-[16px] px-[14px] text-[13px] font-medium text-[#1c1917] focus:outline-none focus:border-[#881337]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-[6px]">
                  <label className="font-semibold text-[11px] leading-[14px] text-[#4c0519]">
                    Password / Terminal PIN
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('PIN Reset request sent to Shift Manager Dilshan K.')}
                    className="font-semibold text-[11px] text-[#881337] hover:underline"
                  >
                    Forgot PIN?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[42px] bg-[#fff1f2] border border-[#ffe4e6] rounded-[16px] pl-[14px] pr-[44px] text-[13px] font-medium text-[#1c1917] focus:outline-none focus:border-[#881337]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-[12px] top-[11px] text-[11px] font-bold text-[#881337]"
                  >
                    {showPass ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-[8px] cursor-pointer text-[12px] text-[#4c0519]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-[16px] accent-[#881337] rounded"
                />
                <span>Keep terminal session active for Shift #2</span>
              </label>

              <button
                type="submit"
                className="w-full h-[42px] wine-pill-gradient text-white rounded-full font-bold text-[13px] flex items-center justify-center gap-[8px] shadow-[0px_10px_15px_-3px_rgba(122,12,46,0.25)] hover:opacity-95 transition"
              >
                <span>Launch {selectedRoleTab} Workspace</span>
                <img src={ASSETS.arrowIcon} alt="" className="size-[14px] brightness-200" />
              </button>
            </div>
          </form>

          {/* Footer Info */}
          <div className="border-t border-[#ffe4e6] pt-[16px] flex items-center justify-between text-[11px] text-[#4c0519]">
            <span>Protected by RBAC Vault</span>
            <button
              type="button"
              onClick={() => navigate('/staff')}
              className="font-semibold text-[#881337] hover:underline"
            >
              View RBAC Matrix →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
