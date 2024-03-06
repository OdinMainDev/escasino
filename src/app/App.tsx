import { Outlet } from 'react-router-dom';
import LangProvider from './providers/LangProvider';
import DesktopLayout from '@/views/layout/DesktopLayout';

function App() {
  return (
    <LangProvider>
      <DesktopLayout>
        <Outlet />
      </DesktopLayout>
    </LangProvider>
  );
}

export default App;
