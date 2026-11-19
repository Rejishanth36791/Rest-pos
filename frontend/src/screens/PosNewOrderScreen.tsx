import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestroFlow, Dish } from '../context/RestroFlowContext';

const ASSETS = {
  brandLogo: '/assets/figma/42ffd87a-06c1-47eb-923c-725763d00159.svg',
  posIcon: '/assets/figma/903df32d-85c8-429d-bc70-a417875e99ab.svg',
  kdsIcon: '/assets/figma/5306d121-283f-4c93-ba32-d5f65ddd2768.svg',
  floorIcon: '/assets/figma/aeee5ad5-30ac-4f3f-b558-25dd54fbcb66.svg',
  searchIcon: '/assets/figma/3a1a733e-3272-4bb4-b59e-9f5e68b2ce99.svg',
  dateIcon: '/assets/figma/4cdf82ad-566f-4eb4-a61a-85a924bf833e.svg',
  catAll: '/assets/figma/d2883972-ca0a-4606-9f45-ad8325570483.svg',
  catRice: '/assets/figma/35c8b426-a851-4295-abc0-a37fa3c7e9b7.svg',
  catKottu: '/assets/figma/348b2a72-a08a-430e-943b-50ea1366420c.svg',
  catBurgers: '/assets/figma/e64c3c24-8e0e-4b11-8721-bbd80e93da5f.svg',
  catBev: '/assets/figma/b9f672fa-e133-48b8-9057-45503b8933f0.svg',
  catDesserts: '/assets/figma/14642a59-ddee-4cda-9e12-820f06d87f12.svg',
  plusIcon: '/assets/figma/723fa5f2-8737-48dc-a885-92e80be57ecd.svg',
  customizerIcon: '/assets/figma/6ad7ac83-7311-45c9-b416-c06c7f09487d.svg',
  settleIcon: '/assets/figma/c2b71cca-d5aa-4d61-9667-6747bc577d28.svg',
};

const CATEGORIES = [
  { name: 'All Items', count: 48, icon: ASSETS.catAll },
  { name: 'Rice & Biryani', count: 12, icon: ASSETS.catRice },
  { name: 'Kottu & Roti', count: 8, icon: ASSETS.catKottu },
  { name: 'Burgers', count: 9, icon: ASSETS.catBurgers },
  { name: 'Beverages', count: 14, icon: ASSETS.catBev },
  { name: 'Desserts', count: 5, icon: ASSETS.catDesserts },
];

export const PosNewOrderScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    dishes,
    tables,
    activeTableId,
    posCart,
    addToPosCart,
    updatePosCartQty,
    removeFromPosCart,
    submitPosOrder,
    currentUser,
  } = useRestroFlow();

  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVeg, setFilterVeg] = useState(false);
  const [popularFirst, setPopularFirst] = useState(false);
  const [customizingDish, setCustomizingDish] = useState<Dish>(dishes[0]);
  const [portionSize, setPortionSize] = useState<'Regular' | 'Large'>('Large');
  const [extraTopping, setExtraTopping] = useState<boolean>(true);
  const [customNote, setCustomNote] = useState<string>('Separate chili paste');
  const [settleModalOpen, setSettleModalOpen] = useState<boolean>(false);

  const busyTablesCount = tables.filter((t) => t.status !== 'AVAILABLE').length;

  const filteredDishes = dishes
    .filter((d) => (selectedCategory === 'All Items' ? true : d.category === selectedCategory))
    .filter((d) => (filterVeg ? d.veg : true))
    .filter((d) =>
      searchQuery.trim()
        ? d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .sort((a, b) => (popularFirst ? Number(b.popular) - Number(a.popular) : 0));

  const customizerTotal =
    customizingDish.price + (portionSize === 'Large' ? 450 : 0) + (extraTopping ? 350 : 0);

  const subtotal = posCart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const serviceCharge = Math.round(subtotal * 0.1);
  const grandTotal = subtotal + serviceCharge;

  const handleSaveCustomItem = () => {
    const mods = [
      portionSize === 'Large' ? 'Large Portion (+450)' : 'Regular Portion',
      extraTopping ? 'Extra Chicken (+350)' : null,
    ]
      .filter(Boolean)
      .join(' · ');

    addToPosCart({
      dishId: customizingDish.id,
      name: customizingDish.name,
      unitPrice: customizerTotal,
      quantity: 1,
      modifiers: portionSize === 'Large' && extraTopping ? 'Large · Extra Chicken' : mods,
      kitchenNote: customNote,
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fff1f2] text-[#1c1917]" data-node-id="1:2">
      {/* TOP NAVIGATION BAR */}
      <header className="bg-white border-b border-[#ffe4e6] h-[80px] px-[24px] flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-[24px]">
          <div
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-[12px] cursor-pointer"
          >
            <div className="size-[40px] rounded-[20px] wine-logo-gradient flex items-center justify-center shadow-[0px_4px_6px_-1px_rgba(122,12,46,0.2)]">
              <img src={ASSETS.brandLogo} alt="RestroFlow" className="size-[24px]" />
            </div>
            <div>
              <p className="font-bold text-[16px] leading-[20px] tracking-[-0.4px] text-[#1c1917]">
                RestroFlow.
              </p>
              <p className="font-semibold text-[11px] leading-[14px] text-[#4c0519] uppercase">
                COLOMBO FLAGSHIP · TERMINAL #01
              </p>
            </div>
          </div>

          <div className="bg-[#ffe4e6] h-[24px] w-px" />

          {/* Quick Nav Mode Pills */}
          <div className="flex items-center gap-[8px]">
            <button
              onClick={() => navigate('/pos')}
              className="wine-pill-gradient text-white px-[16px] py-[8px] rounded-full flex items-center gap-[6px] shadow-[0px_4px_6px_-1px_rgba(122,12,46,0.2)]"
            >
              <img src={ASSETS.posIcon} alt="" className="size-[16px]" />
              <span className="font-bold text-[11px] leading-[14px]">POS Terminal</span>
            </button>

            <button
              onClick={() => navigate('/kds')}
              className="bg-white border border-[#ffe4e6] text-[#1c1917] px-[17px] py-[9px] rounded-full flex items-center gap-[6px] hover:bg-[#fff1f2] transition"
            >
              <img src={ASSETS.kdsIcon} alt="" className="size-[16px]" />
              <span className="font-semibold text-[11px] leading-[14px]">Kitchen Display</span>
            </button>

            <button
              onClick={() => navigate('/tables')}
              className="bg-white border border-[#ffe4e6] text-[#1c1917] px-[17px] py-[9px] rounded-full flex items-center gap-[6px] hover:bg-[#fff1f2] transition"
            >
              <img src={ASSETS.floorIcon} alt="" className="size-[16px]" />
              <span className="font-semibold text-[11px] leading-[14px]">Floor &amp; Tables</span>
            </button>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-[12px]">
          <div className="relative w-[256px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (F2)..."
              className="w-full h-[34px] bg-[#fff1f2] border border-[#ffe4e6] rounded-full pl-[40px] pr-[16px] text-[12px] text-[#1c1917] placeholder-[#6b7280] focus:outline-none focus:border-[#881337]"
            />
            <img
              src={ASSETS.searchIcon}
              alt=""
              className="absolute left-[14px] top-[8px] size-[18px]"
            />
          </div>

          <div className="bg-white border border-[#ffe4e6] px-[17px] py-[9px] rounded-full flex items-center gap-[6px]">
            <img src={ASSETS.dateIcon} alt="" className="size-[16px]" />
            <span className="font-medium text-[11px] leading-[14px] text-[#1c1917]">Thu, Nov 19</span>
          </div>

          <div
            onClick={() => navigate('/staff')}
            className="flex items-center gap-[8px] pl-[8px] cursor-pointer"
          >
            <div className="size-[36px] rounded-full bg-[#fce7f3] flex items-center justify-center font-bold text-[11px] text-[#881337]">
              {currentUser.initials}
            </div>
            <div>
              <p className="font-bold text-[12px] leading-[15px] text-[#1c1917]">{currentUser.name}</p>
              <div className="flex items-center gap-[4px]">
                <span className="size-[6px] rounded-full bg-[#15803d]" />
                <span className="font-medium text-[11px] leading-[16.5px] text-[#15803d]">
                  Shift #2 {currentUser.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN 3-COLUMN POS WORKSPACE */}
      <div className="flex flex-1 min-h-[1024px] w-full">
        {/* LEFT BAR: CATEGORY PILL NAVIGATION */}
        <aside className="w-[256px] bg-white border-r border-[#ffe4e6] p-[16px] flex flex-col justify-between shrink-0">
          <div className="flex flex-col gap-[16px]">
            <div className="px-[8px]">
              <p className="font-bold text-[11px] leading-[16.5px] tracking-[0.55px] text-[#4c0519] uppercase">
                MENU SECTIONS
              </p>
            </div>

            <div className="flex flex-col gap-[6px]">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-[15px] py-[11px] rounded-[20px] transition ${
                      active
                        ? 'bg-[#fff1f2] border border-[#ffe4e6]'
                        : 'hover:bg-[#fff1f2]/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-[10px]">
                      <img src={cat.icon} alt="" className="size-[20px]" />
                      <span
                        className={`text-[12px] leading-[16px] ${
                          active ? 'font-bold text-[#881337]' : 'font-medium text-[#1c1917]'
                        }`}
                      >
                        {cat.name}
                      </span>
                    </div>
                    {active ? (
                      <span className="size-[20px] rounded-full bg-[#881337] text-white font-mono-num font-bold text-[11px] flex items-center justify-center">
                        {cat.count}
                      </span>
                    ) : (
                      <span className="font-mono-num font-medium text-[11px] text-[#4c0519]">
                        {cat.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floor Telemetry Card */}
          <div
            onClick={() => navigate('/tables')}
            className="bg-[#fff1f2] border border-[#ffe4e6] rounded-[20px] p-[15px] flex flex-col gap-[6px] cursor-pointer hover:border-[#881337] transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[12px] text-[#1c1917]">Floor Occupancy</span>
              <span className="font-mono-num font-bold text-[12px] text-[#881337]">
                {busyTablesCount + 2} / 16 Tables
              </span>
            </div>
            <div className="bg-[#ffe4e6] h-[8px] rounded-full overflow-hidden">
              <div className="wine-pill-gradient h-full w-1/2 rounded-full" />
            </div>
          </div>
        </aside>

        {/* CENTER SECTION: PRODUCT GRID & WINE ACCENTS */}
        <main className="flex-1 p-[24px] flex flex-col gap-[20px] overflow-y-auto">
          {/* Center Banner / Mini Flow Bar */}
          <div className="wine-gradient rounded-[24px] p-[20px] flex items-center justify-between shadow-[0px_10px_15px_-3px_rgba(122,12,46,0.15)]">
            <div>
              <p className="font-bold text-[11px] leading-[14px] tracking-[0.55px] text-white/70 uppercase">
                TERMINAL FLOW · TABLE {activeTableId}
              </p>
              <h2 className="font-bold text-[16px] leading-[24px] text-white">
                Tap items to append to active guest ticket
              </h2>
            </div>
            <div className="flex items-center gap-[8px]">
              <button
                onClick={() => setFilterVeg(!filterVeg)}
                className={`px-[16px] py-[6px] rounded-full font-semibold text-[11px] leading-[14px] backdrop-blur-[4px] transition ${
                  filterVeg ? 'bg-white text-[#881337]' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Filter Veg
              </button>
              <button
                onClick={() => setPopularFirst(!popularFirst)}
                className={`px-[16px] py-[6px] rounded-full font-semibold text-[11px] leading-[14px] backdrop-blur-[4px] transition ${
                  popularFirst ? 'bg-white text-[#881337]' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Popular First
              </button>
            </div>
          </div>

          {/* Product Cards Grid (4 cols) */}
          <div className="grid grid-cols-4 gap-[16px]">
            {filteredDishes.slice(0, 6).map((dish) => {
              const isSelected = customizingDish.id === dish.id;
              return (
                <div
                  key={dish.id}
                  onClick={() => setCustomizingDish(dish)}
                  className={`bg-white rounded-[24px] p-[17px] flex flex-col justify-between relative cursor-pointer transition ${
                    isSelected
                      ? 'border-2 border-[#881337] shadow-md'
                      : 'border border-[#ffe4e6] shadow-sm hover:border-[#881337]/60'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-[12px] right-[12px] bg-[#fce7f3] px-[8px] py-[2px] rounded-full">
                      <span className="font-bold text-[11px] leading-[14px] text-[#881337]">CUSTOM</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-[2px]">
                    <div
                      className="h-[96px] rounded-[20px] border border-[#ffe4e6] flex items-center justify-center"
                      style={{ backgroundColor: dish.bgTint || '#fdf2f8' }}
                    >
                      <img src={dish.iconAsset} alt={dish.name} className="size-[44px]" />
                    </div>
                    <h3 className="pt-[10px] font-bold text-[16px] leading-[22px] text-[#1c1917] line-clamp-2">
                      {dish.name}
                    </h3>
                    <p className="font-normal text-[12px] leading-[16px] text-[#4c0519] truncate">
                      {dish.shortDesc}
                    </p>
                  </div>

                  <div className="pt-[16px]">
                    <div className="border-t border-[#ffe4e6] pt-[13px] flex items-center justify-between">
                      <div className="font-mono-num font-bold text-[14px] leading-[20px] text-[#1c1917]">
                        <p>LKR</p>
                        <p>{dish.price.toLocaleString()}</p>
                      </div>

                      {isSelected ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCustomizingDish(dish);
                          }}
                          className="wine-pill-gradient text-white px-[12px] py-[6px] rounded-full font-semibold text-[11px] leading-[14px]"
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToPosCart({
                              dishId: dish.id,
                              name: dish.name,
                              unitPrice: dish.price,
                              quantity: 1,
                              modifiers: 'Regular · Standard Prep',
                            });
                          }}
                          className="wine-pill-gradient size-[32px] rounded-full flex items-center justify-center shadow"
                        >
                          <img src={ASSETS.plusIcon} alt="Add" className="size-[18px]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CUSTOMIZATION BANNER DRAWER */}
          <div className="bg-white border border-[#ffe4e6] rounded-[24px] p-[21px] shadow-md flex items-center justify-between mt-auto">
            <div className="flex items-center gap-[12px]">
              <div className="size-[48px] rounded-[20px] bg-[#fce7f3] flex items-center justify-center shrink-0">
                <img src={ASSETS.customizerIcon} alt="" className="size-[26px]" />
              </div>
              <div>
                <div className="flex items-center gap-[8px]">
                  <h4 className="font-bold text-[16px] leading-[22px] text-[#1c1917]">
                    Customizer: {customizingDish.name}
                  </h4>
                  <span className="bg-[#881337] text-white font-bold text-[11px] px-[10px] py-[2px] rounded-full">
                    Table {activeTableId}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[12px] text-[#4c0519]">
                  <button
                    onClick={() => setPortionSize(portionSize === 'Large' ? 'Regular' : 'Large')}
                    className={`px-2 py-0.5 rounded-full border text-[11px] font-medium ${
                      portionSize === 'Large'
                        ? 'bg-[#fce7f3] border-[#881337] text-[#881337]'
                        : 'bg-[#fff1f2] border-[#ffe4e6]'
                    }`}
                  >
                    {portionSize === 'Large' ? 'Large Portion (+450)' : 'Regular Portion (+0)'}
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => setExtraTopping(!extraTopping)}
                    className={`px-2 py-0.5 rounded-full border text-[11px] font-medium ${
                      extraTopping
                        ? 'bg-[#fce7f3] border-[#881337] text-[#881337]'
                        : 'bg-[#fff1f2] border-[#ffe4e6]'
                    }`}
                  >
                    {extraTopping ? 'Extra Chicken (+350)' : 'No Extra (+0)'}
                  </button>
                  <span>·</span>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    className="bg-[#fff1f2] border border-[#ffe4e6] rounded-full px-2.5 py-0.5 text-[11px] text-[#4c0519] w-[150px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-[12px]">
              <span className="font-mono-num font-bold text-[16px] leading-[24px] text-[#881337]">
                LKR {customizerTotal.toLocaleString()}.00
              </span>
              <button
                onClick={handleSaveCustomItem}
                className="wine-pill-gradient text-white font-bold text-[12px] leading-[16px] px-[20px] py-[10px] rounded-full shadow-[0px_4px_6px_-1px_rgba(122,12,46,0.2)] hover:opacity-95 transition"
              >
                Save Item
              </button>
            </div>
          </div>
        </main>

        {/* RIGHT SECTION: ORDER CART WITH WINE CTAS */}
        <aside className="w-[384px] bg-white border-l border-[#ffe4e6] p-[20px] flex flex-col justify-between shrink-0">
          <div className="flex flex-col gap-[16px]">
            <div className="border-b border-[#ffe4e6] pb-[13px] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[16px] leading-[24px] text-[#1c1917]">Order #ORD-8492</h3>
                <p className="font-medium text-[11px] leading-[14px] text-[#4c0519]">
                  Table {activeTableId} · Server Nisal R.
                </p>
              </div>
              <span className="bg-[#fce7f3] text-[#881337] font-bold text-[11px] leading-[14px] px-[12px] py-[4px] rounded-full">
                DINE-IN
              </span>
            </div>

            {/* Cart Item Cards */}
            <div className="flex flex-col gap-[12px] max-h-[460px] overflow-y-auto pr-[4px]">
              {posCart.length === 0 ? (
                <div className="bg-[#fff1f2] border border-[#ffe4e6] rounded-[24px] p-6 text-center text-xs text-[#4c0519]">
                  No dishes in active ticket. Tap any dish card to append.
                </div>
              ) : (
                posCart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="bg-[#fff1f2] border border-[#ffe4e6] rounded-[24px] p-[15px] flex flex-col gap-[8px]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-[16px] leading-[24px] text-[#1c1917]">{item.name}</p>
                        <p className="font-medium text-[11px] leading-[14px] text-[#4c0519]">
                          {item.modifiers}
                        </p>
                      </div>
                      <span className="font-mono-num font-bold text-[14px] leading-[20px] text-[#1c1917]">
                        LKR {(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-[4px]">
                      <div className="bg-white border border-[#ffe4e6] rounded-full px-[5px] py-px flex items-center">
                        <button
                          onClick={() => updatePosCartQty(item.cartItemId, -1)}
                          className="size-[24px] flex items-center justify-center font-bold text-[16px] text-[#4c0519]"
                        >
                          -
                        </button>
                        <span className="w-[24px] text-center font-mono-num font-bold text-[11px] text-[#1c1917]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updatePosCartQty(item.cartItemId, 1)}
                          className="size-[24px] flex items-center justify-center font-bold text-[16px] text-[#881337]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromPosCart(item.cartItemId)}
                        className="font-medium text-[11px] leading-[14px] text-[#4c0519] hover:text-[#be123c]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Financial Calculation Summary & Grand Total */}
          <div className="border-t border-[#ffe4e6] pt-[17px] flex flex-col gap-[12px]">
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#4c0519]">Subtotal ({posCart.length} dishes):</span>
                <span className="font-mono-num font-medium text-[#1c1917]">
                  LKR {subtotal.toLocaleString()}.00
                </span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#4c0519]">Service (10%):</span>
                <span className="font-mono-num font-medium text-[#1c1917]">
                  LKR {serviceCharge.toLocaleString()}.00
                </span>
              </div>
            </div>

            <div className="border-t border-[#ffe4e6] pt-[9px] flex items-baseline justify-between">
              <span className="font-bold text-[16px] leading-[24px] text-[#1c1917]">Grand Total</span>
              <span className="font-mono-num font-bold text-[28px] leading-[36px] tracking-[-0.25px] text-[#881337]">
                LKR {grandTotal.toLocaleString()}.00
              </span>
            </div>

            <button
              onClick={() => setSettleModalOpen(true)}
              disabled={posCart.length === 0}
              className="w-full wine-pill-gradient text-white rounded-full px-[16px] py-[14px] flex items-center justify-center gap-[8px] shadow-[0px_10px_15px_-3px_rgba(122,12,46,0.25)] hover:opacity-95 transition disabled:opacity-50"
            >
              <img src={ASSETS.settleIcon} alt="" className="size-[20px]" />
              <span className="font-bold text-[14px] leading-[20px]">
                Generate Bill &amp; Settle (F9)
              </span>
            </button>
          </div>
        </aside>
      </div>

      {/* Settlement Modal */}
      {settleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#ffe4e6] rounded-[24px] max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-bold text-lg text-[#1c1917]">
              Settle &amp; Dispatch Ticket · Table {activeTableId}
            </h3>
            <p className="text-xs text-[#4c0519] mt-1">
              Confirm payment method to generate thermal receipt and dispatch order to Main Kitchen KDS.
            </p>
            <div className="my-4 bg-[#fff1f2] border border-[#ffe4e6] rounded-2xl p-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#4c0519]">Payable Amount</span>
              <span className="font-mono-num font-bold text-xl text-[#881337]">
                LKR {grandTotal.toLocaleString()}.00
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  submitPosOrder('Paid (Card)');
                  setSettleModalOpen(false);
                }}
                className="wine-pill-gradient text-white font-bold text-xs py-3 rounded-full shadow"
              >
                Pay by Card &amp; Send
              </button>
              <button
                onClick={() => {
                  submitPosOrder('Paid (Cash)');
                  setSettleModalOpen(false);
                }}
                className="bg-[#15803d] text-white font-bold text-xs py-3 rounded-full shadow"
              >
                Pay by Cash &amp; Send
              </button>
            </div>
            <button
              onClick={() => setSettleModalOpen(false)}
              className="mt-3 w-full py-2 text-xs font-semibold text-[#4c0519] hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
