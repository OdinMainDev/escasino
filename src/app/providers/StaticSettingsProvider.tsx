/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getStaticSettings } from '@/store/slices/staticSettingsSlice';
import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const StaticSettingsProvider = ({ children }: IProps) => {
  const { isFinished, loading, hasError } = useAppSelector((state) => state.settingsReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFinished && !loading) {
      void dispatch(getStaticSettings());
    }
    if (isFinished && hasError) {
      navigate('/error/unavailable');
    }
  }, [isFinished, loading, hasError]);

  return children;
};

export default StaticSettingsProvider;
