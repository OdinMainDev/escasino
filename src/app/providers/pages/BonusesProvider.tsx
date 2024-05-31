/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getBonuses } from '@/store/slices/bonusesSlices';
import { getBonusesTemplates } from '@/store/slices/bonusesTemplates';
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
  const {
    isFinished: templatesIsFinished,
    loading: templatesLoading,
    hasError: templatesHasError,
  } = useAppSelector((state) => state.bonusesTemplatesSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!bonusesIsFinished && !bonusesLoading) {
      void dispatch(getBonuses());
    }
    if (bonusesIsFinished && bonusesHasError) {
      navigate('/error/unavailable');
    }
  }, [bonusesIsFinished, bonusesLoading, bonusesHasError]);

  useEffect(() => {
    if (!templatesIsFinished && !templatesLoading) {
      void dispatch(getBonusesTemplates());
    }
    if (templatesIsFinished && templatesHasError) {
      navigate('/error/unavailable');
    }
  }, [templatesIsFinished, templatesLoading, templatesHasError]);

  return children;
};

export default BonusesProvider;
