// import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// import Sidebar from "../components/SideBar";

const AdminLayout = () => {
  //   useEffect(() => {
  //     const isAuth = localStorage.getItem("isAuthenticated");
  //     if (!isAuth) {
  //       navigate("/login");
  //     }
  //   }, [navigate]);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col bg-black text-[#f9f906] overflow-x-hidden font-sans"
      style={{
        backgroundImage: `radial-gradient(circle at center, "#23230f" 0%, #000000 70%)`,
      }}
    >
      <div className="flex">
        <div>{/* <Sidebar /> */}</div>
        <div>
          <main className="container mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
