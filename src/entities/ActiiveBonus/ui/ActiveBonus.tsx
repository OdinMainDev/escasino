import { ICartBonusTemplate } from '@/shared/models/interfaces/bonuses';
import styles from './ActiveBonus.module.scss';
import Button from '@/shared/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { deleteCartBonusesItem } from '@/store/slices/cartBonusesSlice';
import { useTranslation } from 'react-i18next';

interface IProps {
  template: ICartBonusTemplate | null;
}

const ActiveBonus = ({ template }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { games } = useAppSelector((state) => state.gamesAllSlice);
  const cancelBonus = () => {
    if (template) {
      dispatch(deleteCartBonusesItem(template.uuid));
    }
  };
  let image;
  if (template?.game_id) {
    games?.forEach((game) => {
      if (game.id != template.game_id) {
        return;
      }
      image = game.system_name
        ? `${import.meta.env.VITE_IMAGE_PATH}/${game.game_provider}/${import.meta.env.VITE_IMAGE_SIZE}/${game.system_name}.png`
        : game.image;
    });
  }

  if (template?.meta.image && template?.meta.image != '') {
    image = template?.meta.image ?? null;
  }

  return (
    <div className={styles.container}>
      <div className="flex gap-[16px] items-center mb-[16px]">
        {image === null ? (
          <div className={styles.image_empty}></div>
        ) : (
          <img src={image} alt="" className={styles.image} />
        )}
        <div className={styles.info}>
          {template?.type !== 'money' && (
            <div className={styles.col}>
              <div>
                <div className={styles.subtitle}>{t('bet')}</div>
                <div className={styles.value}>{template?.configurator.bet_amount}</div>
              </div>
              <div>
                <div className={styles.subtitle}>{t('bonusSum')}</div>
                <div className={styles.value}>
                  {(template?.spins_count ?? 1) * (template?.configurator.bet_amount ?? 0)}
                </div>
              </div>
            </div>
          )}

          <div className={styles.col}>
            {template?.type !== 'money' ? (
              <>
                <div>
                  <div className={styles.subtitle}>{t('freespins')}</div>
                  <div className={styles.value}>{template?.spins_count}</div>
                </div>
                <div>
                  <div className={styles.subtitle}>{t('wager')}</div>
                  <div className={styles.value}>X{template?.wager}</div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className={styles.subtitle}>{t('wager')}</div>
                  <div className={styles.subtitle}>X{template.wager}</div>
                </div>
                <div>
                  <div className={styles.subtitle}>{t('bonusPercent')}</div>
                  <div className={styles.value}>{template.spins_count}%</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Button onClick={cancelBonus} className="w-[100%]" elType="outlined" reverseTheme>
        {t('cancelBonus')}
      </Button>
    </div>
  );
};

export default ActiveBonus;
