import { Outlet } from 'react-router-dom';
import LangProvider from './providers/LangProvider';
import { EventDispatcherProvider } from './providers/EventDispatcher';
import { ModalProvider } from './providers/ModalProvider';
import SettingsProvider from './providers/SettingsProvider';
import { AuthProvider } from './providers/AuthProvider';
import GamesFilterProvider from './providers/pages/GamesFilter';
import StaticSettingsProvider from './providers/StaticSettingsProvider';
import 'swiper/css';
import GamesAllProviders from './providers/GamesAllProviders';
import ThemeProvider from './providers/ThemeProvider';
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StaticSettingsProvider>
          <SettingsProvider>
            <GamesAllProviders>
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
            </GamesAllProviders>
          </SettingsProvider>
        </StaticSettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
