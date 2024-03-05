import { useAppDispatch } from '@/shared/hooks/redux';
import { useEffect } from 'react';
import { getMeUser } from '@/store/slices/userSlice';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getMeUser());
  }, [dispatch]);
  return children;
};

export default AuthProvider;
