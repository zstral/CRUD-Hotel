import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 bg-[url('/assets/images/background.jpg')] bg-cover bg-center bg-fixed" />
      <main className="relative z-10 flex items-center justify-between gap-20 mt-42 mx-24">
        <div className="flex flex-col">
          <div className="flex flex-col w-lg rounded-2xl bg-[#00000018] backdrop-blur-sm">
            <div className="p-5">
              <h1 className="text-2xl font-normal">Bienvenido a Hotel Pacific Reef</h1>
              <p className="text-sm font-light">
                En Hotel Pacific Reef cada detalle está diseñado para que vivas una experiencia inolvidable, ya sea que nos visites por descanso, negocios o una escapada romántica.<br/>
                Relájate en nuestras habitaciones con vista al mar, disfruta de la gastronomía local y déjate envolver por la calidez de nuestra hospitalidad.
                Tu refugio frente al mar te espera.
              </p>
            </div>
          </div>
          <div className="mt-5">
            <Link href="/reservas" className="mt-5 px-4 py-2 bg-[#121C2B] text-white rounded-lg hover:bg-[#34517c] transition">
              Reserva tu habitación
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#ffffffa2] scrollbar-track-[#00000000] rounded-lg">
          <div className="flex space-x-4 p-4">
            <Image
              src="/assets/images/hab1.jpg"
              alt="Room 1"
              width={512}
              height={160}
              className="w-[256px] h-[380px] object-cover rounded-lg shadow-md"
            />
            <Image
              src="/assets/images/hab2.jpg"
              alt="Room 2"
              width={512}
              height={160}
              className="w-[256px] h-[380px] object-cover rounded-lg shadow-md"
            />
            <Image
              src="/assets/images/hab3.jpg"
              alt="Room 3"
              width={512}
              height={160}
              className="w-[256px] h-[380px] object-cover rounded-lg shadow-md"
            />
            <Image
              src="/assets/images/hab4.webp"
              alt="Room 4"
              width={512}
              height={160}
              className="w-[256px] h-[380px] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
