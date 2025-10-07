"use client";

import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";

const API_URL = "http://localhost:8080"; // ajusta si tu backend usa otro puerto

export default function AdminUsers() {
  const [modo, setModo] = useState("ver"); // "ver", "agregar", "editar", "eliminar"
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    contrasenna: "",
    rol: "user",
  });

  // --- Cargar usuarios desde el backend ---
  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al cargar usuarios");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error(err);
      alert("Error al obtener los usuarios");
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // --- Registrar usuario
  const registrarUsuario = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error al registrar usuario");
      alert("Usuario registrado correctamente");
      setFormData({ id: "", email: "", contrasenna: "", rol: "user" });
      obtenerUsuarios();
    } catch (err) {
      console.error(err);
      alert("Error al registrar usuario");
    }
  };

  // --- Editar usuario ---
  const editarUsuario = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error al editar usuario");
      alert("Usuario actualizado correctamente");
      setFormData({ id: "", email: "", contrasenna: "", rol: "user" });
      obtenerUsuarios();
    } catch (err) {
      console.error(err);
      alert("Error al editar usuario");
    }
  };

  // --- Eliminar usuario ---
  const eliminarUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      alert("Usuario eliminado correctamente");
      obtenerUsuarios();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar usuario");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#d9d9d9] text-[#222]">
      {/* Barra lateral */}
      <aside className="w-16 bg-[#e5e5e5] flex flex-col items-center py-8 mt-42 gap-6 shadow-md">
        <button
          className={`p-2 rounded-full hover:bg-[#cfcfcf] transition ${
            modo === "agregar" ? "bg-blue-200" : ""
          }`}
          onClick={() => setModo("agregar")}
        >
          <Plus size={24} />
        </button>
        <button
          className={`p-2 rounded-full hover:bg-[#cfcfcf] transition ${
            modo === "editar" ? "bg-blue-200" : ""
          }`}
          onClick={() => setModo("editar")}
        >
          <Edit3 size={20} />
        </button>
        <button
          className={`p-2 rounded-full hover:bg-[#cfcfcf] transition ${
            modo === "eliminar" ? "bg-blue-200" : ""
          }`}
          onClick={() => setModo("eliminar")}
        >
          <Trash2 size={22} />
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 mt-42">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold tracking-wide">
            Gestión de Usuarios
          </h1>
        </header>

        {/* Tabla de usuarios */}
        <div className="bg-[#e5e5e5] rounded-2xl overflow-hidden shadow">
          <div className="grid grid-cols-4 text-center font-semibold border border-black rounded-t-2xl">
            <div className="py-2 border-r border-black">Email</div>
            <div className="py-2 border-r border-black">Rol</div>
            <div className="py-2 border-r border-black">ID</div>
            <div className="py-2">Acciones</div>
          </div>

          <div className="flex flex-col gap-3 p-4">
            {usuarios.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-4 text-center items-center bg-[#cfcfcf] py-3 rounded-xl hover:bg-[#bfbfbf] transition"
              >
                <div>{user.email}</div>
                <div>{user.rol}</div>
                <div>{user.id}</div>
                <div>
                  {modo === "editar" && (
                    <button
                      onClick={() => setFormData(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>
                  )}
                  {modo === "eliminar" && (
                    <button
                      onClick={() => eliminarUsuario(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario dinámico */}
        {modo === "agregar" || modo === "editar" ? (
          <div className="mt-6 bg-[#e5e5e5] p-4 rounded-2xl shadow-md">
            <h2 className="text-xl font-medium mb-3">
              {modo === "agregar" ? "Agregar nuevo usuario" : "Editar usuario"}
            </h2>
            <form
              className="grid grid-cols-2 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (modo === "agregar") registrarUsuario();
                else editarUsuario();
              }}
            >
              <input
                type="email"
                placeholder="Correo electrónico"
                className="p-2 rounded-lg"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="p-2 rounded-lg"
                value={formData.contrasenna}
                onChange={(e) =>
                  setFormData({ ...formData, contrasenna: e.target.value })
                }
                required={modo === "agregar"}
              />
              <select
                className="p-2 rounded-lg"
                value={formData.rol}
                onChange={(e) =>
                  setFormData({ ...formData, rol: e.target.value })
                }
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>

              <button
                type="submit"
                className="col-span-2 bg-[#121C2B] text-white p-2 rounded-lg hover:bg-[#1a2b45]"
              >
                {modo === "agregar" ? "Agregar usuario" : "Guardar cambios"}
              </button>
            </form>
          </div>
        ) : null}
      </main>
    </div>
  );
}
