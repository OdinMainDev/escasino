import { ICartBonusTemplate } from '@/shared/models/interfaces/bonuses';
import styles from './ActiveBonus.module.scss';
import PlaceholderGame from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import Button from '@/shared/ui/Button';
import { useAppDispatch } from '@/store/hooks/redux';
import { deleteCartBonusesItem } from '@/store/slices/cartBonusesSlice';

interface IProps {
  template: ICartBonusTemplate | null;
}

const ActiveBonus = ({ template }: IProps) => {
  const dispatch = useAppDispatch();
  const cancelBonus = () => {
    if (template) {
      dispatch(deleteCartBonusesItem(template.uuid));
    }
  };
  return (
    <div className={styles.container}>
      <div className="flex gap-[16px] items-center mb-[16px]">
        <img src={PlaceholderGame} alt="" className={styles.image} />
        <div className={styles.info}>
          {template?.type !== 'money' && (
            <div className={styles.col}>
              <div>
                <div className={styles.subtitle}>Ставка</div>
                <div className={styles.value}>{template?.configurator.bet_amount}</div>
              </div>
              <div>
                <div className={styles.subtitle}>Сумма бонуса</div>
                <div className={styles.value}>{template?.bonus_percent}</div>
              </div>
            </div>
          )}

          <div className={styles.col}>
            {template?.type !== 'money' ? (
              <>
                <div>
                  <div className={styles.subtitle}>Фриспины</div>
                  <div className={styles.value}>{template?.spins_count}</div>
                </div>
                <div>
                  <div className={styles.subtitle}>Вейджер</div>
                  <div className={styles.value}>X{template?.wager}</div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className={styles.subtitle}>Вейджер</div>
                  <div className={styles.subtitle}>X{template.wager}</div>
                </div>
                <div>
                  <div className={styles.subtitle}>% бонуса</div>
                  <div className={styles.value}>{template.spins_count}%</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Button onClick={cancelBonus} className="w-[100%]" elType="outlined" reverseTheme>
        Отменить бонус
      </Button>
    </div>
  );
};

export default ActiveBonus;
