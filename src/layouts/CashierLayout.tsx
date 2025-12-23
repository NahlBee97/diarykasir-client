// import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const CashierLayout = () => {
  return (
    <div className="flex min-h-screen min-w-screen flex-col justify-between overflow-x-hidden">
      <main className="container mx-auto">
        <Outlet />
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CashierLayout;
