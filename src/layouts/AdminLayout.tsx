import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Footer from "../components/Footer";

const AdminLayout = () => {
  return (
    // 1. Root: White bg, Black text, locked viewport height
    <div className="flex h-screen w-screen bg-white text-black overflow-hidden font-sans selection:bg-black selection:text-white">
      {/* 2. Sidebar Container: Fixed height, Right Border to separate from content */}
      <div className="shrink-0 h-full border-r-2 border-black bg-white z-20">
        <Sidebar />
      </div>

      {/* 3. Main Area: Scrollable Right Side */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent hover:scrollbar-thumb-black/40">
        {/* Content Wrapper: Pushes footer to bottom if content is short */}
        <div className="flex-1 w-full">
          <Outlet />
        </div>

        {/* Footer: Separated by top border */}
        <div className="border-t-2 border-black mt-auto bg-white">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
