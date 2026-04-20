import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Button } from "@/components/ui";
import { getPosts, type MyPost } from "@/hooks/usePosts";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function HomeInfoPage() {
  const { postId } = useParams();
  const location = useLocation();
  const statePost = (location.state as { post?: MyPost } | null)?.post;

  const [post, setPost] = useState<MyPost | null>(
    statePost && postId && statePost.id === Number(postId) ? statePost : null,
  );
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(!post);

  useEffect(() => {
    if (!postId) return;
    const id = Number(postId);
    if (!Number.isInteger(id) || id < 0) {
      setLoadError("文章 id 不正確");
      setLoading(false);
      return;
    }

    if (statePost && statePost.id === id) {
      setPost(statePost);
      setLoadError("");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoadError("");
    setLoading(true);
    getPosts()
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? (data as MyPost[]) : [];
        const item = list.find((p) => p.id === id);
        if (item) {
          setPost(item);
        } else {
          setLoadError("找不到這則貼文。");
          setPost(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError("無法載入文章");
          setPost(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [postId, statePost]);

  if (!postId) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-sm text-zinc-600">缺少文章 id。</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/homepage">返回首頁</Link>
        </Button>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <Button variant="ghost" size="sm" className="-ml-2 mb-4 gap-1" asChild>
          <Link to="/homepage">
            <ArrowLeft className="size-4" aria-hidden />
            返回首頁
          </Link>
        </Button>
        <p className="text-sm text-zinc-600">{loadError}</p>
      </div>
    );
  }

  if (loading || !post) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <Button variant="ghost" size="sm" className="-ml-2 mb-2 gap-1" asChild>
          <Link to="/homepage">
            <ArrowLeft className="size-4" aria-hidden />
            返回
          </Link>
        </Button>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-4">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1" asChild>
          <Link to="/homepage">
            <ArrowLeft className="size-4" aria-hidden />
            返回首頁
          </Link>
        </Button>
      </div>

      <article className="card-surface p-5 sm:p-8">
        <p className="text-xs font-medium text-zinc-500 sm:text-sm">
          作者：{post.author?.username ?? "—"}
        </p>
        <h1 className="mt-2 break-words text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">
          {post.title}
        </h1>
        <div className="mt-6 border-t border-zinc-100 pt-6">
          <h2 className="text-sm font-medium text-zinc-500">內容</h2>
          <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-zinc-700 sm:text-base">
            {post.content}
          </p>
        </div>
      </article>
    </div>
  );
}

export default HomeInfoPage;
