import { useAuthProvider } from '../AuthProvider';
import { useRouter } from '@/shared/helpers/navigation';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthGuardProvider = () => {
  const { isAuth } = useAuthProvider();
  const router = useRouter();
  if (!isAuth && !Cookies.get('atoken')) {
    router.push('/');
    return;
  }
  return <Outlet />;
};

export default AuthGuardProvider;
