import { Navigate, Outlet, useLocation } from "react-router-dom";

/** 未帶 access_token 時導向登入（保護會員／貼文相關路由） */
export default function RequireAuth() {
  const location = useLocation();
  const token = localStorage.getItem("access_token");

  if (!token) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
}
