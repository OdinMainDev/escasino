import { IBonus } from '@/shared/models/interfaces/bonuses';
import styles from './BonusesItem.module.scss';
import { useCurrentLanguage } from '@/app/providers/LangProvider';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import { useAppSelector } from '@/store/hooks/redux';
import Button from '@/shared/ui/Button';
import dateFormatter from '@/shared/helpers/dateFormatter';

interface IProps {
  bonus: IBonus;
}
const BonusesItem = ({ bonus }: IProps) => {
  const currentLanguage = useCurrentLanguage();
  const { games } = useAppSelector((state) => state.gamesAllSlice);
  const template = bonus.bonus_template;

  const getImage = () => {
    if (template.meta.image) return template.meta.image;
    if (bonus.data.bonuses_list.length > 0) {
      const game = games?.find((game) => game.id === bonus.data.bonuses_list[0].game_id);
      if (game?.image) return game.image;
    }
    return PlaceholderImage;
  };

  const getGameName = () => {
    if (bonus.data.bonuses_list.length > 0) {
      const game = games?.find((game) => game.id === bonus.data.bonuses_list[0].game_id);
      if (game) {
        return (
          game.data.texts?.find((item) => item.language.toLowerCase() === currentLanguage)?.value ??
          game.name
        );
      }
    }
    return 'Игра не выбрана';
  };

  const getBonusTitle = () => {
    const bonusTitle =
      template.meta.texts?.find((item) => item.language.toLowerCase() === currentLanguage)?.value ??
      '';
    if (bonusTitle) return bonusTitle;
    return 'Бонус';
  };

  const getBonusStatus = () => {
    switch (bonus.status) {
      case 1:
        return 'Не активный бонус';
      case 2:
        return 'Активный бонус';
      case 3:
        return 'Завершенный бонус';
      case 4:
        return 'Отмененный бонус';
      case 5:
        return 'Истекший бонус';
      default:
        return '';
    }
  };

  const image = getImage();
  const gameName = getGameName();
  const bonusTitle = getBonusTitle();
  const bonusStatus = getBonusStatus();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{bonusStatus}</div>
      <div className={styles.info}>
        <div className={styles.info_block}>
          <div className={styles.label}>Бонусный ставка</div>
          <div className={styles.value}>
            {bonus.bonus_template.configurator.bet_amount}{' '}
            {bonus.bonus_template.configurator.currency}
          </div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>Количество FS</div>
          <div className={styles.value}>{bonus.bonus_template.spins_count}</div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>Максимальная сумма</div>
          <div className={styles.value}>{bonus.bonus_template.bonus_settings.max_amount}</div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>Минимальная сумма</div>
          <div className={styles.value}>{bonus.bonus_template.bonus_settings.min_amount}</div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>Отыграш истекает</div>
          <div className={styles.value}>{dateFormatter(bonus.expired_at)}</div>
        </div>
      </div>
      <div className={styles.game}>
        <img className={styles.game_img} alt="sw" src={image} />
        <div className="flex flex-col gap-[8px] flex-1">
          <div className={styles.game_subtitle}>{bonusTitle}</div>
          <div className={styles.game_title}>{gameName}</div>
        </div>
      </div>
      <Button reverseTheme elType="outlined">
        Отменить
      </Button>
    </div>
  );
};

export default BonusesItem;
