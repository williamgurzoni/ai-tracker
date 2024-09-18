import { InstallPrompt } from './components/PWA';
import Title from './components/title';
import Repos from './repos';
import Stats from './stats';

export default function Home() {
  return (
    <div>
      <InstallPrompt />
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col gap-10">
          <Title>AI Tracker for Devs</Title>
          <div className="text-center text-lg">
            Your Gateway to the Most Influential AI Repositories
          </div>

          <Stats />
        </div>
      </div>
      <Repos />
    </div>
  );
}
