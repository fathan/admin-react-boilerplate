import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function CmsLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#12110e] flex">
      <Sidebar />
      <main className="flex-1 ml-72 p-8">
        <Outlet />
      </main>
    </div>
  );
}
