import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getNodepositBonuses } from '@/store/slices/nodepositSlice';
import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const NodepositBonusesProvider = ({ children }: IProps) => {
  const {
    isFinished: bonusesIsFinished,
    loading: bonusesLoading,
    hasError: bonusesHasError,
  } = useAppSelector((state) => state.bonusesSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!bonusesIsFinished && !bonusesLoading) {
      void dispatch(getNodepositBonuses());
    }
    if (bonusesIsFinished && bonusesHasError) {
      navigate('/error/unavailable');
    }
  }, [bonusesIsFinished, bonusesLoading, bonusesHasError, dispatch, navigate]);

  return children;
};

export default NodepositBonusesProvider;
