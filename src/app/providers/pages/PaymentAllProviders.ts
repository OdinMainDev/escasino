/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getPaymentAllProviders } from '@/store/slices/paymentAllProvidersSlice';
import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const PaymentAllProvidersProvider = ({ children }: IProps) => {
  const { isFinished, loading, hasError } = useAppSelector(
    (state) => state.paymentProvidersReducer,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFinished && !loading) {
      void dispatch(getPaymentAllProviders());
    }
    if (isFinished && hasError) {
      navigate('/error/unavailable');
    }
  }, [isFinished, loading, hasError]);

  return children;
};

export default PaymentAllProvidersProvider;
