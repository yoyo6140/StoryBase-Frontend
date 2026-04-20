const API_BASE = import.meta.env.VITE_API_BASE_URL;
const POSTS_PATH = "/api/v1/posts";
const MY_POSTS_PATH = "/api/v1/posts/me";

export interface MyPost {
  id: number;
  title: string;
  content: string;
  author: {
    username: string;
  };
}

/** 目前使用者的文章（需 Bearer access_token） */
export async function getMyPosts(access_token: string) {
  try {
    const res = await fetch(`${API_BASE}${MY_POSTS_PATH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data: unknown = await res.json();

    if (!res.ok) {
      throw new Error("文章列表格式異常");
    }

    return data;
  } catch (error) {
    throw new Error("文章列表格式異常");
  }
}
