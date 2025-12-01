import { useState, useMemo } from "react";
import PaymentModal from "../components/FinalizePayment";

// --- Icons ---

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
  </svg>
);

// --- Types & Data ---

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Spicy Chicken",
    price: 12.5,
    category: "Chicken",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIQ_CkWDxpK66zAMrMgNmNlr1DKOL_lz9taz_IwXycWY73QXY-0GO0u331ZC2aXic_WLH6oExuBxNuJrbABLBo7DF873Yop4WeqEgxeHgE52UtSxPvZmxXi-u27GpLfA5mrqHaAPM4sdTmkeRtOYGBNz_8Mlit1AF2hzEuaxhdntWvFgXBJeksbdftPNjHKNKwuYKVUEYmlaIM44wCih8iJCouHyuX6zYOxhbAU0gjpthVej9wSJTTwVfePkCASKzqBuptQ_ufm8s",
  },
  {
    id: 2,
    name: "Original Chicken",
    price: 11.0,
    category: "Chicken",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0fFBp3xV9SXMaVdCvgiVpUvWO1AdbOkxxXYEzxUZuj70542hvozrrU3ATvmXKuvfAIIp8NWW3FGyEWz3PfJd29LuHh3sUC9rCA_rdM7wpF6ukTDdgztHwIgtL48qCN7UnID-RQuuRtP7rliQz9OLu9OZGs7MfojbxUK9rTvrE16oIMXKsRNTgbmTCmfQQI5y-QTwNSNvrvhMVm2ReKKLzk6DvOq0mESSQNY4cHvD2PEaTpUDc6cNpysk-p6Y23EFNtNSz3AdeeLU",
  },
  {
    id: 3,
    name: "Chicken Wings",
    price: 15.0,
    category: "Chicken",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEbWxYAMSl4YcVgU4OMWZ9NCSORU1Igoy5PFxnaMfcdJKLar_7P7FreYn3u9W-rk4j3WvUwcNhAGU0gpl9e4yzv3GApHKjr7Q0tnFt0Ni_0NGp_SO0a0apHTgXQynKBlotdbvA0cuYWlbS6kaIDw7vocdPCdwByTDfGt61kX_Ao8pMLkSUPRXCDsvor06G9wpn2Ks5R8Py8P1BunCYz8HuDLTwN1aKyT4pUtxgfxmUWlhRCtvnz37eO3noRURgxZapfPPjlxjYkj0",
  },
  {
    id: 4,
    name: "Chicken Burger",
    price: 9.75,
    category: "Chicken",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmiptObKU5j8l2IdxeW_E_AYjKOGAZG9ZzO6vexcVAVN3YIA8vmred-5YdOc81j6YKVvfLm2CZdxEyGwAkFOTPoKdID8EpMosCRui3ooydAFssZV92sCiI9rcU2RvTgOv9o8KdgA42gMDV_L3QdeP3KOxr2KTyhKQ-lR6UBu28wVcU_gf9enFbqByk6pzeBoUvxyuh1cJ0EFWIBhX0ASSnqDKyuCi4A9FFzi77FMFF0pMPl4ED5bkZ-H9FPSa2EH5skXywtZrzbio",
  },
  {
    id: 5,
    name: "Chicken Nuggets",
    price: 8.5,
    category: "Chicken",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5R0V4xavNV9lVYkDOyMOWGfH7Ac7JyW4_d4Btl4tnCRlf2TcpCYu4NUKK6ggLEpuQEf6FMtjDwQJ_PRzYlhvEQwnvnZigZHYlA1BYjIX9hv04jjmBk1QCRJrYted0BbV6yDDSoyM33R81J3N9aA9odqu2ct4qKwPvIoO6JhjGYw8Ds1n5-JVyZeDaq57NMP3J9nWnIWCBezL9rHAkduM7DnHLU9j3RWA5vHpLntXvapOOvF5o6f9_Yry_m1VkF8o2HI5wnqVCjkU",
  },
  {
    id: 6,
    name: "Chicken Strips",
    price: 10.25,
    category: "Chicken",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAX5-D4BitLtKiMdHkgVHPhWCfSYcU0h13-Kn48s9C20PeYNt3-4QiEUvfLyg2bN1d7JTbSssdVZzVY380vvRtBrEtTwhScjCJJHwEUwnXlRZnalunepBPNEdUPdI_at98I57hUDpcTYErAyo_Yk-c_rfyWa6IRF24kHbC3QJ1dr5NWEG0nU0RIfcxMTOm6CqXUaItjEYdMx8lIJN23npIGb9pn6r8CgvvJGvVM9lr64s1QhFaNibuMY7ee6VqSSoO9WDeg2fnnU3c",
  },
  {
    id: 7,
    name: "Cola",
    price: 2.5,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 8,
    name: "French Fries",
    price: 4.5,
    category: "Sides",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0yW0kqGHf76CqoNUxq_bZtJsCbZn41L28uA_OVR0GMUbzYAIZ3bwztIwL1wA9ED5Vu-dm7KsAbIXsOzmOOA6nYqgfbGlDrZsOg5alYl-uc5GDXRDnxoZajxgL53fZwSYr3N_euKvRGoyu8q_UlQMoDP5hVBikF40xTTKH_s1jMdvW50tkmL3klZ-LO3XaEw4FgIb99_rQNtjQuuOFDBUJT7CPVy2gP1UOx4tFz6mQmZxVEjNGyku05UjS6_C6thXKTjzR5VU-8sU",
  },
];

const CATEGORIES = ["Chicken", "Drinks", "Sides", "Desserts"];

// --- Components ---

const Pos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Chicken");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([
    { ...MENU_ITEMS[0], quantity: 2 }, // Initial mock data from HTML
    { ...MENU_ITEMS[3], quantity: 1 },
    { ...MENU_ITEMS[7], quantity: 1 },
  ]);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(
      (item) =>
        item.category === activeCategory &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeCategory, searchQuery]);

  // Cart Logic
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="relative flex h-screen w-full flex-col text-white overflow-hidden bg-[#11110A] font-sans">
      <div className="flex h-full w-full">
        {/* --- Left Column (Menu) --- */}
        <div className="flex flex-col w-[65%] h-full bg-[#11110A] border-r border-r-[#f9f906]/20">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-b-[#f9f906]/20">
            <div className="flex items-center gap-3">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAW_zDxbYU1GJ2Fcl5dsuf3x992q8SyTXZdXj8JUOL6EGBaQakQQ2ruLIof4z239rhkznkUGwCR0fVu-o3ghSBDc11Z_ud02OLsCMPClKQlSDtZ7QbruHX2PBRJyhW9nNKtxn9Pjadd5g3jYwwknEaxFMPnX2IArGqUshqyahDMS62x03kN0v6eM1niLyuwSBaKFEn2CB3jjXMfZAS7nxjNWROjBenNyjNbm8d-ZfP2Pi3IH8lqeEGztDDsTsRWZVNdVxS0bmBvqqg")',
                }}
              ></div>
              <div className="flex flex-col">
                <h1 className="text-white text-lg font-bold leading-normal">
                  Diary Kasir
                </h1>
                <p className="text-[#f9f906]/70 text-sm font-normal leading-normal">
                  POS Terminal
                </p>
              </div>
            </div>
            {/* Search Bar */}
            <div className="relative w-1/3">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f9f906]/50">
                <SearchIcon />
              </div>
              <input
                className="w-full bg-[#23230f] border border-[#f9f906]/30 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-[#f9f906]/50 focus:ring-[#f9f906] focus:border-[#f9f906] outline-none transition-shadow duration-300 focus:shadow-[0_0_10px_rgba(249,249,6,0.3)]"
                placeholder="Search product..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="pb-3 pt-4 px-6">
            <div className="flex border-b border-[#f9f906]/20 gap-8">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-2 transition-colors duration-300 ${
                    activeCategory === category
                      ? "border-b-[#f9f906] text-[#f9f906]"
                      : "border-b-transparent text-[#f9f906]/60 hover:text-[#f9f906]"
                  }`}
                >
                  <p className="text-base font-bold leading-normal tracking-[0.015em]">
                    {category}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#f9f906]/20 scrollbar-track-transparent">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="bg-black/50 flex flex-col gap-3 rounded-lg border border-[#f9f906]/30 justify-end aspect-square p-4 cursor-pointer transition-all duration-300 hover:border-[#f9f906] hover:shadow-[0_0_15px_rgba(249,249,6,0.3)] group relative overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0) 100%), url("${item.image}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="relative z-10">
                    <p className="text-[#f9f906] text-lg font-bold leading-tight line-clamp-2 drop-shadow-md">
                      {item.name}
                    </p>
                    <p className="text-white text-base font-medium">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Right Column (Cart) --- */}
        <div className="flex flex-col w-[35%] h-full bg-[#23230f]">
          <h2
            className="text-[#f9f906] text-[22px] font-bold leading-tight tracking-[-0.015em] px-6 pb-4 pt-6"
            style={{ textShadow: "0 0 10px rgba(249, 249, 6, 0.3)" }}
          >
            CURRENT ORDER
          </h2>

          <div className="flex-1 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-[#f9f906]/20 scrollbar-track-transparent">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 px-4 py-3 justify-between hover:bg-black/20 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 shrink-0"
                    style={{ backgroundImage: `url("${item.image}")` }}
                  ></div>
                  <div className="flex flex-col justify-center min-w-0">
                    <p className="text-[#f9f906] text-base font-medium leading-normal truncate">
                      {item.name}
                    </p>
                    <p className="text-white/70 text-sm font-normal leading-normal">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2 text-white">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-lg font-bold flex h-7 w-7 items-center justify-center rounded-full bg-[#11110A] hover:bg-[#f9f906] hover:text-black transition-colors duration-200"
                    >
                      <MinusIcon />
                    </button>
                    <span className="text-base font-medium w-5 text-center text-[#f9f906]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-lg font-bold flex h-7 w-7 items-center justify-center rounded-full bg-[#11110A] hover:bg-[#f9f906] hover:text-black transition-colors duration-200"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                  <p className="text-white text-base font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-[#f9f906]/50">
                <p>No items in order</p>
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="p-6 border-t border-t-[#f9f906]/20 mt-auto bg-[#23230f]">
            <div className="flex flex-col gap-3 text-base">
              <div className="flex justify-between items-center">
                <p className="text-white/70">Subtotal</p>
                <p className="text-white font-medium">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-white/70">Tax (10%)</p>
                <p className="text-white font-medium">${tax.toFixed(2)}</p>
              </div>
              <div className="w-full h-px bg-[#f9f906]/20 my-2"></div>
              <div className="flex justify-between items-center">
                <p className="text-[#f9f906] font-bold text-xl">Total</p>
                <p className="text-[#f9f906] font-bold text-xl">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-6 bg-[#f9f906] text-black text-xl font-bold py-4 rounded-lg hover:brightness-110 transition-all duration-300 shadow-[0_0_15px_rgba(249,249,6,0.4)] hover:shadow-[0_0_20px_rgba(249,249,6,0.6)]"
            >
              PROCEED TO PAY
            </button>
          </div>
        </div>
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          total={50000}
          onConfirm={(cash, change) => {
            alert(`Paid: ${cash}, Change: ${change}`);
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default Pos;
