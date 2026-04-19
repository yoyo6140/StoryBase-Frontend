import { Input, Button } from "@/components/ui";
import { useState } from "react";

/** 新／確認密碼欄位至少字元數（搭配 HTML minLength） */
const PASSWORD_MIN_LENGTH = 6;

function MemberPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [matchError, setMatchError] = useState("");

  const openPasswordEditor = () => {
    setMatchError("");
    setFormKey((k) => k + 1);
    setIsEditing(true);
  };

  const closePasswordEditor = () => {
    setMatchError("");
    setIsEditing(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="card-surface w-full p-6 sm:p-8">
        <header>
          <h1 className="text-xl font-bold text-zinc-900">會員資料</h1>
          <p className="mt-1 text-sm text-zinc-500">檢視並更新您的帳號資訊</p>
        </header>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="member-username"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              使用者名稱
            </label>
            <div id="member-username">王大明</div>
          </div>
          <div>
            <label
              htmlFor="member-email"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              電子郵件
            </label>
            <div id="member-email">wang@example.com</div>
          </div>
        </div>

        {!isEditing && (
          <div className="mt-6 flex items-center justify-end gap-2">
            <Button type="button" variant="outline" onClick={openPasswordEditor}>
              修改密碼
            </Button>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="card-surface w-full p-6 sm:p-8">
          <h2 className="text-lg font-bold text-zinc-900">變更密碼</h2>
          <p className="mt-1 text-sm text-zinc-500">
            請輸入舊密碼與新密碼以完成更新。
          </p>

          <form
            key={formKey}
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const newPwd = String(fd.get("newPassword") ?? "");
              const confirmPwd = String(fd.get("confirmPassword") ?? "");

              if (newPwd !== confirmPwd) {
                setMatchError("新密碼與確認新密碼須相同");
                return;
              }

              setMatchError("");
              // 通過後可一併用 fd.get("oldPassword")、newPwd 送 API
              closePasswordEditor();
            }}
          >
            <div>
              <label
                htmlFor="member-password-old"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                舊密碼
              </label>
              <Input
                id="member-password-old"
                name="oldPassword"
                type="password"
                required
                minLength={PASSWORD_MIN_LENGTH}
                autoComplete="current-password"
                placeholder={`至少 ${PASSWORD_MIN_LENGTH} 個字元`}
              />
            </div>
            <div>
              <label
                htmlFor="member-password-new"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                新密碼
              </label>
              <Input
                id="member-password-new"
                name="newPassword"
                type="password"
                required
                minLength={PASSWORD_MIN_LENGTH}
                autoComplete="new-password"
                placeholder={`至少 ${PASSWORD_MIN_LENGTH} 個字元`}
              />
            </div>
            <div>
              <label
                htmlFor="member-password-confirm"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                確認新密碼
              </label>
              <Input
                id="member-password-confirm"
                name="confirmPassword"
                type="password"
                required
                minLength={PASSWORD_MIN_LENGTH}
                autoComplete="new-password"
                placeholder={`至少 ${PASSWORD_MIN_LENGTH} 個字元`}
              />
            </div>

            {matchError ? (
              <p className="text-sm text-red-600" role="alert">
                {matchError}
              </p>
            ) : null}

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={closePasswordEditor}
              >
                取消
              </Button>
              <Button type="submit" variant="default">
                確認
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MemberPage;
