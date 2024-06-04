import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getBonuses } from '@/store/slices/bonusesSlices';
import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const BonusesProvider = ({ children }: IProps) => {
  const {
    isFinished: bonusesIsFinished,
    loading: bonusesLoading,
    hasError: bonusesHasError,
  } = useAppSelector((state) => state.bonusesSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!bonusesIsFinished && !bonusesLoading) {
      void dispatch(getBonuses());
    }
    if (bonusesIsFinished && bonusesHasError) {
      navigate('/error/unavailable');
    }
  }, [bonusesIsFinished, bonusesLoading, bonusesHasError, dispatch, navigate]);

  return children;
};

export default BonusesProvider;
