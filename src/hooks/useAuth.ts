// auth.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const LOGIN_PATH = "/api/v1/login";
const REGISTER_PATH = "/api/v1/register";

interface LoginInputData {
  username: string;
  password: string;
}

interface RegisterInputData {
  username: string;
  password: string;
  email: string;
}

export async function login(input: LoginInputData) {
  const res = await fetch(`${API_BASE}${LOGIN_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok || data.message !== "success") {
    // 如果失敗，直接拋出錯誤訊息
    throw new Error(data.detail || data.message || "登入失敗");
  }

  // 成功則存入 localStorage 並回傳
  localStorage.setItem("access_token", data.access_token);
  return data;
}

export async function register(input: RegisterInputData) {
  const res = await fetch(`${API_BASE}${REGISTER_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok || data.message !== "success") {
    // 如果失敗，直接拋出錯誤訊息
    throw new Error(data.detail || data.message || "註冊失敗");
  }

  return data;
}
