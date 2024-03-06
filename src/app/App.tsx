import { Outlet } from 'react-router-dom';
import LangProvider from './providers/LangProvider';
import DesktopLayout from '@/views/layout';
import { PreloaderProvider } from './providers/preloader';
import Preloader from '@/views/components/preloader';

function App() {
  return (
    <LangProvider>
      <PreloaderProvider>
        <DesktopLayout>
          <Preloader />
          <Outlet />
        </DesktopLayout>
      </PreloaderProvider>
    </LangProvider>
  );
}

export default App;
