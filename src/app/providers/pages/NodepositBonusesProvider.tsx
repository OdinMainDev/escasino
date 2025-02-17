import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getNodepositBonuses } from '@/store/slices/nodepositSlice';
import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthProvider } from '@/app/providers/AuthProvider';

interface IProps {
  children: ReactNode;
}

const NodepositBonusesProvider = ({ children }: IProps) => {
  const {
    isFinished: bonusesIsFinished,
    loading: bonusesLoading,
    hasError: bonusesHasError,
  } = useAppSelector((state) => state.bonusesSlice);

  const { isAuth } = useAuthProvider();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!bonusesIsFinished && !bonusesLoading && isAuth) {
      void dispatch(getNodepositBonuses());
    }
    if (bonusesIsFinished && bonusesHasError) {
      navigate('/error/unavailable');
    }
  }, [bonusesIsFinished, bonusesLoading, bonusesHasError, isAuth, dispatch, navigate]);

  return children;
};

export default NodepositBonusesProvider;
