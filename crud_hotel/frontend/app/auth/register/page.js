"use client";

import useAuth from "@/hooks/useAuth";

export default function Register() {
  const { email, setEmail, contrasenna, setContrasenna, handleRegister } = useAuth();

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 bg-[url('/assets/images/background-login.jpeg')] bg-cover bg-center bg-fixed" />
      <main className="relative z-10 flex place-self-center mt-48 mx-24">
        <div className="flex flex-col">
          <form
            className="flex flex-col justify-between w-80 h-80 rounded-2xl bg-[#ffffff31] backdrop-blur-sm p-8"
            onSubmit={handleRegister}
          >
            <div>
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="mb-2 text-sm font-light">
                  Correo electrónico
                </label>
                <input
                  className="bg-[#ffffff9f] p-2 rounded-lg text-[#272727]"
                  type="email"
                  name="email"
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
                  name="password"
                  placeholder="********"
                  required
                  value={contrasenna}
                  onChange={(e) => setContrasenna(e.target.value)}
                />
              </div>
            </div>

            <div className="text-sm text-white text-center">
              <p>¿Ya tienes una cuenta? <a href="/auth/login" className="text-blue-500">Inicia sesión</a></p>
            </div>

            <button
              className="bg-[#1B3A5C] text-white p-2 rounded-lg cursor-pointer"
              type="submit"
            >
              Registrarse
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
