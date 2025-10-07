"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:8080/auth";

export default function useAuth() {
  const [email, setEmail] = useState("");
  const [contrasenna, setContrasenna] = useState("");
  const [rol, setRol] = useState("user");
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          contrasenna: contrasenna,
          rol: rol,
        }),
      });

      if (!response.ok) throw new Error("Credenciales incorrectas");

      const token = await response.text();
      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ email: payload.sub, rol: payload.rol });

      alert("Login exitoso!");
      router.push("/profile");
    } catch (err) {
      console.error(err);
      alert("Error en login: credenciales incorrectas o servidor no disponible");
    }
  };

  // Registro
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log({ email, contrasenna, rol });

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          contrasenna: contrasenna,
          rol: rol,
        }),
      });

      if (!response.ok) throw new Error("Error al registrar usuario");

      const newUser = await response.json();
      alert(`Usuario registrado correctamente: ${newUser.email}`);
    } catch (err) {
      console.error(err);
      alert("Error al registrar usuario");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/auth/login");
  };

  return {
    email,
    setEmail,
    contrasenna,
    setContrasenna,
    rol,
    setRol,
    user,
    handleLogin,
    handleRegister,
    handleLogout,
  };
}
