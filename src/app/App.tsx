import { Outlet } from 'react-router-dom';
import LangProvider from './providers/LangProvider';
import { EventDispatcherProvider } from './providers/EventDispatcher';
import { ModalProvider } from './providers/ModalProvider';
import SettingsProvider from './providers/SettingsProvider';
import { PreloaderProvider } from './providers/PreloaderProvider';
import Preloader from '@/shared/components/Preloader';

function App() {
  return (
    <PreloaderProvider>
      <SettingsProvider>
        <LangProvider>
          <ModalProvider>
            {/* EventDispatcherProvider -после него мы не вставляем никакие провайдеры, он завершающий */}
            <EventDispatcherProvider>
              <Outlet />
              <Preloader />
            </EventDispatcherProvider>
          </ModalProvider>
        </LangProvider>
      </SettingsProvider>
    </PreloaderProvider>
  );
}

export default App;
