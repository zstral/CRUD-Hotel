"use client";

import Image from "next/image";
import { useState } from "react";
import { Calendar, Users } from "lucide-react";

const habitacionesData = [
  {
    id: 1,
    nombre: "Zen Rest",
    descripcion: "Habitación tranquila con cama king y vista al mar.",
    imagen: "/assets/images/hab2.jpg",
    capacidad: 2,
    habitaciones: 1,
    disponibles: ["2025-10-10", "2025-10-11", "2025-10-12"],
  },
  {
    id: 2,
    nombre: "Brisa Azul",
    descripcion: "Habitación moderna con balcón frente al mar.",
    imagen: "/assets/images/hab1.jpg",
    capacidad: 2,
    habitaciones: 1,
    disponibles: ["2025-10-10", "2025-10-15"],
  },
  {
    id: 3,
    nombre: "Coral Encantado",
    descripcion: "Habitación familiar con espacio para niños.",
    imagen: "/assets/images/hab3.jpg",
    capacidad: 4,
    habitaciones: 2,
    disponibles: ["2025-10-12", "2025-10-13", "2025-10-14"],
  },
];

export default function Booking() {
  const [llegada, setLlegada] = useState("");
  const [salida, setSalida] = useState("");
  const [personas, setPersonas] = useState("2 Adultos - 1 habitación");
  const [resultados, setResultados] = useState(habitacionesData);

  // Parsear el string de personas
  const parsePersonas = (str) => {
    const match = str.match(/(\d+)\s*Adultos?.*?(\d+)\s*habitación/);
    if (!match) return { adultos: 2, habitaciones: 1 };
    return { adultos: parseInt(match[1]), habitaciones: parseInt(match[2]) };
  };

  const handleFiltrar = () => {
    if (!llegada || !salida) {
      alert("Por favor selecciona fechas de llegada y salida.");
      return;
    }

    const { adultos, habitaciones: habCount } = parsePersonas(personas);

    const resultadosFiltrados = habitacionesData.filter((hab) => {
      // Filtrar por capacidad
      const capacidadOk = hab.capacidad >= adultos && hab.habitaciones >= habCount;

      // Filtrar por disponibilidad de fechas
      const llegadaDate = new Date(llegada);
      const salidaDate = new Date(salida);
      let disponible = true;

      for (let d = new Date(llegadaDate); d <= salidaDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split("T")[0];
        if (!hab.disponibles.includes(dateStr)) {
          disponible = false;
          break;
        }
      }

      return capacidadOk && disponible;
    });

    setResultados(resultadosFiltrados);
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-[url('/assets/images/background.jpg')] bg-cover bg-center bg-fixed" />

      <main className="relative z-10 flex flex-col items-center mt-42 px-8 py-16 text-[#272727]">
        {/* Filtros */}
        <div className="bg-[#ffffffb3] backdrop-blur-sm w-full max-w-5xl rounded-3xl p-6 mb-10 flex flex-wrap justify-between gap-4 shadow-lg">
          {/* Llegada */}
          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="font-semibold mb-1">Llegada</label>
            <div className="flex items-center border border-gray-400 rounded-xl px-3 py-2 bg-white">
              <input
                type="date"
                value={llegada}
                onChange={(e) => setLlegada(e.target.value)}
                className="flex-1 outline-none bg-transparent"
              />
              <Calendar size={18} className="ml-2 text-gray-700" />
            </div>
          </div>

          {/* Salida */}
          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="font-semibold mb-1">Salida</label>
            <div className="flex items-center border border-gray-400 rounded-xl px-3 py-2 bg-white">
              <input
                type="date"
                value={salida}
                onChange={(e) => setSalida(e.target.value)}
                className="flex-1 outline-none bg-transparent"
              />
              <Calendar size={18} className="ml-2 text-gray-700" />
            </div>
          </div>

          {/* Personas */}
          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="font-semibold mb-1">Personas</label>
            <div className="flex items-center border border-gray-400 rounded-xl px-3 py-2 bg-white">
              <input
                type="text"
                value={personas}
                onChange={(e) => setPersonas(e.target.value)}
                className="flex-1 outline-none bg-transparent"
              />
              <Users size={18} className="ml-2 text-gray-700" />
            </div>
          </div>

          {/* Botón filtrar */}
          <div className="flex items-end">
            <button
              onClick={handleFiltrar}
              className="bg-black text-white font-medium px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Filtrar
            </button>
          </div>
        </div>

        {/* Resultados */}
        {resultados.length === 0 ? (
          <p className="text-gray-700 text-lg">No hay habitaciones disponibles para esas fechas y personas.</p>
        ) : (
          resultados.map((hab) => (
            <div
              key={hab.id}
              className="bg-[#ffffffd4] backdrop-blur-sm rounded-3xl p-6 max-w-5xl w-full shadow-lg flex flex-col md:flex-row gap-6 mb-5"
            >
              <div className="md:w-1/2">
                <Image
                  src={hab.imagen}
                  alt={hab.nombre}
                  className="rounded-2xl w-full object-cover"
                  width={500}
                  height={300}
                />
              </div>
              <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{hab.nombre}</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">{hab.descripcion}</p>
                </div>
                <button className="bg-black text-white px-5 py-2 rounded-lg mt-4 self-start hover:bg-gray-800">
                  Ver tarifa
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
