import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MemberPage from './pages/MemberPage';
import PostsPage from './pages/PostsPage';
import PostsEditPage from './pages/PostsEditPage';
import ErrorPage from './pages/errorPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/member" element={<MemberPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postId/edit" element={<PostsEditPage />} />
        <Route path="/posts/:postId" element={<PostsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
