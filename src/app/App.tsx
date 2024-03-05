import { Outlet } from 'react-router-dom';
import DesktopLayout from './layout/DesktopLayout';
import AuthProvider from './providers/AuthProvider';
import LangProvider from './providers/LangProvider';
import './assets/styles/global.scss';

function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <DesktopLayout>
          <Outlet />
        </DesktopLayout>
      </AuthProvider>
    </LangProvider>
  );
}

export default App;
