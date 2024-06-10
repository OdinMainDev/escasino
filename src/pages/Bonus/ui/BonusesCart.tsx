import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './BonusesCart.module.scss';
import Icons from '@/shared/ui/Icons';
import { useAppSelector } from '@/store/hooks/redux';
import { BonusesItem } from '@/entities/BonusesItem';
import Button from '@/shared/ui/Button';
import { useRouter } from '@/shared/helpers/navigation';
const BonusesCart = () => {
  const { bonusesTemplates } = useAppSelector((state) => state.cartBonusesSlice);
  const { games } = useAppSelector((state) => state.gamesAllSlice);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton customPath="/wallet/deposit/replenish" />
        <div className={styles.title}>Корзина бонусов</div>
        <Icons icon="chat" />
      </div>
      <div className={styles.content}>
        {bonusesTemplates.length > 0 ? (
          bonusesTemplates.map((item) => (
            <BonusesItem template={item} games={games} key={item.uuid} />
          ))
        ) : (
          <div className={styles.empty}>
            <div className={styles.empty_title}>Не выбраны бонусы</div>
            <Button onClick={() => router.push('/bonus')}>Выбрать бонусы</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BonusesCart;
