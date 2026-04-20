import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-2 text-center sm:px-0">
      <p className="text-xs font-medium text-zinc-500 sm:text-sm">404</p>
      <h1 className="mt-2 text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">
        找不到頁面
      </h1>
      <p className="mt-2 text-xs leading-relaxed text-zinc-600 sm:text-sm">
        網址可能打錯或頁面已移動。請從下方返回常用頁面。
      </p>
      <div className="mt-8 flex w-full max-w-sm flex-col gap-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
        <Button variant="default" className="w-full sm:w-auto" asChild>
          <Link to="/login">前往登入頁面</Link>
        </Button>
        <Button variant="outline" className="w-full sm:w-auto" asChild>
          <Link to="/posts">貼文列表</Link>
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
