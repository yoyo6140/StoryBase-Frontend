import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addPost } from "@/hooks/usePosts";

const textareaClass =
  "min-h-[200px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:border-zinc-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

function PostAddPage() {
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    addPost(access_token, { title, content })
      .then(() => {
        navigate("/posts");
        alert("新增貼文成功");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Button variant="ghost" size="sm" className="-ml-2 mb-4 gap-1" asChild>
        <Link to="/posts">
          <ArrowLeft className="size-4" aria-hidden />
          返回貼文列表
        </Link>
      </Button>

      <div className="card-surface p-5 sm:p-8">
        <h1 className="text-xl font-bold text-zinc-900">新增貼文</h1>
        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="add-post-title"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              標題
            </label>
            <Input
              id="add-post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={1}
              maxLength={100}
              placeholder="貼文標題"
            />
          </div>
          <div>
            <label
              htmlFor="add-post-content"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              內容
            </label>
            <textarea
              id="add-post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              minLength={1}
              maxLength={1000}
              placeholder="貼文內容"
              className={cn(textareaClass)}
            />
          </div>
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" asChild>
              <Link to="/posts">取消</Link>
            </Button>
            <Button type="submit" variant="default">
              發布
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostAddPage;
