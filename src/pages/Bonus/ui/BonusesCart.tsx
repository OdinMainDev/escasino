import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './BonusesCart.module.scss';
import Icons from '@/shared/ui/Icons';
import { useAppSelector } from '@/store/hooks/redux';
import { BonusesItem } from '@/entities/BonusesItem';
import Button from '@/shared/ui/Button';
import { useRouter } from '@/shared/helpers/navigation';
const BonusesCart = () => {
  const { bonusesTemplates } = useAppSelector((state) => state.cartBonusesSlice);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton />
        <div className={styles.title}>Игры бонусов</div>
        <Icons icon="chat" />
      </div>
      <div className={styles.content}>
        {bonusesTemplates.length > 0 ? (
          bonusesTemplates.map((item, index) => (
            <BonusesItem template={item} key={item.id + index} />
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
