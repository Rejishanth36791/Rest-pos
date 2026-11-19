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
  statSku: '/assets/figma/65719aff-16d9-43c7-91d2-63dd49131c89.svg',
  statVal: '/assets/figma/4111332e-2c0e-4044-926c-a38e7b669989.svg',
  statLow: '/assets/figma/b631f006-45b7-46e8-b3a6-78467da9a447.svg',
  statDep: '/assets/figma/a556879e-49eb-4f9c-9bf1-45dcac97ad0b.svg',
};

const INV_CATEGORIES = [
  'All Stock (84)',
  'Grains & Meat',
  'Dairy',
  'Seafood',
  'Spices & Dry Goods',
];

export const InventoryManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const { ingredients, restockIngredient, addIngredient, showToast } = useRestroFlow();

  const [selectedCategory, setSelectedCategory] = useState('All Stock (84)');
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('SP');
  const [newCategory, setNewCategory] = useState('Grains & Meat');
  const [newQty, setNewQty] = useState(25);
  const [newCost, setNewCost] = useState(950);
  const [newSupplier, setNewSupplier] = useState('Ceylon Spice Exports');

  const filteredIngredients = ingredients.filter((ing) => {
    const matchCat = selectedCategory.startsWith('All') ? true : ing.category === selectedCategory;
    const matchSearch = searchQuery.trim()
      ? ing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ing.supplier.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addIngredient({
      code: newCode.toUpperCase().slice(0, 2),
      name: newName,
      skuSubtext: `SKU-ING-${20 + ingredients.length} · Bulk Pack`,
      category: newCategory,
      stockQty: newQty,
      unit: 'kg',
      unitCost: newCost,
      reorderLevel: 10,
      supplier: newSupplier,
      status: newQty === 0 ? 'DEPLETED' : newQty < 10 ? 'LOW_STOCK' : 'HEALTHY',
    });
    setNewName('');
    setAddModalOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fff1f2] text-[#1c1917]" data-node-id="1:2224">
      {/* LEFT NAVIGATION BAR */}
      <aside className="w-[256px] bg-white border-r border-[#ffe4e6] p-[20px] flex flex-col justify-between shrink-0 min-h-[1340px]">
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
                STOCK LEDGER
              </p>
            </div>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="w-full h-[44px] wine-pill-gradient text-white rounded-full flex items-center justify-center gap-[8px] font-semibold text-[12px] shadow-[0px_10px_15px_-3px_rgba(122,12,46,0.25)]"
          >
            <img src={ASSETS.plusIcon} alt="" className="size-[18px]" />
            <span>+ Log Purchase</span>
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
              onClick={() => navigate('/menu')}
              className="w-full h-[40px] px-[14px] rounded-[20px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <span>Menu Catalog</span>
              <span className="font-mono-num text-[11px] text-[#4c0519]">48</span>
            </button>
            <button
              onClick={() => navigate('/inventory')}
              className="w-full h-[42px] px-[15px] rounded-[20px] bg-[#fff1f2] border border-[#ffe4e6] flex items-center justify-between text-[12px] font-bold text-[#881337]"
            >
              <span>Inventory &amp; Recipes</span>
              <span className="size-[20px] rounded-full bg-[#881337] text-white font-mono-num font-bold text-[11px] flex items-center justify-center">
                4
              </span>
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="w-full h-[40px] px-[14px] rounded-[20px] flex items-center justify-between text-[12px] font-medium text-[#1c1917] hover:bg-[#fff1f2]"
            >
              <span>Orders Ledger</span>
              <span className="font-mono-num text-[11px] text-[#4c0519]">142</span>
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

        {/* Bottom Stock Alert Card */}
        <div className="border-t border-[#ffe4e6] pt-[17px] flex flex-col gap-[8px]">
          <div className="bg-[#fff1f2] border border-[#ffe4e6] rounded-full px-[15px] py-[8px] flex items-center gap-[8px]">
            <span className="size-[8px] rounded-full bg-[#15803d]" />
            <span className="font-semibold text-[11px] text-[#1c1917]">Recipe Sync On</span>
          </div>
          <p className="px-[4px] text-[11px] text-[#4c0519]">Auto-Deduction via POS Active</p>
        </div>
      </aside>

      {/* MAIN INVENTORY WORKSPACE */}
      <div className="flex-1 flex flex-col">
        {/* TOP HEADER */}
        <header className="h-[80px] px-[32px] flex items-center justify-between shrink-0">
          <div>
            <p className="font-bold text-[11px] tracking-[1.1px] text-[#881337] uppercase">
              PANTRY &amp; COLD STORAGE
            </p>
            <h1 className="font-bold text-[20px] leading-[28px] text-[#1c1917]">
              Inventory &amp; Recipe Stock Ledger
            </h1>
          </div>

          <div className="flex items-center gap-[12px]">
            <div className="relative w-[288px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients or suppliers..."
                className="w-full h-[34px] bg-white border border-[#ffe4e6] rounded-full pl-[40px] pr-[16px] text-[12px] text-[#1c1917] focus:outline-none focus:border-[#881337]"
              />
              <img
                src={ASSETS.searchIcon}
                alt=""
                className="absolute left-[14px] top-[8px] size-[18px]"
              />
            </div>

            <button
              onClick={() => showToast('Exported Monthly Stock Valuation Report (LKR 1.84M)')}
              className="bg-white border border-[#ffe4e6] h-[34px] px-[16px] rounded-full font-semibold text-[11px] text-[#1c1917] hover:bg-[#fff1f2]"
            >
              Export
            </button>
          </div>
        </header>

        {/* CONTENT BODY */}
        <main className="px-[32px] pb-[40px] flex flex-col gap-[24px]">
          {/* HERO BANNER WITH STOCK HEALTH DIAL */}
          <div className="wine-gradient rounded-[24px] p-[32px] flex items-center justify-between shadow-lg">
            <div className="flex flex-col gap-[6px] max-w-[490px]">
              <div className="backdrop-blur-xs bg-white/15 rounded-full px-[12px] py-[4px] flex items-center gap-[6px] w-fit">
                <span className="size-[6px] rounded-full bg-[#34d399]" />
                <span className="font-semibold text-[11px] text-white uppercase">
                  POS RECIPE AUTO-DEDUCTION
                </span>
              </div>
              <h2 className="pt-[4px] font-bold text-[26px] leading-[34px] text-white">
                Automated Stock &amp; Recipe Vault
              </h2>
              <p className="text-[13px] leading-[20px] text-white/80">
                Every settled POS and QR ticket automatically deducts raw gram/liter recipe portions
                from Colombo Flagship cold storage.
              </p>
            </div>

            {/* Stock Health Dial Card */}
            <div className="backdrop-blur-md bg-white/15 border border-white/20 rounded-[24px] px-[20px] py-[18px] flex items-center gap-[14px] shadow-lg">
              <div className="size-[48px] rounded-full border-4 border-[#34d399] flex items-center justify-center font-mono-num font-bold text-[13px] text-white">
                93%
              </div>
              <div>
                <p className="text-[11px] text-white/80">Stock Health</p>
                <p className="font-bold text-[16px] text-white">Optimal Supply</p>
              </div>
            </div>
          </div>

          {/* 4 METRIC STAT CARDS */}
          <div className="grid grid-cols-4 gap-[16px]">
            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">Total Ingredients</span>
                <div className="size-[36px] rounded-[20px] bg-[#fce7f3] flex items-center justify-center">
                  <img src={ASSETS.statSku} alt="" className="size-[20px]" />
                </div>
              </div>
              <div>
                <p className="font-mono-num font-bold text-[36px] leading-[44px] text-[#1c1917]">
                  84
                </p>
                <p className="text-[12px] text-[#4c0519] mt-2">Tracked raw SKUs</p>
              </div>
            </div>

            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">Stock Valuation</span>
                <div className="size-[36px] rounded-[20px] bg-[#d1fae5] flex items-center justify-center">
                  <img src={ASSETS.statVal} alt="" className="size-[20px]" />
                </div>
              </div>
              <div>
                <p className="font-mono-num font-bold text-[28px] leading-[36px] text-[#1c1917]">
                  LKR 1.84M
                </p>
                <p className="text-[12px] text-[#15803d] font-semibold mt-2">
                   FIFO audited value
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">Low Stock Alerts</span>
                <div className="size-[36px] rounded-[20px] bg-[#fef3c7] flex items-center justify-center">
                  <img src={ASSETS.statLow} alt="" className="size-[20px]" />
                </div>
              </div>
              <div>
                <p className="font-mono-num font-bold text-[36px] leading-[44px] text-[#1c1917]">
                  4
                </p>
                <p className="text-[12px] text-[#9a3412] font-semibold mt-2">
                  Below reorder threshold
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[25px] flex flex-col justify-between shadow-sm">
              <div className="pb-[16px] flex items-center justify-between">
                <span className="font-semibold text-[12px] text-[#1c1917]">Depleted Stock</span>
                <div className="size-[36px] rounded-[20px] bg-[#fce7f3] flex items-center justify-center">
                  <img src={ASSETS.statDep} alt="" className="size-[20px]" />
                </div>
              </div>
              <div>
                <p className="font-mono-num font-bold text-[36px] leading-[44px] text-[#1c1917]">
                  2
                </p>
                <p className="text-[12px] text-[#be123c] font-semibold mt-2">
                  Immediate PO required
                </p>
              </div>
            </div>
          </div>

          {/* INGREDIENT INVENTORY TABLE */}
          <div className="bg-white border border-[#ffe4e6] rounded-[24px] overflow-hidden shadow-sm">
            <div className="p-[20px] border-b border-[#ffe4e6] flex flex-col gap-[14px]">
              <div className="flex flex-wrap items-center gap-[8px]">
                {INV_CATEGORIES.map((cat) => {
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

              <div className="flex items-center gap-[12px]">
                <button
                  onClick={() =>
                    showToast('Recipe BOM Mapping: 1x Chicken Fried Rice deducts 250g Basmati & 180g Chicken')
                  }
                  className="bg-[#fff1f2] border border-[#ffe4e6] px-[16px] py-[7px] rounded-full font-semibold text-[11px] text-[#881337] hover:bg-[#ffe4e6]"
                >
                  Recipe BOM Mapping
                </button>
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="wine-pill-gradient text-white px-[16px] py-[7px] rounded-full font-bold text-[11px] shadow-sm"
                >
                  + Add Ingredient
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#ffe4e6] bg-[#fff1f2]/50 text-[11px] font-bold text-[#4c0519]">
                    <th className="py-[16px] px-[24px]">Ingredient SKU</th>
                    <th className="py-[16px] px-[16px]">Category</th>
                    <th className="py-[16px] px-[16px]">In Stock</th>
                    <th className="py-[16px] px-[16px]">Unit Cost (LKR)</th>
                    <th className="py-[16px] px-[16px]">Reorder Min</th>
                    <th className="py-[16px] px-[16px]">Primary Supplier</th>
                    <th className="py-[16px] px-[16px]">Stock Status</th>
                    <th className="py-[16px] px-[16px] text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ffe4e6] text-[12px]">
                  {filteredIngredients.map((ing) => (
                    <tr key={ing.id} className="hover:bg-[#fff1f2]/30">
                      <td className="py-[18px] px-[24px]">
                        <div className="flex items-center gap-[12px]">
                          <div className="size-[40px] rounded-[14px] bg-[#fce7f3] border border-[#ffe4e6] font-mono-num font-bold text-[12px] text-[#881337] flex items-center justify-center shrink-0">
                            {ing.code}
                          </div>
                          <div>
                            <p className="font-bold text-[13px] text-[#1c1917]">{ing.name}</p>
                            <p className="text-[11px] text-[#4c0519]">{ing.skuSubtext}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-[18px] px-[16px] font-medium text-[#4c0519]">
                        {ing.category}
                      </td>
                      <td className="py-[18px] px-[16px] font-mono-num font-bold text-[#1c1917]">
                        {ing.stockQty} {ing.unit}
                      </td>
                      <td className="py-[18px] px-[16px] font-mono-num text-[#1c1917]">
                        LKR {ing.unitCost.toLocaleString()} / {ing.unit}
                      </td>
                      <td className="py-[18px] px-[16px] font-mono-num text-[#4c0519]">
                        {ing.reorderLevel} {ing.unit}
                      </td>
                      <td className="py-[18px] px-[16px] font-medium text-[#1c1917]">
                        {ing.supplier}
                      </td>
                      <td className="py-[18px] px-[16px]">
                        {ing.status === 'LOW_STOCK' && (
                          <span className="bg-[#fef3c7] text-[#9a3412] font-bold text-[10px] px-[10px] py-[4px] rounded-full flex items-center gap-[6px] w-fit">
                            <span className="size-[6px] rounded-full bg-[#f59e0b]" />
                            <span>Low Stock</span>
                          </span>
                        )}
                        {ing.status === 'HEALTHY' && (
                          <span className="bg-[#dcfce7] text-[#15803d] font-bold text-[10px] px-[10px] py-[4px] rounded-full flex items-center gap-[6px] w-fit">
                            <span className="size-[6px] rounded-full bg-[#15803d]" />
                            <span>Healthy</span>
                          </span>
                        )}
                        {ing.status === 'FRESH_DAIRY' && (
                          <span className="bg-[#e0f2fe] text-[#0369a1] font-bold text-[10px] px-[10px] py-[4px] rounded-full flex items-center gap-[6px] w-fit">
                            <span className="size-[6px] rounded-full bg-[#0284c7]" />
                            <span>Fresh Dairy</span>
                          </span>
                        )}
                        {ing.status === 'DEPLETED' && (
                          <span className="bg-[#ffe4e6] text-[#be123c] font-bold text-[10px] px-[10px] py-[4px] rounded-full flex items-center gap-[6px] w-fit">
                            <span className="size-[6px] rounded-full bg-[#be123c]" />
                            <span>Depleted</span>
                          </span>
                        )}
                      </td>
                      <td className="py-[18px] px-[16px] text-center">
                        <button
                          onClick={() => restockIngredient(ing.id, 25)}
                          className={`px-[12px] py-[6px] rounded-full font-bold text-[11px] transition ${
                            ing.status === 'LOW_STOCK' || ing.status === 'DEPLETED'
                              ? 'wine-pill-gradient text-white shadow-xs'
                              : 'bg-[#fff1f2] border border-[#ffe4e6] text-[#881337] hover:bg-[#ffe4e6]'
                          }`}
                        >
                          + Restock 25kg
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

      {/* Add Ingredient Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddIngredient}
            className="bg-white border border-[#ffe4e6] rounded-[24px] max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <h3 className="font-bold text-lg text-[#1c1917]">Log New Ingredient Stock</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-[#4c0519] mb-1">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ceylon Cinnamon Quills"
                  className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4c0519] mb-1">Code</label>
                <input
                  type="text"
                  maxLength={2}
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs font-mono-num"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#4c0519] mb-1">
                  Initial Qty (kg)
                </label>
                <input
                  type="number"
                  value={newQty}
                  onChange={(e) => setNewQty(Number(e.target.value))}
                  className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4c0519] mb-1">
                  Unit Cost (LKR)
                </label>
                <input
                  type="number"
                  value={newCost}
                  onChange={(e) => setNewCost(Number(e.target.value))}
                  className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4c0519] mb-1">Supplier</label>
              <input
                type="text"
                value={newSupplier}
                onChange={(e) => setNewSupplier(e.target.value)}
                className="w-full h-10 bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-3 text-xs"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 wine-pill-gradient text-white font-bold text-xs py-3 rounded-full shadow"
              >
                Save Ingredient
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
