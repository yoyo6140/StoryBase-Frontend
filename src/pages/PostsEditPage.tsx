import { Button, Input } from "@/components/ui";
import { deletePost, getMyPosts, updatePost, type MyPost } from "@/hooks/usePosts";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const textareaClass =
  "min-h-[140px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:border-zinc-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

function PostsEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const post = (location.state as { post?: MyPost } | null)?.post;

  const access_token = localStorage.getItem("access_token");

  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [baselineTitle, setBaselineTitle] = useState(post?.title ?? "");
  const [baselineContent, setBaselineContent] = useState(post?.content ?? "");

  const [isEditing, setIsEditing] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!postId) return;
    const id = Number(postId);
    if (!Number.isInteger(id) || id < 0) {
      setLoadError("文章 id 不正確");
      return;
    }

    if (post && post.id === id) {
      setTitle(post.title);
      setContent(post.content);
      setBaselineTitle(post.title);
      setBaselineContent(post.content);
      setLoadError("");
      return;
    }

    if (!access_token) {
      setLoadError("請先登入");
      return;
    }

    let cancelled = false;
    setLoadError("");
    getMyPosts(access_token)
      .then((data) => {
        if (cancelled) return;
        const list = data as MyPost[];
        const item = list.find((p) => p.id === id);
        if (item) {
          setTitle(item.title);
          setContent(item.content);
          setBaselineTitle(item.title);
          setBaselineContent(item.content);
        } else {
          setLoadError("找不到這則貼文。");
        }
      })
      .catch(() => {
        if (!cancelled) setLoadError("無法載入文章");
      });

    return () => {
      cancelled = true;
    };
  }, [postId, post, access_token]);

  const exitEditMode = () => {
    setTitle(baselineTitle);
    setContent(baselineContent);
    setSubmitError("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    setSubmitError("");

    if (!access_token) {
      setSubmitError("請先登入");
      return;
    }

    if (!postId) return;
    const id = Number(postId);
    if (!Number.isInteger(id) || id < 0) {
      setSubmitError("文章 id 不正確");
      return;
    }

    setSubmitting(true);
    try {
      await updatePost(access_token, id, { title, content });
      setBaselineTitle(title);
      setBaselineContent(content);
      setIsEditing(false);
      navigate("/posts", { replace: true });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "儲存失敗");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleteError("");

    if (!access_token) {
      setDeleteError("請先登入");
      return;
    }

    if (!postId) return;
    const id = Number(postId);
    if (!Number.isInteger(id) || id < 0) {
      setDeleteError("文章 id 不正確");
      return;
    }

    if (!window.confirm("確定要刪除此貼文嗎？此動作無法復原。")) return;

    setDeleting(true);
    try {
      await deletePost(access_token, id);
      navigate("/posts", { replace: true });
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "刪除失敗");
    } finally {
      setDeleting(false);
    }
  };

  if (!postId) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-sm text-zinc-600">缺少文章 id。</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/posts">返回貼文列表</Link>
        </Button>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <Button variant="ghost" size="sm" className="-ml-2 mb-4 gap-1" asChild>
          <Link to="/posts">
            <ArrowLeft className="size-4" aria-hidden />
            返回貼文列表
          </Link>
        </Button>
        <p className="text-sm text-zinc-600">{loadError}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1" asChild>
          <Link to="/posts">
            <ArrowLeft className="size-4" aria-hidden />
            返回文章
          </Link>
        </Button>
      </div>

      <div className="card-surface p-5 sm:p-8">
        {isEditing ? (
          <>
            <h1 className="text-xl font-bold text-zinc-900">編輯貼文</h1>
            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                void handleSave();
              }}
            >
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
                  minLength={1}
                  maxLength={100}
                  placeholder="貼文標題"
                  disabled={submitting}
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
                  minLength={1}
                  maxLength={1000}
                  placeholder="貼文內容"
                  disabled={submitting}
                  className={cn(textareaClass)}
                />
              </div>

              {submitError ? (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              ) : null}

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={exitEditMode}
                  disabled={submitting}
                >
                  取消
                </Button>
                <Button type="submit" variant="default" disabled={submitting}>
                  {submitting ? "儲存中…" : "儲存"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <article className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-medium text-zinc-500">標題</h2>
              <p className="mt-1 text-xl font-bold text-zinc-900 sm:text-2xl">
                {title}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-zinc-500">內容</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600 sm:text-base">
                {content}
              </p>
            </div>
          </article>
        )}
      </div>
      {!isEditing ? (
        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setDeleteError("");
                setIsEditing(true);
              }}
              disabled={deleting}
            >
              編輯
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              onClick={() => void handleDelete()}
              disabled={deleting}
            >
              {deleting ? "刪除中…" : "刪除"}
            </Button>
          </div>
          {deleteError ? (
            <p className="text-right text-sm text-red-600" role="alert">
              {deleteError}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default PostsEditPage;
