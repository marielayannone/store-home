// Simulación de autenticación - En una implementación real, esto se conectaría con Supabase o tu backend

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "buyer" | "seller" | "admin"
  dni?: string
  status: "active" | "blocked"
  verificationStatus: "verified" | "pending" | "not_required"
}

interface SignUpData {
  firstName: string
  lastName: string
  email: string
  password: string
  dni?: string
  role?: "buyer" | "seller" | "admin"
}

// Simulación de base de datos de usuarios
const users: User[] = [
  {
    id: "1",
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan@example.com",
    role: "buyer",
    dni: "12345678",
    status: "active",
    verificationStatus: "verified",
  },
  {
    id: "2",
    firstName: "María",
    lastName: "González",
    email: "maria@example.com",
    role: "seller",
    dni: "23456789",
    status: "active",
    verificationStatus: "verified",
  },
  {
    id: "3",
    firstName: "Admin",
    lastName: "Sistema",
    email: "admin@example.com",
    role: "admin",
    dni: "00000000",
    status: "active",
    verificationStatus: "not_required",
  },
]

// Usuario actual (simulación de sesión)
let currentUser: User | null = null

// Función para iniciar sesión
export async function signIn(email: string, password: string): Promise<User> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Buscar usuario por email (en una implementación real, verificaríamos la contraseña con hash)
  const user = users.find((u) => u.email === email)

  if (!user) {
    throw new Error("Usuario no encontrado")
  }

  // Verificar si el usuario está bloqueado
  if (user.status === "blocked") {
    throw new Error("Usuario bloqueado. Contacta al administrador.")
  }

  // Establecer usuario actual
  currentUser = user

  // Guardar en localStorage para persistencia (en una implementación real, usaríamos cookies o JWT)
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  return user
}

// Función para registrarse
export async function signUp(data: SignUpData): Promise<User> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Verificar si el email ya existe
  if (users.some((u) => u.email === data.email)) {
    throw new Error("El email ya está registrado")
  }

  // Verificar si el DNI ya existe
  if (data.dni && users.some((u) => u.dni === data.dni)) {
    throw new Error("El DNI ya está registrado")
  }

  // Crear nuevo usuario
  const newUser: User = {
    id: String(users.length + 1),
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role || "buyer",
    dni: data.dni,
    status: "active",
    verificationStatus: data.role === "admin" ? "not_required" : "pending",
  }

  // Agregar a la "base de datos"
  users.push(newUser)

  return newUser
}

// Función para cerrar sesión
export async function signOut(): Promise<void> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Limpiar usuario actual
  currentUser = null

  // Limpiar localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}

// Función para obtener el usuario actual
export function getCurrentUser(): User | null {
  // Si ya tenemos el usuario en memoria, devolverlo
  if (currentUser) {
    return currentUser
  }

  // Intentar obtener del localStorage
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      currentUser = JSON.parse(storedUser)
      return currentUser
    }
  }

  return null
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

// Función para verificar si el usuario es vendedor
export function isSeller(): boolean {
  const user = getCurrentUser()
  return user !== null && user.role === "seller"
}

// Función para verificar si el usuario es administrador
export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user !== null && user.role === "admin"
}

// Función para verificar si el usuario está bloqueado
export function isBlocked(): boolean {
  const user = getCurrentUser()
  return user !== null && user.status === "blocked"
}

// Función para bloquear a un usuario (solo para administradores)
export async function blockUser(userId: string): Promise<void> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Verificar si el usuario actual es administrador
  if (!isAdmin()) {
    throw new Error("No tienes permisos para realizar esta acción")
  }

  // Buscar usuario por ID
  const userIndex = users.findIndex((u) => u.id === userId)
  if (userIndex === -1) {
    throw new Error("Usuario no encontrado")
  }

  // Bloquear usuario
  users[userIndex].status = "blocked"
}

// Función para desbloquear a un usuario (solo para administradores)
export async function unblockUser(userId: string): Promise<void> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Verificar si el usuario actual es administrador
  if (!isAdmin()) {
    throw new Error("No tienes permisos para realizar esta acción")
  }

  // Buscar usuario por ID
  const userIndex = users.findIndex((u) => u.id === userId)
  if (userIndex === -1) {
    throw new Error("Usuario no encontrado")
  }

  // Desbloquear usuario
  users[userIndex].status = "active"
}

// Función para verificar la identidad d
