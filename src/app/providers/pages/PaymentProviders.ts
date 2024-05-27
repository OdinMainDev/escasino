/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getPaymentProviders } from '@/store/slices/paymentProvidersSlice';
import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const PaymentProvidersProvider = ({ children }: IProps) => {
  const { isFinished, loading, hasError } = useAppSelector(
    (state) => state.paymentProvidersReducer,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFinished && !loading) {
      void dispatch(getPaymentProviders());
    }
    if (isFinished && hasError) {
      navigate('/error/unavailable');
    }
  }, [isFinished, loading, hasError]);

  return children;
};

export default PaymentProvidersProvider;
