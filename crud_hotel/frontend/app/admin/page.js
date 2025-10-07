"use client";

import Link from "next/link";
import { LayoutDashboard, Users, Settings } from "lucide-react";

export default function AdminPageMenu() {
  return (
    <div className="relative min-h-screen bg-[url('/assets/images/background-login.jpeg')] bg-cover bg-center bg-fixed flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <main className="relative z-10 mt-28 w-[380px] sm:w-[450px] bg-[#ffffff31] backdrop-blur-md p-10 rounded-2xl shadow-lg border border-white/20 text-white flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-8 tracking-wide text-center">
          Panel de Administración
        </h1>

        <ul className="flex flex-col w-full gap-5">
          <li>
            <Link
              href="/admin/rooms"
              className="flex items-center justify-center gap-3 bg-[#ffffff1f] hover:bg-[#ffffff3a] transition rounded-xl py-3 text-lg font-light shadow-md"
            >
              <LayoutDashboard size={20} />
              Gestión de Habitaciones
            </Link>
          </li>

          <li>
            <Link
              href="/admin/users"
              className="flex items-center justify-center gap-3 bg-[#ffffff1f] hover:bg-[#ffffff3a] transition rounded-xl py-3 text-lg font-light shadow-md"
            >
              <Users size={20} />
              Gestión de Usuarios
            </Link>
          </li>

          <li>
            <Link
              href="/admin/settings"
              className="flex items-center justify-center gap-3 bg-[#121C2B] hover:bg-[#0e1622] transition rounded-xl py-3 text-lg font-light shadow-md"
            >
              <Settings size={20} />
              Configuración
            </Link>
          </li>
        </ul>

        <Link
          href="/"
          className="mt-8 text-sm underline hover:text-gray-200 transition"
        >
          ← Volver al inicio
        </Link>
      </main>
    </div>
  );
}
