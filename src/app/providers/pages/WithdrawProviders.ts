/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getWithdrawProviders } from '@/store/slices/withdrawProvidersSlice';
import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const WithdrawProvidersProvider = ({ children }: IProps) => {
  const { isFinished, loading, hasError } = useAppSelector(
    (state) => state.withdrawProvidersReducer,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFinished && !loading) {
      void dispatch(getWithdrawProviders());
    }
    if (isFinished && hasError) {
      navigate('/error/unavailable');
    }
  }, [isFinished, loading, hasError]);

  return children;
};

export default WithdrawProvidersProvider;
