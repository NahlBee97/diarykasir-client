import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const CashierLayout = () => {
  return (
    // Changed bg-gray-100 to bg-white.
    // Added text-black and a custom selection style for high contrast polish.
    <div className="flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-white text-black selection:bg-black selection:text-white">
      <main className="w-full mx-auto min-h-screen overflow-y-auto">
        <Outlet />
      </main>

      {/* Added border-t border-black to separate footer cleanly */}
      <div className="border-t border-black">
        <Footer />
      </div>
    </div>
  );
};

export default CashierLayout;
