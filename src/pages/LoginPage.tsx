import React from "react";
import { HouseTitleIcon } from "@/assets/icons";
import bgLogin from "../assets/images/bg-login.jpg";
import { Input, Button } from "@/components/ui";

const LoginPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* 全螢幕背景圖 */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgLogin})` }}
        aria-hidden
      />
      {/* 登入區：貼上緣，置中後再往右偏移 50px */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-start px-4 py-10 sm:px-6 sm:pt-14 md:pt-20">
        <div className="w-full max-w-md translate-x-[270px] rounded-2xl border border-white/50 bg-white/90 p-8 shadow-2xl backdrop-blur-md sm:p-10">
          <div className="flex justify-center">
            <div className="w-full max-w-[min(100%,280px)]">
              <HouseTitleIcon className="h-auto w-full object-contain" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <form className="mt-8 space-y-5">
              {/* 電子郵件 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  名稱
                </label>
                <Input type="text" placeholder="請輸入使用者名稱" />
              </div>

              {/* 密碼 */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-medium text-slate-700">
                    密碼
                  </label>
                </div>
                <Input type="password" placeholder="請輸入密碼" />
              </div>

              {/* 登入按鈕 */}
              <Button variant="default" className="w-full">
                登入
              </Button>
            </form>
            {/* 註冊連結 */}
            <p className="mt-8 text-center text-sm text-slate-500">
              還沒有帳號嗎？
              <a
                href="#"
                className="text-indigo-600 font-bold hover:underline ml-1"
              >
                免費註冊
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
