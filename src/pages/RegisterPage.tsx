import { HouseTitleIcon } from "@/assets/icons";
import bgLogin from "../assets/images/bg-login.jpg";
import { Input, Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { type FormEvent, useState } from "react";

function RegisterPage() {
  // 註冊 API 暫停（useAuth 僅接 /api/v1/login）
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="relative min-h-screen w-full">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgLogin})` }}
        aria-hidden
      />
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-start px-4 py-10 sm:px-6 sm:pt-14 md:pt-20">
        <div className="w-full max-w-md translate-x-[270px] rounded-2xl border border-white/50 bg-white/90 p-8 shadow-2xl backdrop-blur-md sm:p-10">
          <div className="flex justify-center">
            <div className="w-full max-w-[min(100%,280px)]">
              <HouseTitleIcon className="h-auto w-full object-contain" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <form
              className="mt-8 space-y-5"
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                // 註冊：待接 /api/v1/register 後再寫入 useAuth
              }}
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  使用者名稱
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
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  電子郵件（選填）
                </label>
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  密碼
                </label>
                <Input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  placeholder="至少 6 個字元"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" variant="default" className="w-full">
                註冊
              </Button>
            </form>
            <p className="mt-8 text-center text-sm text-slate-500">
              已有帳號？
              <Link
                to="/login"
                className="ml-1 font-bold text-indigo-600 hover:underline"
              >
                登入
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
