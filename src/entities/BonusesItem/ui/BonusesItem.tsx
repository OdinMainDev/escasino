import { IBonus } from '@/shared/models/interfaces/bonuses';
import styles from './BonusesItem.module.scss';
import classNames from 'classnames';
import { useCurrentLanguage } from '@/app/providers/LangProvider';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import { useAppSelector } from '@/store/hooks/redux';

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
    return '';
  };

  const getBonusTitle = () => {
    const bonusTitle =
      template.meta.texts?.find((item) => item.language.toLowerCase() === currentLanguage)?.value ??
      '';
    if (bonusTitle) return bonusTitle;
    return 'Бонус';
  };

  const image = getImage();
  const gameName = getGameName();
  const bonusTitle = getBonusTitle();
  return (
    <div className={classNames(styles.container, {})}>
      <img className={styles.img} alt="sw" src={image} />
      <div className="flex flex-col gap-[8px] flex-1">
        <div className={styles.subtitle}>{bonusTitle}</div>
        <div className={styles.title}>{gameName}</div>
      </div>
    </div>
  );
};

export default BonusesItem;
