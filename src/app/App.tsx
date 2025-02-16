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
import PusherModalProvider from './providers/PusherModalProvider';
import { UrlHistoryProvider } from './providers/UrlHistoryProvider';
import AffiliateProvider from './providers/AffiliateProvider';
import NodepositBonusesProvider from './providers/pages/NodepositBonusesProvider';

function App() {
  return (
    <UrlHistoryProvider>
      <AffiliateProvider>
        <ThemeProvider>
          <AuthProvider>
            <NodepositBonusesProvider>
              <StaticSettingsProvider>
                <SettingsProvider>
                  <GamesAllProviders>
                    <LangProvider>
                      <ModalProvider>
                        <PusherModalProvider>
                          <GamesFilterProvider>
                            {/* EventDispatcherProvider -после него мы не вставляем никакие провайдеры, он завершающий */}
                            <EventDispatcherProvider>
                              <Outlet />
                            </EventDispatcherProvider>
                          </GamesFilterProvider>
                        </PusherModalProvider>
                      </ModalProvider>
                    </LangProvider>
                  </GamesAllProviders>
                </SettingsProvider>
              </StaticSettingsProvider>
            </NodepositBonusesProvider>
          </AuthProvider>
        </ThemeProvider>
      </AffiliateProvider>
    </UrlHistoryProvider>
  );
}

export default App;
