import { Button } from "@/components/ui";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyPosts, type MyPost } from "@/hooks/usePosts";

const postListItemClass =
  "card-surface block p-5 sm:p-6 no-underline transition-[box-shadow,border-color,background-color] duration-200 hover:bg-zinc-50 hover:shadow-lg hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2";

function PostsPage() {
  const [posts, setPosts] = useState<MyPost[]>([]);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    if (access_token) {
      getMyPosts(access_token).then((data) => {
        setPosts(data as MyPost[]);
      });
    } else {
      setPosts([]);
    }
  }, [access_token]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">貼文</h1>
          <p className="mt-1 text-sm text-zinc-500">資料來自後端 API。</p>
        </div>
        <Button variant="default" size="sm" asChild>
          <Link to="/posts/new">新增貼文</Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-600">目前尚無貼文。</p>
      ) : (
        <ul className="mt-6 list-none space-y-4 p-0">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/posts/${post.id}/edit`}
                className={postListItemClass}
                aria-label={`編輯：${post.title}`}
              >
                <article>
                  <h2 className="text-lg font-bold text-zinc-900">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-500">
                    {post.author.username}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                    {post.content}
                  </p>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostsPage;
