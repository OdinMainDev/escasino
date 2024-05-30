import { Outlet } from 'react-router-dom';
import LangProvider from './providers/LangProvider';
import { EventDispatcherProvider } from './providers/EventDispatcher';
import { ModalProvider } from './providers/ModalProvider';
import SettingsProvider from './providers/SettingsProvider';
import { AuthProvider } from './providers/AuthProvider';
import GamesFilterProvider from './providers/pages/GamesFilter';
import StaticSettingsProvider from './providers/StaticSettingsProvider';
import 'swiper/css';
function App() {
  return (
    <AuthProvider>
      <StaticSettingsProvider>
        <SettingsProvider>
          <LangProvider>
            <ModalProvider>
              <GamesFilterProvider>
                {/* EventDispatcherProvider -после него мы не вставляем никакие провайдеры, он завершающий */}
                <EventDispatcherProvider>
                  <Outlet />
                </EventDispatcherProvider>
              </GamesFilterProvider>
            </ModalProvider>
          </LangProvider>
        </SettingsProvider>
      </StaticSettingsProvider>
    </AuthProvider>
  );
}

export default App;
