import { MainFeed } from './components/MainFeed';
import { SidebarNav } from './components/SidebarNav';
import { TopBar } from './components/TopBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <TopBar />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <MainFeed />
        </main>
      </div>
    </div>
  );
}
