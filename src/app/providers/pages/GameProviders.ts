/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getGameProviders } from '@/store/slices/gameProvidersSlice';
import { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const GameProvidersProvider = ({ children }: IProps) => {
  const { isFinished, loading, hasError } = useAppSelector((state) => state.gameProvidersReducer);
  const [availability, setAvailability] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFinished && !loading) {
      void dispatch(getGameProviders());
    }
    if (isFinished && !hasError) {
      setAvailability(true);
    }
    if (isFinished && hasError) {
      navigate('/error/unavailable');
    }
  }, [isFinished, loading, hasError]);

  if (!availability) {
    return '';
  }
  return children;
};

export default GameProvidersProvider;
