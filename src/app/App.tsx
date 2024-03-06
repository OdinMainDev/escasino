import { Outlet } from 'react-router-dom';
import LangProvider from './providers/LangProvider';
import DesktopLayout from '@/views/layout';
import { PreloaderProvider } from './providers/preloader';
import Preloader from '@/views/components/preloader';
import { EventDispatcherProvider } from './providers/EventDispatcher';
import { ModalProvider } from './providers/ModalProvider';

function App() {
  return (
    <LangProvider>
      <PreloaderProvider>
        <ModalProvider>
          {/* EventDispatcherProvider -после него мы не вставляем никакие провайдеры, он завершающий */}
          <EventDispatcherProvider>
            <DesktopLayout>
              <Preloader />
              <Outlet />
            </DesktopLayout>
          </EventDispatcherProvider>
        </ModalProvider>
      </PreloaderProvider>
    </LangProvider>
  );
}

export default App;
