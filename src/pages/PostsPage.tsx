import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Button } from "@/components/ui";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyPosts, type MyPost } from "@/hooks/usePosts";

const postListItemClass =
  "card-surface block p-5 sm:p-6 no-underline transition-[box-shadow,border-color,background-color] duration-200 hover:bg-zinc-50 hover:shadow-lg hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2";

function PostsPage() {
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const done = () => {
      if (!cancelled) setLoading(false);
    };
    if (access_token) {
      getMyPosts(access_token)
        .then((data) =>
          setPosts(Array.isArray(data) ? (data as MyPost[]) : []),
        )
        .catch(() => setPosts([]))
        .finally(done);
    } else {
      setPosts([]);
      done();
    }
    return () => {
      cancelled = true;
    };
  }, [access_token]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">
            貼文
          </h1>
          {!loading && posts.length > 0 ? (
            <p className="mt-1 text-xs text-zinc-600 sm:mt-1.5 sm:text-sm">
              歡迎使用，{posts[0].author.username}
            </p>
          ) : null}
        </div>
        {loading ? (
          <Button
            type="button"
            variant="default"
            size="sm"
            className="w-full sm:w-auto"
            disabled
          >
            新增貼文
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="w-full sm:w-auto"
            asChild
          >
            <Link to="/posts/add">新增貼文</Link>
          </Button>
        )}
      </div>

      {loading ? <LoadingIndicator className="mt-2" /> : null}

      {!loading && posts.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-600">目前尚無貼文。</p>
      ) : null}

      {!loading && posts.length > 0 ? (
        <ul className="mt-6 list-none space-y-4 p-0">
          {posts.map((post) => (
            <li key={post.id}>
              {/* state：把整筆 post 傳給下一頁，編輯頁可先顯示再向 API 確認 */}
              <Link
                to={`/posts/${post.id}/edit`}
                state={{ post }}
                className={postListItemClass}
                aria-label={`編輯：${post.title}`}
              >
                <article>
                  <h2 className="line-clamp-2 break-words text-base font-bold text-zinc-900 sm:text-lg">
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

export default PostsPage;
