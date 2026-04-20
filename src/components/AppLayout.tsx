import { Outlet } from 'react-router-dom';
import TopBar from '@/components/TopBar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <TopBar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
