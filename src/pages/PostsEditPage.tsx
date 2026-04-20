import { Button, Input } from "@/components/ui";
import { SAMPLE_POSTS } from "@/data/samplePosts";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const textareaClass =
  "min-h-[140px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:border-zinc-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

function PostsEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = postId ? SAMPLE_POSTS.find((p) => p.id === postId) : undefined;

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");

  useEffect(() => {
    const p = postId ? SAMPLE_POSTS.find((x) => x.id === postId) : undefined;
    if (p) {
      setTitle(p.title);
      setContent(p.content);
    }
  }, [postId]);

  if (!postId || !post) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-sm text-zinc-600">找不到要編輯的貼文。</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/posts">返回貼文列表</Link>
        </Button>
      </div>
    );
  }

  const exitEditMode = () => {
    setTitle(post.title);
    setContent(post.content);
    setIsEditing(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/posts", { replace: true });
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1" asChild>
          <Link to="/posts">
            <ArrowLeft className="size-4" aria-hidden />
            返回文章
          </Link>
        </Button>
        {!isEditing ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            編輯
          </Button>
        ) : null}
      </div>

      <div className="card-surface p-5 sm:p-8">
        {isEditing ? (
          <>
            <h1 className="text-xl font-bold text-zinc-900">編輯貼文</h1>
            <p className="mt-1 text-sm text-zinc-500">
              修改標題與內容（以下送出為前端示意，未寫入後端）。
            </p>

            <form className="mt-6 space-y-5" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="edit-post-title"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  標題
                </label>
                <Input
                  id="edit-post-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="貼文標題"
                />
              </div>
              <div>
                <label
                  htmlFor="edit-post-content"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  內容
                </label>
                <textarea
                  id="edit-post-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="貼文內容"
                  className={cn(textareaClass)}
                />
              </div>
              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={exitEditMode}>
                  取消
                </Button>
                <Button type="submit" variant="default">
                  儲存
                </Button>
              </div>
            </form>
          </>
        ) : (
          <article className="flex flex-col gap-4">
            <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">
              標題
            </h1>
            <div className=" text-zinc-900 sm:text-2xl">{title}</div>
            <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">
              內容
            </h1>
            <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600 sm:text-base">
              {content}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

export default PostsEditPage;
