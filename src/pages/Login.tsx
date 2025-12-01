import { useState, useEffect } from "react";

// --- Icons ---

const PointOfSaleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 1 0-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3ZM3 20.25v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 12.75v7.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 20.25Zm4.875-3.75a.75.75 0 0 0 0 1.5h2.25a.75.75 0 0 0 0-1.5h-2.25Zm4.875 0a.75.75 0 0 0 0 1.5h2.25a.75.75 0 0 0 0-1.5h-2.25Z" />
  </svg>
);

const AdminPanelIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.352-.272-2.636-.759-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd"
    />
  </svg>
);

const BackspaceIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M2.515 10.674a1.875 1.875 0 0 0 0 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374ZM12.53 9.22a.75.75 0 1 0-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L15.31 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Sub-components ---

interface RoleCardProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const RoleCard = ({ label, icon, isActive, onClick }: RoleCardProps) => (
  <div
    onClick={onClick}
    className={`flex flex-col gap-4 rounded-lg justify-center items-center p-4 aspect-square cursor-pointer transition-all duration-300 border ${
      isActive
        ? "bg-black border-[#f9f906] shadow-[0_0_15px_rgba(249,249,6,0.4)]"
        : "bg-black/50 border-[#f9f906]/20 hover:border-[#f9f906]/60"
    }`}
  >
    <div
      className={`text-5xl transition-all duration-300 ${
        isActive
          ? "text-[#f9f906] drop-shadow-[0_0_8px_rgba(249,249,6,0.6)]"
          : "text-[#f9f906]/70"
      }`}
    >
      {icon}
    </div>
    <p
      className={`text-base font-bold leading-tight tracking-wider transition-colors ${
        isActive ? "text-[#f9f906]" : "text-[#f9f906]/70"
      }`}
    >
      {label}
    </p>
  </div>
);

const PinDot = ({ filled }: { filled: boolean }) => (
  <div
    className={`h-3.5 w-3.5 rounded-full border-2 border-[#f9f906]/50 transition-all duration-200 ${
      filled
        ? "bg-[#f9f906] shadow-[0_0_10px_rgba(249,249,6,0.5)] scale-110"
        : "bg-transparent scale-100"
    }`}
  ></div>
);

const KeypadButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center p-4 h-16 rounded-lg text-[#f9f906] text-2xl font-bold bg-black/50 border border-[#f9f906]/20 hover:border-[#f9f906] hover:shadow-[0_0_10px_rgba(249,249,6,0.2)] active:scale-95 transition-all duration-150"
  >
    {children}
  </button>
);

// --- Main Page Component ---

const Login = () => {
  const [activeRole, setActiveRole] = useState<"CASHIER" | "ADMIN">("CASHIER");
  const [pin, setPin] = useState<string>("");

  const handleNumClick = (num: string) => {
    if (pin.length < 6) {
      setPin((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleLogin = () => {
    console.log(`Logging in as ${activeRole} with PIN: ${pin}`);
    // Add authentication logic here
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleNumClick(e.key);
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Enter") {
        handleLogin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pin]);

  return (
    <div className="layout-container flex h-full grow flex-col">
      <div className="flex flex-1 justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="layout-content-container flex flex-col max-w-sm w-full mx-auto">
          {/* Headline */}
          <h1 className="text-[#f9f906] tracking-light text-[32px] font-bold leading-tight text-center pb-8 drop-shadow-[0_0_10px_rgba(249,249,6,0.5)]">
            DIARY KASIR
          </h1>

          {/* Role Selection Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <RoleCard
              label="CASHIER"
              icon={<PointOfSaleIcon className="w-12 h-12" />}
              isActive={activeRole === "CASHIER"}
              onClick={() => setActiveRole("CASHIER")}
            />
            <RoleCard
              label="ADMIN"
              icon={<AdminPanelIcon className="w-12 h-12" />}
              isActive={activeRole === "ADMIN"}
              onClick={() => setActiveRole("ADMIN")}
            />
          </div>

          {/* PIN Input Display */}
          <div className="flex justify-center px-4 py-8">
            <div className="relative flex gap-4">
              {[...Array(6)].map((_, i) => (
                <PinDot key={i} filled={i < pin.length} />
              ))}
            </div>
          </div>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-4 px-4 py-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <KeypadButton
                key={num}
                onClick={() => handleNumClick(num.toString())}
              >
                {num}
              </KeypadButton>
            ))}
            {/* Empty placeholder to align 0 and backspace */}
            <div className="flex items-center justify-center p-4 h-16 rounded-lg"></div>
            <KeypadButton onClick={() => handleNumClick("0")}>0</KeypadButton>
            <KeypadButton onClick={handleBackspace}>
              <BackspaceIcon className="w-8 h-8" />
            </KeypadButton>
          </div>

          {/* Login Button */}
          <div className="flex px-4 py-8 justify-center">
            <button
              onClick={handleLogin}
              className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#f9f906] text-black text-lg font-bold leading-normal tracking-wider hover:brightness-110 hover:shadow-[0_0_15px_rgba(249,249,6,0.5)] transition-all duration-300"
            >
              <span className="truncate">LOGIN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
