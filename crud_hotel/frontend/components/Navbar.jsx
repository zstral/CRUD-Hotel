'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Saira_Extra_Condensed } from 'next/font/google'
import { User, Shield } from 'lucide-react'
import ProgressiveBlur from './ProgressiveBlur'

const sairaExtraCondensed = Saira_Extra_Condensed({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
})

export default function Navbar() {

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.rol === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error al decodificar token:", err);
      }
    }
  }, []);

  return (
<div className="fixed top-0 left-0 w-full h-50 z-20">
      <ProgressiveBlur height="100%" />
      <div className="flex flex-col fixed place-self-center inset-x-0 top-5 w-4xl gap-2 z-30">
        <div className="place-self-center text-white mb-2">
          <h1 className={`${sairaExtraCondensed.className} text-3xl font-semibold text-[#ffffffde]`}>
            Hotel Pacific Reef
          </h1>
        </div>
        <div className="flex justify-between gap-10 items-center">
          <nav className="p-[5px] w-4xl bg-[#b6b6b64d] border border-[#86868621] backdrop-blur-sm rounded-full">
            <ul className="flex justify-between font-extralight text-sm text-white">
              <Link href="/">
                <li className="navbar-button">Inicio</li>
              </Link>
              <Link href="/booking">
                <li className="navbar-button">Reservar</li>
              </Link>
              <Link href="/contact">
                <li className="navbar-button">Contacto</li>
              </Link>
              <Link href="/help-center">
                <li className="navbar-button">Centro de ayuda</li>
              </Link>
              {isAdmin && (
                <Link href="/admin">
                  <li className="navbar-button flex items-center gap-1">
                    <Shield size={16} />
                    Administración
                  </li>
                </Link>
              )}
            </ul>
          </nav>
          <Link href="/auth/login"
            className="p-[5px] bg-[#7777774d] backdrop-blur-sm rounded-full text-white
                      transition duration-300 hover:bg-[#2020204d]"
          >
            <User />
          </Link>
        </div>
      </div>
    </div>
  )
}