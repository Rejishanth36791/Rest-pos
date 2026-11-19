import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestroFlow } from '../context/RestroFlowContext';

const ASSETS = {
  brandLogo: '/assets/figma/6252373a-2ce5-4b10-853a-a85cfedf81d9.svg',
  plusIcon: '/assets/figma/7b3bff58-d31c-42c5-9309-ff600fd9811a.svg',
  navDash: '/assets/figma/04ee6187-b70e-4e78-9efa-294d88bb336e.svg',
  navPos: '/assets/figma/5c7e5267-ecd5-47b0-b4a2-58a22876906c.svg',
  navKds: '/assets/figma/c2a9b733-4d70-46df-9684-e7e57a547f60.svg',
  navTables: '/assets/figma/b6b93958-c47e-4693-9743-9266ad991c23.svg',
  navOrders: '/assets/figma/c0afbd63-561e-4895-a851-944cb138f387.svg',
  searchIcon: '/assets/figma/0e2a1c47-2c38-45ed-b67b-5fd484314f37.svg',
  statActive: '/assets/figma/65719aff-16d9-43c7-91d2-63dd49131c89.svg',
  statCat: '/assets/figma/4111332e-2c0e-4044-926c-a38e7b669989.svg',
  statPrep: '/assets/figma/b631f006-45b7-46e8-b3a6-78467da9a447.svg',
  statUnavail: '/assets/figma/a556879e-49eb-4f9c-9bf1-45dcac97ad0b.svg',
};

const CATEGORIES = [
  'All Categories (48)',
  'Rice & Biryani',
  'Kottu & Roti',
  'Burgers',
  'Beverages',
  'Desserts',
];

export const MenuManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const { dishes, toggleDishAvailability, addDish } = useRestroFlow();

  const [selectedCategory, setSelectedCategory] = useState('All Categories (48)');
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Rice & Biryani');
  const [newPrice, setNewPrice] = useState(1850);
  const [newCost, setNewCost] = useState(520);
  const [newPrep, setNewPrep] = useState(10);

  const filteredDishes = dishes.filter((d) => {
    const matchCat = selectedCategory.startsWith('All') ? true : d.category === selectedCategory;
    const matchSearch = searchQuery.trim()
      ? d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.sku.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  const unavailableCount = dishes.filter((d) => !d.available).length;

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const margin = Math.round(((newPrice - newCost) / newPrice) * 100);
    addDish({
      sku: `SKU-${200 + dishes.length}`,
      name: newName,
      category: newCategory,
      description: 'Chef specialty prepared fresh to order',
      shortDesc: 'Chef specialty…',
      price: newPrice,
      foodCost: newCost,
      marginPercent: margin,
      prepTimeMinutes: newPrep,
      station: 'Wok',
      available: true,
      popular: true,
      veg: false,
      chefPick: false,
      iconAsset: '/assets/figma/49f62cad-7820-4718-8af2-1151ad123891.svg',
      bgTint: '#fdf2f8',
      soldToday: 1,
    });
    setNewName('');
    setAddModalOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fff1f2] text-[#1c1917]" data-node-id="1:1902">
      {/* LEFT NAVIGATION BAR */}
      <aside className="w-[256px] bg-white border-r border-[#ffe4e6] p-[20px] flex flex-col justify-between shrink-0 min-h-[1182px]">
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
                CULINARY VAULT
              </p>
            </div>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="w-full h-[44px] wine-pill-gradient text-white rounded-full flex items-center justify-center gap-[8px] font-semibold text-[12px] shadow-[0px_10px_15px_-3px_rgba(122,12,46,0.25)]"
          >
            <img src={ASSETS.plusIcon} alt="" className="size-[18px]" />
            <span>+ Add New Dish</span>
          </button>

          <p className="pt-[24px] px-[12px] font-bold text-[11px] tracking-[0.55px] text-[#4c0519] uppercase">
            NAVIGATION
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
              onClick={() => navigate('/menu')}
              className="w-full h-[42px] px-[15px] rounded-[20px] bg-[#fff1f2] border border-[#ffe4e6] flex items-center justify-between text-[12px] font-bold text-[#881337]"
            >
              <span>Menu Management</span>
              <span className="size-[20px] rounded-full bg-[#881337] text-white font-mono-num font-bold text-[11px] flex items-center justify-center">
                48
              </span>
            </button>
            <button
              onClick={() => navigate('/inventory')}
              className="w-full h-[40px] px-[14px] rounded-[20px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <span>Inventory &amp; Recipes</span>
              <span className="font-mono-num text-[11px] text-[#4c0519]">4</span>
            </button>
            <button
              onClick={() => navigate('/staff')}
              className="w-full h-[40px] px-[14px] rounded-[20px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <span>Staff &amp; RBAC</span>
              <span className="font-mono-num text-[11px] text-[#4c0519]">5</span>
            </button>
          </nav>
        </div>

        {/* Bottom Status Card */}
        <div className="border-t border-[#ffe4e6] pt-[17px] flex flex-col gap-[8px]">
          <div className="bg-[#fff1f2] border border-[#ffe4e6] rounded-full px-[15px] py-[8px] flex items-center gap-[8px]">
            <span className="size-[8px] rounded-full bg-[#15803d]" />
            <span className="font-semibold text-[11px] text-[#1c1917]">Catalog Synced</span>
          </div>
          <p className="px-[4px] text-[11px] text-[#4c0519]">48 Active Dishes · LKR Pricing</p>
        </div>
      </aside>

      {/* MAIN MENU MANAGEMENT CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP HEADER */}
        <header className="h-[80px] px-[32px] flex items-center justify-between shrink-0">
          <div>
            <p className="font-bold text-[11px] tracking-[1.1px] text-[#881337] uppercase">
              CULINARY CATALOG
            </p>
            <h1 className="font-bold text-[20px] leading-[28px] text-[#1c1917]">
              Menu &amp; Dish Pricing Management
            </h1>
          </div>

          <div className="flex items-center gap-[12px]">
            <div className="relative w-[288px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish name or SKU..."
                className="w-full h-[34px] bg-white border border-[#ffe4e6] rounded-full pl-[40px] pr-[16px] text-[12px] text-[#1c1917] focus:outline-none focus:border-[#881337]"
              />
              <img
                src={ASSETS.searchIcon}
                alt=""
                className="absolute left-[14px] top-[8px] size-[18px]"
              />
            </div>

            <button
              onClick={() => setAddModalOpen(true)}
              className="wine-pill-gradient text-white h-[34px] px-[16px] rounded-full font-bold text-[11px] shadow-sm"
            >
              + Add Dish
            </button>
          </div>
        </header>

        {/* MAIN CONTENT BODY */}
        <main className="px-[32px] pb-[40px] flex flex-col gap-[24px]">
          {/* HERO BANNER WITH MARGIN KPI DIAL */}
          <div className="wine-gradient rounded-[24px] p-[32px] flex items-center justify-between shadow-lg">
            <div className="flex flex-col gap-[6px] max-w-[500px]">
              <div className="backdrop-blur-xs bg-white/15 rounded-full px-[12px] py-[4px] flex items-center gap-[6px] w-fit">
                <span className="size-[6px] rounded-full bg-[#34d399]" />
                <span className="font-semibold text-[11px] text-white uppercase">
                  DYNAMIC RECIPE COSTING
                </span>
              </div>
              <h2 className="pt-[4px] font-bold text-[26px] leading-[34px] text-white">
                Culinary Engineering &amp; Margins
              </h2>
              <p className="text-[13px] leading-[20px] text-white/80">
                Real-time dish profitability linked directly to raw ingredient unit costs and POS
                terminal availability toggles.
              </p>
            </div>

            {/* Margin KPI Dial */}
            <div className="backdrop-blur-md bg-white/15 border border-white/20 rounded-[24px] px-[20px] py-[18px] flex items-center gap-[14px] shadow-lg">
              <div className="size-[48px] rounded-full border-4 border-[#34d399] flex items-center justify-center font-mono-num font-bold text-[13px] text-white">
                72%
              </div>
              <div>
                <p className="text-[11px] text-white/80">Gross Food Margin</p>
                <p className="font-bold text-[16px] text-white">Healthy Target</p>
              </div>
            </div>
          </div>

          {/* 4 SUMMARY CARDS */}
          <div className="grid grid-cols-4 gap-[16px]">
            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">Active Dishes</span>
                <div className="size-[36px] rounded-[20px] bg-[#fce7f3] flex items-center justify-center">
                  <img src={ASSETS.statActive} alt="" className="size-[20px]" />
                </div>
              </div>
              <div>
                <p className="font-mono-num font-bold text-[36px] leading-[44px] text-[#1c1917]">
                  {40 + dishes.filter((d) => d.available).length}
                </p>
                <p className="text-[12px] text-[#15803d] font-semibold mt-2">
                  Live on POS &amp; QR
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">Categories</span>
                <div className="size-[36px] rounded-[20px] bg-[#d1fae5] flex items-center justify-center">
                  <img src={ASSETS.statCat} alt="" className="size-[20px]" />
                </div>
              </div>
              <div>
                <p className="font-mono-num font-bold text-[36px] leading-[44px] text-[#1c1917]">
                  7
                </p>
                <p className="text-[12px] text-[#4c0519] mt-2">Wok, Kottu, Grill &amp; Bar</p>
              </div>
            </div>

            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">Avg Prep Time</span>
                <div className="size-[36px] rounded-[20px] bg-[#fef3c7] flex items-center justify-center">
                  <img src={ASSETS.statPrep} alt="" className="size-[20px]" />
                </div>
              </div>
              <div>
                <p className="font-mono-num font-bold text-[36px] leading-[44px] text-[#1c1917]">
                  11m
                </p>
                <p className="text-[12px] text-[#9a3412] font-semibold mt-2">
                  KDS SLA target: 12m
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">86'd / Unavailable</span>
                <div className="size-[36px] rounded-[20px] bg-[#fce7f3] flex items-center justify-center">
                  <img src={ASSETS.statUnavail} alt="" className="size-[20px]" />
                </div>
              </div>
              <div>
                <p className="font-mono-num font-bold text-[36px] leading-[44px] text-[#1c1917]">
                  {unavailableCount + 2}
                </p>
                <p className="text-[12px] text-[#be123c] font-semibold mt-2">
                  Temporarily out of stock
                </p>
              </div>
            </div>
          </div>

          {/* MAIN MENU TABLE & INTERACTIVE RECIPE CONFIGURATION */}
          <div className="bg-white border border-[#ffe4e6] rounded-[24px] overflow-hidden shadow-sm">
            {/* Toolbar Pills */}
            <div className="p-[20px] border-b border-[#ffe4e6] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-[8px]">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-[16px] py-[6px] rounded-full text-[11px] transition ${
                        active
                          ? 'bg-[#881337] text-white font-bold'
                          : 'bg-[#fff1f2] border border-[#ffe4e6] text-[#4c0519] font-medium'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setAddModalOpen(true)}
                className="wine-pill-gradient text-white px-[16px] py-[7px] rounded-full font-bold text-[11px] shadow-sm"
              >
                + New Dish
              </button>
            </div>

            {/* Menu Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#ffe4e6] bg-[#fff1f2]/50 text-[11px] font-bold text-[#4c0519]">
                    <th className="py-[16px] px-[24px]">Dish Item</th>
                    <th className="py-[16px] px-[16px]">Category</th>
                    <th className="py-[16px] px-[16px]">Price (LKR)</th>
                    <th className="py-[16px] px-[16px]">Food Cost</th>
                    <th className="py-[16px] px-[16px]">Gross Margin</th>
                    <th className="py-[16px] px-[16px]">Prep SLA</th>
                    <th className="py-[16px] px-[16px]">POS Status</th>
                    <th className="py-[16px] px-[16px] text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ffe4e6] text-[12px]">
                  {filteredDishes.map((dish) => (
                    <tr key={dish.id} className="hover:bg-[#fff1f2]/30">
                      <td className="py-[16px] px-[24px]">
                        <div className="flex items-center gap-[12px]">
                          <div
                            className="size-[48px] rounded-[16px] border border-[#ffe4e6] flex items-center justify-center shrink-0"
                            style={{ backgroundColor: dish.bgTint }}
                          >
                            <img src={dish.iconAsset} alt="" className="size-[24px]" />
                          </div>
                          <div>
                            <p className="font-bold text-[13px] text-[#1c1917]">{dish.name}</p>
                            <p className="text-[11px] text-[#4c0519]">
                              {dish.sku} · {dish.station} Station
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-[16px] px-[16px] font-medium text-[#4c0519]">
                        {dish.category}
                      </td>
                      <td className="py-[16px] px-[16px] font-mono-num font-bold text-[#1c1917]">
                        LKR {dish.price.toLocaleString()}
                      </td>
                      <td className="py-[16px] px-[16px] font-mono-num text-[#4c0519]">
                        LKR {dish.foodCost.toLocaleString()}
                      </td>
                      <td className="py-[16px] px-[16px]">
                        <span className="bg-[#dcfce7] text-[#15803d] font-mono-num font-bold text-[11px] px-[10px] py-[2px] rounded-full">
                          {dish.marginPercent}%
                        </span>
                      </td>
                      <td className="py-[16px] px-[16px] font-mono-num text-[#1c1917]">
                        {dish.prepTimeMinutes}m
                      </td>
                      <td className="py-[16px] px-[16px]">
                        <button
                          onClick={() => toggleDishAvailability(dish.id)}
                          className={`px-[12px] py-[4px] rounded-full flex items-center gap-[6px] font-bold text-[11px] transition ${
                            dish.available
                              ? 'bg-[#dcfce7] text-[#15803d]'
                              : 'bg-[#ffe4e6] text-[#be123c]'
                          }`}
                        >
                          <span
                            className={`size-[6px] rounded-full ${
                              dish.available ? 'bg-[#15803d]' : 'bg-[#be123c]'
                            }`}
                          />
                          <span>{dish.available ? 'Available' : 'Out of Stock'}</span>
                        </button>
                      </td>
                      <td className="py-[16px] px-[16px] text-center">
                        <button
                          onClick={() => toggleDishAvailability(dish.id)}
                          className="px-[10px] py-[5px] rounded-[10px] border border-[#ffe4e6] hover:border-[#881337] text-[11px] font-semibold text-[#881337]"
                        >
                          Toggle 86
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

      {/* Add Dish Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateDish}
            className="bg-white border border-[#ffe4e6] rounded-[24px] max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <h3 className="font-bold text-lg text-[#1c1917]">Add New Dish to Menu Catalog</h3>
            <div>
              <label className="block text-xs font-semibold text-[#4c0519] mb-1">Dish Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Jaffna Crab Curry"
                className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#4c0519] mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
                >
                  <option value="Rice & Biryani">Rice &amp; Biryani</option>
                  <option value="Kottu & Roti">Kottu &amp; Roti</option>
                  <option value="Burgers">Burgers</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4c0519] mb-1">
                  Prep Time (mins)
                </label>
                <input
                  type="number"
                  value={newPrep}
                  onChange={(e) => setNewPrep(Number(e.target.value))}
                  className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#4c0519] mb-1">
                  Selling Price (LKR)
                </label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4c0519] mb-1">
                  Recipe Food Cost (LKR)
                </label>
                <input
                  type="number"
                  value={newCost}
                  onChange={(e) => setNewCost(Number(e.target.value))}
                  className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 wine-pill-gradient text-white font-bold text-xs py-3 rounded-full shadow"
              >
                Save Dish to Catalog
              </button>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
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
