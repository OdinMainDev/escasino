/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getGameCategories } from '@/store/slices/gameCategoriesSlice';
import { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const GameCategoriesProvider = ({ children }: IProps) => {
  const { isFinished, loading, hasError } = useAppSelector((state) => state.gameCategoriesReducer);
  const [availability, setAvailability] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFinished && !loading) {
      void dispatch(getGameCategories());
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

export default GameCategoriesProvider;
