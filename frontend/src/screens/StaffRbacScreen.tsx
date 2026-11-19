import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestroFlow, StaffMember } from '../context/RestroFlowContext';

const ASSETS = {
  brandLogo: '/assets/figma/6252373a-2ce5-4b10-853a-a85cfedf81d9.svg',
  plusIcon: '/assets/figma/7b3bff58-d31c-42c5-9309-ff600fd9811a.svg',
  navDash: '/assets/figma/04ee6187-b70e-4e78-9efa-294d88bb336e.svg',
  navPos: '/assets/figma/5c7e5267-ecd5-47b0-b4a2-58a22876906c.svg',
  navKds: '/assets/figma/c2a9b733-4d70-46df-9684-e7e57a547f60.svg',
  navTables: '/assets/figma/b6b93958-c47e-4693-9743-9266ad991c23.svg',
  navOrders: '/assets/figma/c0afbd63-561e-4895-a851-944cb138f387.svg',
  searchIcon: '/assets/figma/0e2a1c47-2c38-45ed-b67b-5fd484314f37.svg',
};

type PermLevel = 'Full' | 'Edit' | 'Read' | 'Scoped' | '—';

interface MatrixRow {
  module: string;
  admin: PermLevel;
  manager: PermLevel;
  cashier: PermLevel;
  waiter: PermLevel;
  kitchen: PermLevel;
}

const INITIAL_MATRIX: MatrixRow[] = [
  { module: 'Dashboard & Revenue Analytics', admin: 'Full', manager: 'Full', cashier: 'Read', waiter: '—', kitchen: '—' },
  { module: 'POS Terminal & Billing Settlement', admin: 'Full', manager: 'Full', cashier: 'Full', waiter: 'Scoped', kitchen: '—' },
  { module: 'Floor Map & Table Lifecycle', admin: 'Full', manager: 'Full', cashier: 'Edit', waiter: 'Full', kitchen: 'Read' },
  { module: 'Kitchen Display System (KDS)', admin: 'Full', manager: 'Full', cashier: '—', waiter: 'Read', kitchen: 'Full' },
  { module: 'Order Ledger & Void / Refunds', admin: 'Full', manager: 'Full', cashier: 'Scoped', waiter: '—', kitchen: '—' },
  { module: 'Menu Catalog & LKR Pricing', admin: 'Full', manager: 'Edit', cashier: 'Read', waiter: 'Read', kitchen: 'Read' },
  { module: 'Inventory & Recipe BOM Stock', admin: 'Full', manager: 'Full', cashier: '—', waiter: '—', kitchen: 'Read' },
  { module: 'Staff Directory & RBAC Policies', admin: 'Full', manager: 'Read', cashier: '—', waiter: '—', kitchen: '—' },
];

const CYCLE_PERM: Record<PermLevel, PermLevel> = {
  Full: 'Edit',
  Edit: 'Read',
  Read: 'Scoped',
  Scoped: '—',
  '—': 'Full',
};

export const StaffRbacScreen: React.FC = () => {
  const navigate = useNavigate();
  const { staff, addStaffMember, setCurrentUserByRole, showToast } = useRestroFlow();

  const [matrix, setMatrix] = useState<MatrixRow[]>(INITIAL_MATRIX);
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteOpen, setInviteOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<StaffMember['role']>('Waiter');
  const [newStation, setNewStation] = useState('Upper Balcony');

  const toggleMatrixCell = (rowIdx: number, colKey: keyof Omit<MatrixRow, 'module'>) => {
    setMatrix((prev) =>
      prev.map((row, idx) =>
        idx === rowIdx ? { ...row, [colKey]: CYCLE_PERM[row[colKey]] } : row
      )
    );
    showToast('Updated @PreAuthorize RBAC Policy');
  };

  const renderBadge = (val: PermLevel) => {
    if (val === '—') {
      return <span className="font-mono-num text-[#6b7280]">—</span>;
    }
    const styles: Record<Exclude<PermLevel, '—'>, string> = {
      Full: 'bg-[#dcfce7] text-[#15803d]',
      Edit: 'bg-[#fce7f3] text-[#881337]',
      Scoped: 'bg-[#fef3c7] text-[#9a3412]',
      Read: 'bg-[#e2e8f0] text-[#1e293b]',
    };
    return (
      <span className={`px-[10px] py-[2px] rounded-full font-bold text-[11px] ${styles[val]}`}>
        {val}
      </span>
    );
  };

  const filteredStaff = staff.filter((s) =>
    searchQuery.trim()
      ? s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.employeeCode.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const handleInviteStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const parts = newName.trim().split(' ');
    const initials = (parts[0][0] + (parts[1]?.[0] || 'X')).toUpperCase();
    addStaffMember({
      initials,
      name: newName,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@restroflow.lk`,
      employeeCode: `EMP-0${180 + staff.length}`,
      role: newRole,
      stationNote: newStation,
      branchShift: 'Colombo Flagship · Shift #2',
      pinStatus: 'PIN #9021',
      status: 'Active',
    });
    setNewName('');
    setNewEmail('');
    setInviteOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fff1f2] text-[#1c1917]" data-node-id="1:2540">
      {/* LEFT NAVIGATION BAR */}
      <aside className="w-[256px] bg-white border-r border-[#ffe4e6] p-[20px] flex flex-col justify-between shrink-0 min-h-[1592px]">
        <div className="flex flex-col gap-[8px]">
          <div
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-[12px] pb-[20px] px-[4px] cursor-pointer"
          >
            <div className="size-[40px] rounded-[20px] wine-logo-gradient flex items-center justify-center shadow">
              <img src={ASSETS.brandLogo} alt="" className="size-[24px]" />
            </div>
            <div>
              <p className="font-bold text-[16px] leading-[20px] text-[#1c1917]">RestroFlow.</p>
              <p className="font-semibold text-[11px] leading-[14px] text-[#4c0519] uppercase mt-1">
                SECURITY VAULT
              </p>
            </div>
          </div>

          <button
            onClick={() => setInviteOpen(true)}
            className="w-full h-[44px] wine-pill-gradient text-white rounded-full flex items-center justify-center gap-[8px] font-semibold text-[12px] shadow-[0px_10px_15px_-3px_rgba(122,12,46,0.25)]"
          >
            <img src={ASSETS.plusIcon} alt="" className="size-[18px]" />
            <span>+ Invite Staff Member</span>
          </button>

          <p className="pt-[24px] px-[12px] font-bold text-[11px] tracking-[0.55px] text-[#4c0519] uppercase">
            MANAGEMENT
          </p>

          <nav className="flex flex-col gap-[6px]">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full h-[40px] px-[14px] rounded-[20px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navDash} alt="" className="size-[18px]" />
                <span>Dashboard</span>
              </div>
              <span className="font-mono-num text-[11px] text-[#4c0519]">4</span>
            </button>
            <button
              onClick={() => navigate('/pos')}
              className="w-full h-[40px] px-[14px] rounded-[20px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navPos} alt="" className="size-[18px]" />
                <span>POS Terminal</span>
              </div>
              <span className="font-mono-num text-[11px] text-[#4c0519]">0</span>
            </button>
            <button
              onClick={() => navigate('/kds')}
              className="w-full h-[40px] px-[14px] rounded-[20px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navKds} alt="" className="size-[18px]" />
                <span>Kitchen Display</span>
              </div>
              <span className="font-mono-num text-[11px] text-[#4c0519]">3</span>
            </button>
            <button
              onClick={() => navigate('/tables')}
              className="w-full h-[40px] px-[14px] rounded-[20px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navTables} alt="" className="size-[18px]" />
                <span>Floor &amp; Tables</span>
              </div>
              <span className="font-mono-num text-[11px] text-[#4c0519]">0</span>
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="w-full h-[40px] px-[14px] rounded-[20px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <span>Menu Catalog</span>
              <span className="font-mono-num text-[11px] text-[#4c0519]">48</span>
            </button>
            <button
              onClick={() => navigate('/inventory')}
              className="w-full h-[40px] px-[14px] rounded-[20px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <span>Inventory &amp; Recipes</span>
              <span className="font-mono-num text-[11px] text-[#4c0519]">4</span>
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="w-full h-[40px] px-[14px] rounded-[20px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <div className="flex items-center gap-[12px]">
                <img src={ASSETS.navOrders} alt="" className="size-[18px]" />
                <span>Orders</span>
              </div>
              <span className="font-mono-num text-[11px] text-[#4c0519]">142</span>
            </button>
            <button
              onClick={() => navigate('/staff')}
              className="w-full h-[42px] px-[15px] rounded-[20px] bg-[#fff1f2] border border-[#ffe4e6] flex items-center justify-between text-[12px] font-bold text-[#881337]"
            >
              <span>RBAC / Staff</span>
              <span className="size-[20px] rounded-full bg-[#881337] text-white font-mono-num font-bold text-[11px] flex items-center justify-center">
                5
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom Security Health */}
        <div className="border-t border-[#ffe4e6] pt-[17px] flex flex-col gap-[8px]">
          <div className="bg-[#fff1f2] border border-[#ffe4e6] rounded-full px-[15px] py-[8px] flex items-center gap-[8px]">
            <span className="size-[8px] rounded-full bg-[#15803d]" />
            <span className="font-semibold text-[11px] text-[#1c1917]">
              Spring Security Active
            </span>
          </div>
          <p className="px-[4px] text-[11px] text-[#4c0519]">Role-Based Access Control (RBAC)</p>
        </div>
      </aside>

      {/* MAIN RBAC & STAFF DIRECTORY */}
      <div className="flex-1 flex flex-col">
        {/* TOP HEADER */}
        <header className="h-[80px] px-[32px] flex items-center justify-between shrink-0">
          <div>
            <p className="font-bold text-[11px] tracking-[1.1px] text-[#881337] uppercase">
              ENTERPRISE ACCESS CONTROL · RBAC
            </p>
            <h1 className="font-bold text-[20px] leading-[28px] text-[#1c1917]">
              Staff Directory &amp; Role Permissions
            </h1>
          </div>

          <div className="flex items-center gap-[12px]">
            <div className="relative w-[288px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff by name, role or ID..."
                className="w-full h-[34px] bg-white border border-[#ffe4e6] rounded-full pl-[40px] pr-[16px] text-[12px] text-[#1c1917] focus:outline-none focus:border-[#881337]"
              />
              <img
                src={ASSETS.searchIcon}
                alt=""
                className="absolute left-[14px] top-[8px] size-[18px]"
              />
            </div>

            <button
              onClick={() => showToast('RBAC Security Audit Log verified: 0 unauthorized attempts')}
              className="bg-white border border-[#ffe4e6] h-[34px] px-[16px] rounded-full font-semibold text-[11px] text-[#1c1917] hover:bg-[#fff1f2]"
            >
              Audit Logs
            </button>
          </div>
        </header>

        {/* MAIN CONTENT BODY */}
        <main className="px-[32px] pb-[40px] flex flex-col gap-[24px]">
          {/* HERO BANNER WITH RBAC OVERVIEW */}
          <div className="wine-gradient rounded-[24px] p-[32px] flex items-center justify-between shadow-lg">
            <div className="flex flex-col gap-[6px] max-w-[560px]">
              <div className="backdrop-blur-xs bg-white/15 rounded-full px-[12px] py-[4px] flex items-center gap-[6px] w-fit">
                <span className="size-[6px] rounded-full bg-[#34d399]" />
                <span className="font-semibold text-[11px] text-white uppercase">
                  ZERO-TRUST HOSPITALITY SECURITY
                </span>
              </div>
              <h2 className="pt-[4px] font-bold text-[26px] leading-[34px] text-white">
                Role-Based Access Control (RBAC)
              </h2>
              <p className="text-[13px] leading-[20px] text-white/85">
                Enforce granular terminal &amp; API route guards via Spring Security{' '}
                <code className="bg-white/20 px-1.5 py-0.5 rounded font-mono-num text-[12px] text-[#fde68a]">
                  @PreAuthorize
                </code>{' '}
                policies across Admin, Manager, Cashier, Waiter, and Kitchen stations.
              </p>
            </div>

            {/* Security Dial */}
            <div className="backdrop-blur-md bg-white/15 border border-white/20 rounded-[24px] px-[20px] py-[18px] flex items-center gap-[14px] shadow-lg">
              <div className="size-[48px] rounded-full border-4 border-[#34d399] flex items-center justify-center font-mono-num font-bold text-[12px] text-white">
                2FA
              </div>
              <div>
                <p className="text-[11px] text-white/80">Policy Enforcement</p>
                <p className="font-bold text-[16px] text-white">100% Guarded</p>
              </div>
            </div>
          </div>

          {/* 5 ROLE STAT CARDS */}
          <div className="grid grid-cols-5 gap-[14px]">
            {[
              { role: 'Admin' as const, badge: 'ROOT', count: 2, desc: 'All branches & users' },
              { role: 'Manager' as const, badge: 'OPS', count: 3, desc: 'Floor, stock, reports' },
              { role: 'Cashier' as const, badge: 'POS #01', count: 4, desc: 'POS & payments' },
              { role: 'Waiter' as const, badge: 'FLOOR', count: 6, desc: 'Tables & order entry' },
              { role: 'Kitchen' as const, badge: 'KDS WOK', count: 5, desc: 'Live station prep' },
            ].map((card) => (
              <div
                key={card.role}
                onClick={() => setCurrentUserByRole(card.role)}
                className="bg-white border border-[#ffe4e6] hover:border-[#881337] rounded-[20px] p-[21px] flex flex-col justify-between cursor-pointer shadow-xs transition"
              >
                <div className="flex items-center justify-between pb-[12px]">
                  <span className="font-bold text-[12px] text-[#1c1917]">{card.role}</span>
                  <span className="bg-[#fce7f3] text-[#881337] font-mono-num font-bold text-[10px] px-[8px] py-[2px] rounded-full">
                    {card.badge}
                  </span>
                </div>
                <p className="font-mono-num font-bold text-[32px] leading-[40px] text-[#1c1917]">
                  {card.count}
                </p>
                <p className="text-[11px] text-[#4c0519] pt-[8px]">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* ROLE-BASED ACCESS CONTROL (RBAC) MATRIX TABLE */}
          <div className="bg-white border border-[#ffe4e6] rounded-[24px] overflow-hidden shadow-sm">
            <div className="p-[24px] border-b border-[#ffe4e6] flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-[16px] leading-[24px] text-[#1c1917]">
                  Interactive RBAC Permission Matrix
                </h3>
                <p className="text-[12px] text-[#4c0519]">
                  Click any role permission badge below to cycle access level (Full → Edit → Read →
                  Scoped → None)
                </p>
              </div>

              <div className="flex items-center gap-[14px] text-[11px]">
                <div className="flex items-center gap-[6px]">
                  <span className="size-[12px] rounded bg-[#dcfce7] border border-[#15803d]" />
                  <span>Full Access</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="size-[12px] rounded bg-[#fce7f3] border border-[#881337]" />
                  <span>Edit</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="size-[12px] rounded bg-[#e2e8f0] border border-[#475569]" />
                  <span>Read Only</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#ffe4e6] bg-[#fff1f2]/60 text-[11px] font-bold text-[#4c0519]">
                    <th className="py-[12px] px-[24px]">System Module</th>
                    <th className="py-[12px] px-[16px] text-center">Admin</th>
                    <th className="py-[12px] px-[16px] text-center">Manager</th>
                    <th className="py-[12px] px-[16px] text-center">Cashier</th>
                    <th className="py-[12px] px-[16px] text-center">Waiter</th>
                    <th className="py-[12px] px-[16px] text-center">Kitchen Staff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ffe4e6] text-[12px]">
                  {matrix.map((row, rIdx) => (
                    <tr key={row.module} className="hover:bg-[#fff1f2]/30">
                      <td className="py-[12px] px-[24px] font-semibold text-[#1c1917]">
                        {row.module}
                      </td>
                      {(['admin', 'manager', 'cashier', 'waiter', 'kitchen'] as const).map(
                        (col) => (
                          <td
                            key={col}
                            onClick={() => toggleMatrixCell(rIdx, col)}
                            className="py-[12px] px-[16px] text-center cursor-pointer select-none"
                          >
                            {renderBadge(row[col])}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ACTIVE EMPLOYEES DIRECTORY */}
          <div className="bg-white border border-[#ffe4e6] rounded-[24px] overflow-hidden shadow-sm">
            <div className="p-[24px] border-b border-[#ffe4e6] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[16px] leading-[24px] text-[#1c1917]">
                  Active Employees Directory
                </h3>
                <p className="text-[12px] text-[#4c0519]">
                  Assigned terminal shifts, PIN credentials &amp; live attendance status
                </p>
              </div>

              <button
                onClick={() => setInviteOpen(true)}
                className="wine-pill-gradient text-white px-[16px] py-[8px] rounded-full font-bold text-[11px] shadow-sm"
              >
                + Add Employee
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#ffe4e6] bg-[#fff1f2]/50 text-[11px] font-bold text-[#4c0519]">
                    <th className="py-[16px] px-[24px]">Employee</th>
                    <th className="py-[16px] px-[16px]">Staff ID</th>
                    <th className="py-[16px] px-[16px]">Assigned Role</th>
                    <th className="py-[16px] px-[16px]">Branch &amp; Shift</th>
                    <th className="py-[16px] px-[16px]">Auth Method</th>
                    <th className="py-[16px] px-[16px]">Status</th>
                    <th className="py-[16px] px-[16px] text-center">Impersonate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ffe4e6] text-[12px]">
                  {filteredStaff.map((member) => (
                    <tr key={member.id} className="hover:bg-[#fff1f2]/30">
                      <td className="py-[18px] px-[24px]">
                        <div className="flex items-center gap-[12px]">
                          <div className="size-[38px] rounded-full bg-[#fce7f3] font-bold text-[11px] text-[#881337] flex items-center justify-center shrink-0">
                            {member.initials}
                          </div>
                          <div>
                            <p className="font-bold text-[13px] text-[#1c1917]">{member.name}</p>
                            <p className="text-[11px] text-[#4c0519]">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-[18px] px-[16px] font-mono-num font-bold text-[#1c1917]">
                        {member.employeeCode}
                      </td>
                      <td className="py-[18px] px-[16px]">
                        <span className="bg-[#fce7f3] text-[#881337] font-bold text-[11px] px-[12px] py-[4px] rounded-full">
                          {member.role}
                        </span>
                        <div className="text-[10px] text-[#4c0519] mt-1">{member.stationNote}</div>
                      </td>
                      <td className="py-[18px] px-[16px] font-medium text-[#1c1917]">
                        {member.branchShift}
                      </td>
                      <td className="py-[18px] px-[16px] font-mono-num text-[11px] text-[#4c0519]">
                        {member.pinStatus}
                      </td>
                      <td className="py-[18px] px-[16px]">
                        <span className="bg-[#dcfce7] text-[#15803d] font-bold text-[11px] px-[10px] py-[4px] rounded-full flex items-center gap-[6px] w-fit">
                          <span className="size-[6px] rounded-full bg-[#15803d]" />
                          <span>{member.status}</span>
                        </span>
                      </td>
                      <td className="py-[18px] px-[16px] text-center">
                        <button
                          onClick={() => setCurrentUserByRole(member.role)}
                          className="px-[10px] py-[5px] rounded-[10px] border border-[#ffe4e6] hover:border-[#881337] text-[11px] font-semibold text-[#881337]"
                        >
                          Act As
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Invite Staff Modal */}
      {inviteOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleInviteStaff}
            className="bg-white border border-[#ffe4e6] rounded-[24px] max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <h3 className="font-bold text-lg text-[#1c1917]">Invite New Staff Member</h3>
            <div>
              <label className="block text-xs font-semibold text-[#4c0519] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Ruwan Jayasinghe"
                className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4c0519] mb-1">Work Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="ruwan.j@restroflow.lk"
                className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#4c0519] mb-1">RBAC Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as StaffMember['role'])}
                  className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Waiter">Waiter</option>
                  <option value="Kitchen">Kitchen</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4c0519] mb-1">Station</label>
                <input
                  type="text"
                  value={newStation}
                  onChange={(e) => setNewStation(e.target.value)}
                  className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 wine-pill-gradient text-white font-bold text-xs py-3 rounded-full shadow"
              >
                Create Staff Account
              </button>
              <button
                type="button"
                onClick={() => setInviteOpen(false)}
                className="px-5 py-3 bg-[#fff1f2] border border-[#ffe4e6] rounded-full font-semibold text-xs text-[#4c0519]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
