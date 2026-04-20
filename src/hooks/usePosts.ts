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

/** 新增／修改文章時的 body（與後端 PostCreate 一致） */
export interface PostAdd {
  title: string;
  content: string;
}

/** 全部貼文（GET /api/v1/posts，公開列表） */
export async function getPosts() {
  try {
    const res = await fetch(`${API_BASE}${POSTS_PATH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: unknown = await res.json();

    if (!res.ok) {
      throw new Error("無法取得貼文列表");
    }

    return data;
  } catch {
    throw new Error("無法取得貼文列表");
  }
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

/** 目前使用者的文章（需 Bearer access_token） */
export async function addPost(access_token: string, post: PostAdd) {
  try {
    const res = await fetch(`${API_BASE}${POSTS_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(post),
    });

    const data: unknown = await res.json();

    if (!res.ok) {
      throw new Error("新增文章失敗");
    }

    return data;
  } catch (error) {
    throw new Error("新增文章失敗");
  }
}

//另外型別確認的寫法  可以不用先interface 直接寫型別

/** 修改文章（PUT /api/v1/posts/{id}，需 Bearer access_token） */
export async function updatePost(
  access_token: string,
  id: number,
  post: PostAdd,
): Promise<unknown> {
  const res = await fetch(`${API_BASE}${POSTS_PATH}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      title: post.title.trim(),
      content: post.content.trim(),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

/** 刪除文章（DELETE /api/v1/posts/{id}，需 Bearer access_token） */
export async function deletePost(
  access_token: string,
  id: number,
): Promise<void> {
  const res = await fetch(`${API_BASE}${POSTS_PATH}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    let message = "刪除失敗";
    if (text) {
      try {
        const data = JSON.parse(text) as { message?: string };
        if (typeof data?.message === "string") message = data.message;
      } catch {
        /* ignore */
      }
    }
    throw new Error(message);
  }
}
