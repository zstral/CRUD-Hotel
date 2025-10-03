export default function Home() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 bg-[url('/assets/images/background-login.jpeg')] bg-cover bg-center bg-fixed" />
        <main className="relative z-10 flex place-self-center mt-48 mx-24">
            <div className="flex flex-col">
                <form className="flex flex-col justify-between w-80 h-90 rounded-2xl bg-[#ffffff31] backdrop-blur-sm p-8">
                    <div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="mb-2 text-sm font-light">Correo electrónico</label>
                            <input
                                className="bg-[#ffffff9f] p-2 rounded-lg text-[#272727]"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="mb-2 text-sm font-light">Contraseña</label>
                            <input
                                className="bg-[#ffffff9f] p-2 rounded-lg text-[#272727]"
                                type="password"
                                name="password"
                                placeholder="********"
                                required
                            />
                        </div>
                    </div>

                    <button className="bg-[#121C2B] text-white p-2 rounded-lg cursor-pointer" type="submit">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </main>
    </div>
  );
}
