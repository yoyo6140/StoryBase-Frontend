import { HouseTitleIcon } from "@/assets/icons";
import bgLogin from "../assets/images/bg-login.jpg";
import { Input, Button } from "@/components/ui";
import { login } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError("請輸入使用者名稱和密碼");
      return;
    }
    if (username.length < 3) {
      setError("使用者名稱長度至少為3位");
      return;
    }
    if (password.length < 6) {
      setError("密碼長度至少為6位");
      return;
    }

    try {
      await login({ username, password });
      navigate("/member");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgLogin})` }}
        aria-hidden
      />
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 sm:px-6 sm:py-10 sm:pt-12">
        <div className="w-full max-w-md translate-x-0 rounded-2xl border border-white/50 bg-white/90 p-6 shadow-2xl backdrop-blur-md sm:translate-x-8 sm:p-8 md:translate-x-16 md:p-10 lg:translate-x-[min(16vw,200px)]">
          <div className="flex justify-center">
            <div className="w-full max-w-[min(100%,280px)]">
              <HouseTitleIcon className="h-auto w-full object-contain" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  名稱
                </label>
                <Input
                  type="text"
                  name="username"
                  autoComplete="username"
                  required
                  placeholder="請輸入使用者名稱"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <label className="block text-sm font-medium text-slate-700">
                    密碼
                  </label>
                </div>
                <Input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="請輸入密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" variant="default" className="w-full">
                送出
              </Button>
              {error ? (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
            <p className="mt-8 text-center text-sm text-slate-500">
              還沒有帳號嗎？
              <Link
                to="/register"
                className="ml-1 font-bold text-indigo-600 hover:underline"
              >
                免費註冊
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
