import { LoadingIndicator } from "@/components/LoadingIndicator";
import { getPosts, type MyPost } from "@/hooks/usePosts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const postListItemClass =
  "card-surface block p-5 sm:p-6 no-underline transition-[box-shadow,border-color,background-color] duration-200 hover:bg-zinc-50 hover:shadow-lg hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2";

function HomePage() {
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoadError("");
    setLoading(true);
    getPosts()
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data)) {
          setPosts(data as MyPost[]);
        } else {
          setPosts([]);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPosts([]);
          setLoadError("無法載入貼文列表");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">
        首頁
      </h1>
      <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 sm:mt-2 sm:text-sm">
        所有使用者的公開貼文。
      </p>

      {loading ? <LoadingIndicator className="mt-2" /> : null}

      {!loading && loadError ? (
        <p className="mt-6 text-sm text-red-600" role="alert">
          {loadError}
        </p>
      ) : null}

      {!loading && !loadError && posts.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-600">目前尚無貼文。</p>
      ) : null}

      {!loading && posts.length > 0 ? (
        <ul className="mt-6 list-none space-y-4 p-0">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/homepage/${post.id}`}
                state={{ post }}
                className={postListItemClass}
                aria-label={`檢視貼文：${post.title}`}
              >
                <article>
                  <p className="text-xs font-medium text-zinc-500">
                    作者：{post.author?.username ?? "—"}
                  </p>
                  <h2 className="mt-2 line-clamp-2 break-words text-base font-bold text-zinc-900 sm:text-lg">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 break-words text-sm leading-relaxed text-zinc-600">
                    {post.content}
                  </p>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default HomePage;
