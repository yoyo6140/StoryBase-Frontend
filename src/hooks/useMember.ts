const API_BASE = import.meta.env.VITE_API_BASE_URL;
const MEMBER_PATH = "/api/v1/me";

interface MemberInputData {
  access_token: string;
}

export async function getMember(input: MemberInputData) {
  try {
    const res = await fetch(`${API_BASE}${MEMBER_PATH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.access_token}`,
      },
    });
    const data = await res.json();
    if (!res.ok || data.message !== "success") {
      throw new Error(data.detail || data.message || "Failed to fetch member");
    }
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
