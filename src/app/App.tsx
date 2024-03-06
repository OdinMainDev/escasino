import { Outlet } from 'react-router-dom';
import LangProvider from './providers/LangProvider';
import DesktopLayout from '@/views/layout';
import { PreloaderProvider } from './providers/preloader';
import Preloader from '@/views/components/preloader';
import { EventDispatcherProvider } from './providers/EventDispatcher';

function App() {
  return (
    <LangProvider>
      <PreloaderProvider>
        {/* EventDispatcherProvider -после него мы не вставляем никакие провайдеры, он завершающий */}
        <EventDispatcherProvider>
          <DesktopLayout>
            <Preloader />
            <Outlet />
          </DesktopLayout>
        </EventDispatcherProvider>
      </PreloaderProvider>
    </LangProvider>
  );
}

export default App;
