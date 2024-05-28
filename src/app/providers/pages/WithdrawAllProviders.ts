/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getWithdrawAllProviders } from '@/store/slices/withdrawAllProvidersSlice';
import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const WithdrawAllProvidersProvider = ({ children }: IProps) => {
  const { isFinished, loading, hasError } = useAppSelector(
    (state) => state.withdrawAllProvidersSlice,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFinished && !loading) {
      void dispatch(getWithdrawAllProviders());
    }
    if (isFinished && hasError) {
      navigate('/error/unavailable');
    }
  }, [isFinished, loading, hasError]);

  return children;
};

export default WithdrawAllProvidersProvider;
