import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MemberPage from "./pages/MemberPage";
import PostsPage from "./pages/PostsPage";
import PostsEditPage from "./pages/PostsEditPage";
import PostAddPage from "./pages/PostAddPage";
import ErrorPage from "./pages/errorPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/member" element={<MemberPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/new" element={<PostAddPage />} />
        <Route path="/posts/:postId/edit" element={<PostsEditPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
