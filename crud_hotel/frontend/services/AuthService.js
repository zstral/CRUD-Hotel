export async function loginUser(email, password) {
  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contrasenna: password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");

  return res.text();
}

export async function registerUser(user) {
  const res = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Error al registrar usuario");

  return res.json();
}
