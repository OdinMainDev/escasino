import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './BonusesList.module.scss';
import Icons from '@/shared/ui/Icons';
import { useAppSelector } from '@/store/hooks/redux';
import Loader from '@/shared/ui/Loader';

const BonusesList = () => {
  const { bonuses, loading } = useAppSelector((state) => state.bonusesSlice);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton />
        <div className={styles.title}>спиок бонусов</div>
        <Icons icon="chat" />
      </div>
      <div className={styles.content}>
        {!loading ? (
          <Loader />
        ) : bonuses && bonuses.length > 0 ? (
          bonuses.map((item) => <div key={item.id}></div>)
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default BonusesList;
