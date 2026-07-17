"use client";

import axios from "axios";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const request = await axios.post("http://localhost:3000/api/auth/login", { email, password }, { withCredentials: true });

      if (request) {
        toast.success("Login Has Been Succesful");
        router.push("/dashboard");
      } else {
        toast.error("Unknown Error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
        toast.error(message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    }
  }
  return (
    <div className="w-full min-h-screen bg-blue-50 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl h-[560px] rounded-3xl overflow-hidden shadow-xl flex bg-white">
        <div className="relative w-1/2 hidden md:flex flex-col justify-center px-12 bg-gradient-to-br from-blue-500 to-blue-900 overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border border-blue-400/30" />
          <div className="absolute -bottom-40 -left-10 w-96 h-96 rounded-full border border-blue-400/20" />

          <div className="relative z-10">
            <h1 className="text-white text-3xl font-bold mb-3">GuestHub</h1>
            <p className="text-blue-100 text-sm leading-relaxed mb-6 max-w-xs">
              Managing hotel reservations from a single location, streamlining
              the guest experience
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 sm:px-16 bg-white">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Welcome Back!</h2>
            <p className="text-slate-500 text-sm mt-1">Log in to continue</p>
          </div>

          <form className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 rounded-full border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => handleShowPassword()}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              onClick={loginUser}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium py-3 rounded-full cursor-pointer"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-[15px] text-slate-500 mt-4">
            If you forget your password please contact with your manager
          </p>
        </div>
      </div>
    </div>
  );
}
