import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestroFlow } from '../context/RestroFlowContext';

const ASSETS = {
  searchIcon: '/assets/figma/68cb152e-27d5-46e2-b9de-4dd28ba1f2f7.svg',
  item1Rice: '/assets/figma/bf204c4c-3e3c-47fd-b7e4-485c461ced2e.svg',
  customizeArrow: '/assets/figma/994b366c-4926-46b5-938f-5e2c99e926b3.svg',
  item2Kottu: '/assets/figma/a74ff6e8-875f-4da9-8f61-fab92fda6975.svg',
  plusBtnIcon: '/assets/figma/f8e9e974-6252-4fde-b270-4e62966b2dbe.svg',
  item3Milo: '/assets/figma/717e6e64-ef58-46f5-8b45-19655001050f.svg',
  headerBrandIcon: '/assets/figma/c2def7db-acad-40d9-b5e1-d2abb0fe9f00.svg',
  orderStatusBtn: '/assets/figma/6d50da40-0fc0-490b-a9d5-d1fe1ce075cc.svg',
};

const MOBILE_CATEGORIES = ['Popular Picks', 'Rice & Biryani', 'Kottu', 'Beverages'];

export const CustomerQrScreen: React.FC = () => {
  const navigate = useNavigate();
  const { dishes, qrCart, updateQrCart, submitQrOrder } = useRestroFlow();

  const [selectedCategory, setSelectedCategory] = useState('Popular Picks');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartSheetOpen, setCartSheetOpen] = useState(false);

  const totalItems = Object.values(qrCart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(qrCart).reduce((sum, [id, qty]) => {
    const dish = dishes.find((d) => d.id === id);
    return sum + (dish ? dish.price * qty : 0);
  }, 0);

  const mobileItems = [
    {
      id: 'DISH-01',
      name: 'Chicken Fried Rice',
      desc: 'Wok basmati rice, eggs, scallions',
      price: 1650,
      chefPick: true,
      bg: '#fce7f3',
      icon: ASSETS.item1Rice,
      category: 'Rice & Biryani',
    },
    {
      id: 'DISH-02',
      name: 'Cheese Chicken Kottu',
      desc: 'Shredded roti, melted creamy cheese',
      price: 1950,
      chefPick: false,
      bg: '#fef3c7',
      icon: ASSETS.item2Kottu,
      category: 'Kottu',
    },
    {
      id: 'DISH-06',
      name: 'Iced Milo Dinosaur',
      desc: 'Double malt heap, condensed milk',
      price: 750,
      chefPick: false,
      bg: '#fce7f3',
      icon: ASSETS.item3Milo,
      category: 'Beverages',
    },
  ].filter((item) => {
    const matchCat =
      selectedCategory === 'Popular Picks' ? true : item.category === selectedCategory;
    const matchSearch = searchQuery.trim()
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen w-full bg-[#292524] flex items-center justify-center py-6 px-4">
      {/* 390x884 Mobile Viewport Frame matching Figma node 1:1263 */}
      <div
        className="w-[390px] min-h-[884px] bg-[#fff1f2] border-x border-[#ffe4e6] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.4)] flex flex-col justify-between relative overflow-hidden rounded-[28px]"
        data-node-id="1:1263"
      >
        <div>
          {/* TOP MOBILE HEADER */}
          <header className="bg-white border-b border-[#ffe4e6] px-[16px] pt-[16px] pb-[17px] flex items-center justify-between">
            <div className="flex items-center gap-[12px]">
              <div className="size-[40px] rounded-full wine-logo-gradient flex items-center justify-center shadow-[0px_4px_6px_-1px_rgba(122,12,46,0.2)]">
                <img src={ASSETS.headerBrandIcon} alt="" className="size-[20px]" />
              </div>
              <div>
                <h1 className="font-bold text-[16px] leading-[20px] text-[#1c1917]">
                  The Galle Pavilion
                </h1>
                <div className="flex items-center gap-[4px]">
                  <span className="size-[6px] rounded-full bg-[#15803d]" />
                  <span className="font-bold text-[11px] leading-[14px] text-[#881337]">
                    Table T-04 · Dine-In Guest
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/kds')}
              title="View Live Kitchen Status"
              className="size-[36px] rounded-full bg-[#fff1f2] border border-[#ffe4e6] flex items-center justify-center"
            >
              <img src={ASSETS.orderStatusBtn} alt="" className="size-[20px]" />
            </button>
          </header>

          {/* SEARCH & CATEGORY CHIPS SCROLLER */}
          <div className="bg-white border-b border-[#ffe4e6] px-[12px] pt-[12px] pb-[13px] flex flex-col gap-[12px]">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, drinks, desserts..."
                className="w-full h-[34px] bg-[#fff1f2] border border-[#ffe4e6] rounded-full pl-[40px] pr-[16px] text-[12px] text-[#1c1917] placeholder-[#6b7280] focus:outline-none focus:border-[#881337]"
              />
              <img
                src={ASSETS.searchIcon}
                alt=""
                className="absolute left-[14px] top-[8px] size-[18px]"
              />
            </div>

            <div className="flex items-center gap-[8px] overflow-x-auto no-scrollbar">
              {MOBILE_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-[16px] py-[6px] rounded-full text-[11px] leading-[14px] whitespace-nowrap transition ${
                      active
                        ? 'wine-pill-gradient text-white font-bold shadow-sm'
                        : 'bg-[#fff1f2] border border-[#ffe4e6] text-[#1c1917] font-medium'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN - DIGITAL MENU FOOD ITEMS */}
          <main className="px-[16px] pt-[16px] pb-[120px] flex flex-col gap-[14px]">
            {mobileItems.map((item) => {
              const qty = qrCart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#ffe4e6] rounded-[24px] p-[17px] flex items-center gap-[14px] shadow-sm"
                >
                  <div
                    className="size-[80px] rounded-[20px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.bg }}
                  >
                    <img src={item.icon} alt={item.name} className="size-[36px]" />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-bold text-[16px] leading-[22px] text-[#1c1917] truncate">
                        {item.name}
                      </h3>
                      {item.chefPick && (
                        <span className="bg-[#fce7f3] text-[#881337] font-bold text-[11px] leading-[14px] px-[8px] py-[2px] rounded-full shrink-0">
                          CHEF PICK
                        </span>
                      )}
                    </div>

                    <p className="text-[12px] leading-[16px] text-[#4c0519]">{item.desc}</p>

                    <div className="pt-[8px] flex items-center justify-between">
                      <span className="font-mono-num font-bold text-[14px] leading-[20px] text-[#1c1917]">
                        LKR {item.price.toLocaleString()}
                      </span>

                      {item.id === 'DISH-01' && qty <= 1 ? (
                        <button
                          onClick={() => updateQrCart(item.id, 1)}
                          className="wine-pill-gradient text-white px-[14px] py-[4px] rounded-full flex items-center gap-[4px] shadow-sm"
                        >
                          <span className="font-bold text-[11px] leading-[14px]">Customize</span>
                          <img src={ASSETS.customizeArrow} alt="" className="size-[14px]" />
                        </button>
                      ) : qty === 0 ? (
                        <button
                          onClick={() => updateQrCart(item.id, 1)}
                          className="size-[32px] rounded-full wine-pill-gradient flex items-center justify-center shadow-sm"
                        >
                          <img src={ASSETS.plusBtnIcon} alt="Add" className="size-[16px]" />
                        </button>
                      ) : (
                        <div className="bg-[#fff1f2] border border-[#ffe4e6] rounded-full px-[5px] py-px flex items-center">
                          <button
                            onClick={() => updateQrCart(item.id, -1)}
                            className="size-[24px] flex items-center justify-center font-bold text-[16px] text-[#4c0519]"
                          >
                            -
                          </button>
                          <span className="w-[24px] text-center font-mono-num font-bold text-[11px] text-[#1c1917]">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQrCart(item.id, 1)}
                            className="size-[24px] flex items-center justify-center font-bold text-[16px] text-[#881337]"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* LIVE KITCHEN ORDER TRACKER BANNER */}
            <div className="wine-gradient rounded-[24px] p-[20px] flex flex-col gap-[12px] shadow-[0px_10px_15px_-3px_rgba(122,12,46,0.2)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <span className="size-[10px] rounded-full bg-[#fbbf24]" />
                  <span className="font-bold text-[16px] leading-[24px] text-white">
                    Kitchen Preparing
                  </span>
                </div>
                <span className="backdrop-blur-[4px] bg-white/20 px-[10px] py-[2px] rounded-full font-mono-num font-medium text-[11px] text-[#fde68a]">
                  Est: 8 mins
                </span>
              </div>

              <p className="text-[12px] leading-[16px] text-white/80">
                Order #ORD-8492 received by Chef Sahan. Table service is coming up!
              </p>

              <div className="bg-white/20 h-[8px] rounded-full overflow-hidden">
                <div className="bg-[#34d399] h-full w-[65%] rounded-full" />
              </div>
            </div>
          </main>
        </div>

        {/* FIXED BOTTOM CHECKOUT / CART BAR */}
        <footer className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#ffe4e6] px-[16px] pt-[17px] pb-[16px] flex flex-col gap-[10px] shadow-[0px_-10px_30px_rgba(0,0,0,0.12)]">
          <div className="px-[4px] flex items-center justify-between text-[11px]">
            <span className="font-medium text-[#4c0519]">
              Table T-04 Cart ({totalItems} items)
            </span>
            <span className="font-mono-num font-bold text-[#1c1917]">
              Subtotal: LKR {subtotal.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => setCartSheetOpen(true)}
            className="w-full wine-pill-gradient text-white rounded-full px-[20px] py-[14px] flex items-center justify-between shadow-[0px_10px_15px_-3px_rgba(122,12,46,0.25)] hover:opacity-95 transition"
          >
            <div className="flex items-center gap-[8px]">
              <span className="size-[24px] rounded-full bg-white/20 font-mono-num font-bold text-[11px] flex items-center justify-center">
                {totalItems}
              </span>
              <span className="font-bold text-[14px] leading-[20px]">
                View Cart &amp; Confirm
              </span>
            </div>
            <span className="font-mono-num font-bold text-[14px] leading-[20px]">
              LKR {subtotal.toLocaleString()}.00 →
            </span>
          </button>
        </footer>

        {/* Mobile Cart Confirmation Bottom Sheet */}
        {cartSheetOpen && (
          <div className="absolute inset-0 z-30 bg-black/50 backdrop-blur-xs flex flex-col justify-end">
            <div className="bg-white rounded-t-[28px] p-5 border-t border-[#ffe4e6] shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#ffe4e6]">
                <h4 className="font-bold text-base text-[#1c1917]">
                  Confirm Table T-04 Order
                </h4>
                <button
                  onClick={() => setCartSheetOpen(false)}
                  className="text-xs font-semibold text-[#881337]"
                >
                  Close
                </button>
              </div>
              <div className="my-3 space-y-2 max-h-44 overflow-y-auto">
                {Object.entries(qrCart).map(([dishId, qty]) => {
                  const dish = dishes.find((d) => d.id === dishId);
                  if (!dish) return null;
                  return (
                    <div key={dishId} className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#1c1917]">
                        {qty}x {dish.name}
                      </span>
                      <span className="font-mono-num font-bold text-[#1c1917]">
                        LKR {(dish.price * qty).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  submitQrOrder();
                  setCartSheetOpen(false);
                }}
                className="w-full wine-pill-gradient text-white font-bold text-xs py-3.5 rounded-full shadow-lg mt-2"
              >
                Send Directly to Kitchen KDS · LKR {subtotal.toLocaleString()}.00
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
