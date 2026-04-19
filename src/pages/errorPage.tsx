import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
      <p className="text-sm font-medium text-zinc-500">404</p>
      <h1 className="mt-2 text-xl font-bold text-zinc-900">找不到頁面</h1>
      <p className="mt-2 text-sm text-zinc-600">
        網址可能打錯或頁面已移動。請從下方返回常用頁面。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Button variant="default" asChild>
          <Link to="/login">前往登入頁面</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/posts">貼文列表</Link>
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
