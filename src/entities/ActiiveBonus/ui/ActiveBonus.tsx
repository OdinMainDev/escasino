import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import styles from './ActiveBonus.module.scss';
import PlaceholderGame from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import Button from '@/shared/ui/Button';

interface IProps {
  template: IBonusTemplate;
}

const ActiveBonus = ({ template }: IProps) => {
  return (
    <div className={styles.container}>
      <div className="flex gap-[16px] items-center mb-[16px]">
        <img src={PlaceholderGame} alt="" className={styles.image} />
        <div className={styles.info}>
          <div className={styles.col}>
            <div>
              <div className={styles.subtitle}>Ставка</div>
              <div className={styles.value}>{template.configurator.currency}</div>
            </div>
            <div>
              <div className={styles.subtitle}>Сумма бонуса</div>
              <div className={styles.value}>{template.bonus_percent}</div>
            </div>
          </div>
          <div className={styles.col}>
            <div>
              <div className={styles.subtitle}>Фриспины</div>
              <div className={styles.value}>{template.spins_count}</div>
            </div>
            <div>
              <div className={styles.subtitle}>Вейджер</div>
              <div className={styles.subtitle}>X{template.wager}</div>
            </div>
          </div>
        </div>
      </div>
      <Button className="w-[100%]" theme="light">
        Отменить бонус
      </Button>
    </div>
  );
};

export default ActiveBonus;
