import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingModal from "../components/LoadingModal";
import { getAllUsers } from "../services/userServices";
import type { User } from "../interfaces/authInterfaces";
import { EyeClosedIcon, EyeOpenIcon } from "../components/Icons";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const {
    data: users = [],
    isLoading: isLoadingUsers,
    error: isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  useEffect(() => {
    if (user) {
      if (user.role === "CASHIER") {
        navigate("/pos", { replace: true });
      } else if (user.role === "ADMIN") {
        navigate("/admin", { replace: true });
      }
    }
  }, [user, navigate]);

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: async (password: string) => {
      return await login(selectedUserId!, password);
    },
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = Number(e.target.value);
    setSelectedUserId(selectedUserId);
  };

  return (
    <div className="layout-container flex h-full grow flex-col bg-white text-black">
      <div className="flex flex-1 justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="layout-content-container flex flex-col max-w-sm w-full mx-auto">
          {/* Logo Section */}
          <div className="flex justify-center mb-6">
            <img
              src="/diarylogo.jpeg" // Update this path to your logo file
              alt="Logo"
              className="h-24 w-auto object-contain rounded-xl"
            />
          </div>

          {/* Headline */}
          <h1 className="tracking-tight text-[32px] font-black leading-tight text-center mb-8 uppercase">
            DIARY KASIR
          </h1>

          {/* Cashier Selection */}
          <div className="flex flex-col justify-center items-center gap-2 mb-2">
            <label
              htmlFor="cashier-select"
              className="self-start text-lg font-bold"
            >
              Masuk sebagai:
            </label>
            <select
              id="cashier-select"
              className="mb-4 p-3 border-2 border-black rounded-lg w-full bg-white text-black font-medium focus:outline-none"
              onChange={handleUserChange}
            >
              {isLoadingUsers ? (
                <option>Memuat...</option>
              ) : isError ? (
                <option>Gagal memuat pengguna</option>
              ) : (
                <option value="1">Admin</option>
              )}
              {users.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))} 
            </select>
          </div>

          {/* password input */}
          <div className="flex flex-col justify-center items-center gap-2 mb-2">
            <label
              htmlFor="cashier-select"
              className="self-start text-lg font-bold"
            >
              Masukkan password:
            </label>
            <div className="relative w-full">
              <input
                name="password"
                // 3. Toggle type based on state
                type={showPassword ? "text" : "password"}
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black py-2 focus:outline-0 border-2 border-black bg-white h-14 placeholder:text-black/30 px-4 pr-12 text-base font-bold transition-all duration-200 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* 4. Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <div className="flex p-4 justify-center">
            <button
              onClick={() => handleLogin(password)}
              className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-black text-white text-lg font-black leading-normal tracking-widest hover:bg-gray-800 transition-all duration-200 border-2 border-black"
            >
              <span className="truncate">LOGIN</span>
            </button>
          </div>
        </div>
      </div>
      <LoadingModal isOpen={isPending} message="Masuk..." />
    </div>
  );
};

export default Login;
