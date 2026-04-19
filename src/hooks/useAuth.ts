// auth.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL;

interface LoginInputData {
  username: string;
  password: string;
}

export async function login(input: LoginInputData) {
  const res = await fetch(`${API_BASE}/api/v1/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok || data.message !== "success") {
    // 如果失敗，直接拋出錯誤訊息
    throw new Error(data.detail || data.message || "登入失敗");
  }

  // 成功則存入 session 並回傳
  sessionStorage.setItem("auth_token", data.access_token);
  return data;
}
