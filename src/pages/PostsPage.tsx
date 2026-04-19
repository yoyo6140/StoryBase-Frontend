import { SAMPLE_POSTS } from "@/data/samplePosts";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const postListItemClass =
  "card-surface block p-5 sm:p-6 no-underline transition-[box-shadow,border-color,transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-lg hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2";

function PostsPage() {
  const { postId } = useParams();

  if (postId) {
    const post = SAMPLE_POSTS.find((p) => p.id === postId);

    if (!post) {
      return (
        <div className="mx-auto w-full max-w-2xl">
          <p className="text-sm text-zinc-600">找不到這則貼文。</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/posts">返回貼文列表</Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <Button variant="ghost" size="sm" className="-ml-2 gap-1" asChild>
            <Link to="/posts">
              <ArrowLeft className="size-4" aria-hidden />
              返回列表
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/posts/${postId}/edit`}>編輯</Link>
          </Button>
        </div>

        <article className="card-surface p-5 sm:p-8">
          <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
            {post.content}
          </p>
        </article>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="text-xl font-bold text-zinc-900">貼文</h1>
      <p className="mt-1 text-sm text-zinc-500">
        點選卡片可開啟全文。以下為示意資料。
      </p>

      <ul className="mt-6 list-none space-y-4 p-0">
        {SAMPLE_POSTS.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`} className={postListItemClass}>
              <article>
                <h2 className="text-lg font-bold text-zinc-900">{post.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                  {post.content}
                </p>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsPage;
