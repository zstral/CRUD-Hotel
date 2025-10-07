"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const { email, setEmail, contrasenna, setContrasenna, handleLogin } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Revisar token en localStorage antes de renderizar
    const token = localStorage.getItem("token");
    if (token) {
      // Redirige directamente al perfil
      router.replace("/profile");
    } else {
      // Si no hay token, muestra el formulario
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Cargando...
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 bg-[url('/assets/images/background-login.jpeg')] bg-cover bg-center bg-fixed" />
      <main className="relative z-10 flex place-self-center mt-48 mx-24">
        <div className="flex flex-col">
          <form
            className="flex flex-col justify-between w-80 h-80 rounded-2xl bg-[#ffffff31] backdrop-blur-sm p-8"
            onSubmit={handleLogin}
          >
            <div>
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="mb-2 text-sm font-light">
                  Correo electrónico
                </label>
                <input
                  className="bg-[#ffffff9f] p-2 rounded-lg text-[#272727]"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="mb-2 text-sm font-light">
                  Contraseña
                </label>
                <input
                  className="bg-[#ffffff9f] p-2 rounded-lg text-[#272727]"
                  type="password"
                  placeholder="********"
                  required
                  value={contrasenna}
                  onChange={(e) => setContrasenna(e.target.value)}
                />
              </div>
            </div>

            <div className="text-sm text-white text-center">
              <p>¿No tienes una cuenta? <a href="/auth/register" className="text-blue-500">Regístrate</a></p>
            </div>

            <button
              className="bg-[#121C2B] text-white p-2 rounded-lg cursor-pointer"
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
