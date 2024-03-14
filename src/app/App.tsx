import { Outlet } from 'react-router-dom';
import LangProvider from './providers/LangProvider';
import { EventDispatcherProvider } from './providers/EventDispatcher';
import { ModalProvider } from './providers/ModalProvider';
import SettingsProvider from './providers/SettingsProvider';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <LangProvider>
          <ModalProvider>
            {/* EventDispatcherProvider -после него мы не вставляем никакие провайдеры, он завершающий */}
            <EventDispatcherProvider>
              <Outlet />
            </EventDispatcherProvider>
          </ModalProvider>
        </LangProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
