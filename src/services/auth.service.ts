const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type UserProfile = {
  name: string;
  email: string;
  role: string;
};

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Invalid email or password");
  }

  return res.json();
}

export async function registerUser(
  data: RegisterRequest
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}

export function saveToken(token: string) {
  localStorage.setItem("shopnext_token", token);
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("shopnext_token");
}

export function logoutUser() {
  localStorage.removeItem("shopnext_token");
}

export async function getProfile(): Promise<UserProfile> {
  const token = getToken();

  const res = await fetch(`${API_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}