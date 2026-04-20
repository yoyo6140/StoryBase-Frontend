import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Input, Button } from "@/components/ui";
import { useState, useEffect } from "react";
import { getMember, changePassword } from "@/hooks/useMember";
import { Eye, EyeOff } from "lucide-react";

function MemberPage() {
  const access_token = localStorage.getItem("access_token");
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  //打開編輯密碼視窗
  const openPasswordEditor = () => {
    setError("");
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setIsEditing(true);
  };

  //關閉編輯密碼視窗
  const closePasswordEditor = () => {
    setError("");
    setIsEditing(false);
  };

  //取得會員資料
  useEffect(() => {
    let cancelled = false;
    setProfileLoading(true);
    if (!access_token) {
      setProfileLoading(false);
      return () => {
        cancelled = true;
      };
    }
    getMember({ access_token })
      .then((data) => {
        if (!cancelled) {
          setUsername(data.username);
          setEmail(data.email);
        }
      })
      .catch(() => {
        /* 錯誤時維持空白，由 RequireAuth／後續操作處理 */
      })
      .finally(() => {
        if (!cancelled) setProfileLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [access_token]);

  //修改密碼
  function handleChangePassword(e: any) {
    e.preventDefault();

    if (!access_token) {
      setError("請先登入");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("新密碼與確認新密碼須相同");
      return;
    }
    changePassword({
      access_token,
      old_password: oldPassword,
      new_password: newPassword,
    })
      .then(() => {
        alert("修改成功");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        closePasswordEditor();
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  if (profileLoading) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="card-surface w-full p-5 sm:p-8">
        <header>
          <h1 className="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">
            會員資料
          </h1>
          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
            檢視並更新您的帳號資訊
          </p>
        </header>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="member-username"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              使用者名稱
            </label>
            <div
              id="member-username"
              className="break-words text-sm text-zinc-900 sm:text-base"
            >
              {username}
            </div>
          </div>
          <div>
            <label
              htmlFor="member-email"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              電子郵件
            </label>
            <div
              id="member-email"
              className="break-words text-sm text-zinc-900 sm:text-base"
            >
              {email}
            </div>
          </div>
        </div>

        {!isEditing && (
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={openPasswordEditor}
            >
              修改密碼
            </Button>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="card-surface w-full p-5 sm:p-8">
          <h2 className="text-base font-bold tracking-tight text-zinc-900 sm:text-lg">
            變更密碼
          </h2>
          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
            請輸入舊密碼與新密碼以完成更新。
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleChangePassword}>
            <div>
              <label
                htmlFor="member-password-old"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                舊密碼
              </label>
              <div className="relative">
                <Input
                  id="member-password-old"
                  type={showOldPassword ? "text" : "password"}
                  required
                  minLength={6}
                  className="pr-10"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                  onClick={() => setShowOldPassword((v) => !v)}
                  aria-label={showOldPassword ? "隱藏舊密碼" : "顯示舊密碼"}
                >
                  {showOldPassword ? (
                    <EyeOff className="size-4 cursor-pointer" aria-hidden />
                  ) : (
                    <Eye className="size-4 cursor-pointer" aria-hidden />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="member-password-new"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                新密碼
              </label>
              <div className="relative">
                <Input
                  id="member-password-new"
                  type={showNewPassword ? "text" : "password"}
                  required
                  minLength={6}
                  className="pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                  onClick={() => setShowNewPassword((v) => !v)}
                  aria-label={showNewPassword ? "隱藏新密碼" : "顯示新密碼"}
                >
                  {showNewPassword ? (
                    <EyeOff className="size-4 cursor-pointer" aria-hidden />
                  ) : (
                    <Eye className="size-4 cursor-pointer" aria-hidden />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="member-password-confirm"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                確認新密碼
              </label>
              <div className="relative">
                <Input
                  id="member-password-confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  minLength={6}
                  className="pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={
                    showConfirmPassword ? "隱藏確認密碼" : "顯示確認密碼"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4 cursor-pointer" aria-hidden />
                  ) : (
                    <Eye className="size-4 cursor-pointer" aria-hidden />
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={closePasswordEditor}
              >
                取消
              </Button>
              <Button
                type="submit"
                variant="default"
                className="w-full sm:w-auto"
              >
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
