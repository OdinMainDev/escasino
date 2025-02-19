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
import { UrlHistoryProvider } from './providers/UrlHistoryProvider';
import AffiliateProvider from './providers/AffiliateProvider';

function App() {
  return (
    <UrlHistoryProvider>
      <AffiliateProvider>
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
      </AffiliateProvider>
    </UrlHistoryProvider>
  );
}

export default App;
