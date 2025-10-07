"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function Profile() {
  const router = useRouter();
  const { handleLogout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ email: payload.sub, rol: payload.rol });
    } catch (error) {
      console.error("Token inválido:", error);
      localStorage.removeItem("token");
      router.replace("/login");
    }
  }, [router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-[url('/assets/images/background-login.jpeg')] bg-cover bg-center bg-fixed" />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-[#ffffff26] backdrop-blur-md rounded-2xl p-10 w-96 shadow-lg text-white text-center border border-[#ffffff3b] transition-transform hover:scale-105 duration-300">
          <h1 className="text-3xl font-semibold mb-3">👋 Bienvenido</h1>
          <p className="text-lg mb-6 text-gray-200">
            Has iniciado sesión como: <br />
            <span className="text-white font-bold">{user.email}</span>
          </p>

          <div className="flex flex-col items-center">
            <p className="text-sm mb-6 opacity-80">
              Rol: <span className="capitalize font-medium">{user.rol}</span>
            </p>

            <button
              onClick={() => {
                handleLogout();
                router.push("/auth/login");
              }}
              className="bg-[#121C2B] hover:bg-[#1c2b40] transition-colors text-white font-medium py-2 px-6 rounded-lg"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
