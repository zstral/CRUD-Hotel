"use client";

import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";

export default function AdminRooms() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [modo, setModo] = useState("ver"); // "ver" | "agregar" | "editar" | "eliminar"
  const [habitacionActual, setHabitacionActual] = useState({
    id: null,
    nombre: "",
    numero: "",
    categoria: "",
    tarifa: "",
    estado: "",
  });

  // Cargar desde localStorage
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("habitaciones")) || [
      { id: 1, nombre: "Zen Rest", numero: "101", categoria: "Deluxe", tarifa: "$85.000", estado: "Disponible" },
      { id: 2, nombre: "Ocean View", numero: "102", categoria: "Suite", tarifa: "$120.000", estado: "Ocupada" },
      { id: 3, nombre: "Garden Stay", numero: "103", categoria: "Estandar", tarifa: "$65.000", estado: "Mantenimiento" },
    ];
    setHabitaciones(guardadas);
  }, []);

  // Guardar en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
  }, [habitaciones]);

  const manejarCambio = (e) => {
    setHabitacionActual({ ...habitacionActual, [e.target.name]: e.target.value });
  };

  const guardarHabitacion = (e) => {
    e.preventDefault();

    if (modo === "editar") {
      setHabitaciones((prev) =>
        prev.map((h) => (h.id === habitacionActual.id ? habitacionActual : h))
      );
    } else if (modo === "agregar") {
      setHabitaciones((prev) => [
        ...prev,
        { ...habitacionActual, id: Date.now() },
      ]);
    }

    setHabitacionActual({
      id: null,
      nombre: "",
      numero: "",
      categoria: "",
      tarifa: "",
      estado: "",
    });
    setModo("ver");
  };

  const seleccionarHabitacion = (hab) => {
    if (modo === "editar") {
      setHabitacionActual(hab);
    } else if (modo === "eliminar") {
      if (confirm(`¿Eliminar la habitación "${hab.nombre}"?`)) {
        setHabitaciones(habitaciones.filter((h) => h.id !== hab.id));
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d9d9d9] text-[#222]">
      {/* Barra lateral */}
      <aside className="w-16 bg-[#e5e5e5] flex flex-col items-center py-8 mt-42 gap-6 shadow-md">
        <button
          className={`p-2 rounded-full transition ${
            modo === "agregar"
              ? "bg-green-600 text-white"
              : "hover:bg-[#cfcfcf]"
          }`}
          title="Agregar"
          onClick={() => {
            setModo("agregar");
            setHabitacionActual({
              id: null,
              nombre: "",
              numero: "",
              categoria: "",
              tarifa: "",
              estado: "",
            });
          }}
        >
          <Plus size={24} />
        </button>

        <button
          className={`p-2 rounded-full transition ${
            modo === "editar"
              ? "bg-blue-600 text-white"
              : "hover:bg-[#cfcfcf]"
          }`}
          title="Editar"
          onClick={() => setModo(modo === "editar" ? "ver" : "editar")}
        >
          <Edit3 size={22} />
        </button>

        <button
          className={`p-2 rounded-full transition ${
            modo === "eliminar"
              ? "bg-red-600 text-white"
              : "hover:bg-[#cfcfcf]"
          }`}
          title="Eliminar"
          onClick={() => setModo(modo === "eliminar" ? "ver" : "eliminar")}
        >
          <Trash2 size={22} />
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 mt-42">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold tracking-wide">
            Gestión de Habitaciones
          </h1>
          {modo !== "ver" && (
            <button
              onClick={() => setModo("ver")}
              className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
          )}
        </header>

        {/* Formulario */}
        {(modo === "agregar" || (modo === "editar" && habitacionActual.id)) && (
          <form
            onSubmit={guardarHabitacion}
            className="bg-[#e5e5e5] p-4 rounded-xl mb-6 shadow-md grid grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="nombre"
              value={habitacionActual.nombre}
              onChange={manejarCambio}
              placeholder="Nombre de la habitación"
              className="p-2 rounded-md border border-gray-400"
              required
            />
            <input
              type="text"
              name="numero"
              value={habitacionActual.numero}
              onChange={manejarCambio}
              placeholder="Número"
              className="p-2 rounded-md border border-gray-400"
              required
            />
            <input
              type="text"
              name="categoria"
              value={habitacionActual.categoria}
              onChange={manejarCambio}
              placeholder="Categoría"
              className="p-2 rounded-md border border-gray-400"
              required
            />
            <input
              type="text"
              name="tarifa"
              value={habitacionActual.tarifa}
              onChange={manejarCambio}
              placeholder="Tarifa"
              className="p-2 rounded-md border border-gray-400"
              required
            />
            <input
              type="text"
              name="estado"
              value={habitacionActual.estado}
              onChange={manejarCambio}
              placeholder="Estado"
              className="p-2 rounded-md border border-gray-400"
              required
            />

            <div className="col-span-2 flex justify-end gap-3">
              <button
                type="submit"
                className={`px-4 py-2 rounded-md text-white transition ${
                  modo === "agregar"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {modo === "agregar" ? "Agregar habitación" : "Guardar cambios"}
              </button>
            </div>
          </form>
        )}

        {/* Tabla */}
        <div className="bg-[#e5e5e5] rounded-2xl overflow-hidden shadow">
          <div className="grid grid-cols-5 text-center font-semibold border border-black rounded-t-2xl overflow-hidden">
            <div className="py-2 border-r border-black">Habitación</div>
            <div className="py-2 border-r border-black">N°</div>
            <div className="py-2 border-r border-black">Categoría</div>
            <div className="py-2 border-r border-black">Tarifa</div>
            <div className="py-2">Estado</div>
          </div>

          <div className="flex flex-col gap-3 p-4">
            {habitaciones.map((hab) => (
              <div
                key={hab.id}
                onClick={() => seleccionarHabitacion(hab)}
                className={`grid grid-cols-5 text-center items-center py-3 rounded-xl transition cursor-pointer
                  ${
                    modo === "editar" && hab.id === habitacionActual.id
                      ? "bg-yellow-300"
                      : modo === "eliminar"
                      ? "hover:bg-red-300"
                      : "bg-[#cfcfcf] hover:bg-[#bfbfbf]"
                  }`}
              >
                <div>{hab.nombre}</div>
                <div>{hab.numero}</div>
                <div>{hab.categoria}</div>
                <div>{hab.tarifa}</div>
                <div>{hab.estado}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
