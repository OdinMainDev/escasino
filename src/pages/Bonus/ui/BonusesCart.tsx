import styles from './BonusesCart.module.scss';
import { useAppSelector } from '@/store/hooks/redux';
import { BonusesTemplateItem } from '@/entities/BonusesTemplateItem';
import Button from '@/shared/ui/Button';
import { useRouter } from '@/shared/helpers/navigation';
import { PageHeader } from '@/widgets/Header';
import { useTranslation } from 'react-i18next';
const BonusesCart = () => {
  const { t } = useTranslation();
  const { bonusesTemplates } = useAppSelector((state) => state.cartBonusesSlice);
  const { games } = useAppSelector((state) => state.gamesAllSlice);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <PageHeader customBackPath="/wallet/deposit/replenish" title={t('bonusCart')} />
      <div className={styles.content}>
        {bonusesTemplates.length > 0 ? (
          bonusesTemplates.map((item) => (
            <BonusesTemplateItem template={item} games={games} key={item.uuid} />
          ))
        ) : (
          <div className={styles.empty}>
            <div className={styles.empty_title}>{t('bonusesNotSelected')}</div>
            <Button onClick={() => router.push('/bonus')}>{t('chooseBonuses')}</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BonusesCart;
