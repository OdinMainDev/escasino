import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './BonusesList.module.scss';
import Icons from '@/shared/ui/Icons';
import { useAppSelector } from '@/store/hooks/redux';
import Loader from '@/shared/ui/Loader';
import { BonusesItem } from '@/entities/BonusesItem';

const BonusesList = () => {
  const { bonuses, loading } = useAppSelector((state) => state.bonusesSlice);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton />
        <div className={styles.title}>Спиок бонусов</div>
        <Icons icon="chat" />
      </div>
      <div className={styles.content}>
        {loading ? (
          <Loader />
        ) : bonuses && bonuses.length > 0 ? (
          bonuses.map((item) => <BonusesItem key={item.id} bonus={item} />)
        ) : (
          <div className={styles.emplty}>У вас нет бонусов</div>
        )}
      </div>
    </div>
  );
};

export default BonusesList;
