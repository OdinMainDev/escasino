import { IBonus } from '@/shared/models/interfaces/bonuses';
import styles from './BonusesItem.module.scss';
import classNames from 'classnames';
import { useCurrentLanguage } from '@/app/providers/LangProvider';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png'

interface IProps {
  bonus: IBonus;
}
const BonusesItem = ({ bonus }: IProps) => {
  const currentLanguage = useCurrentLanguage();
  const template = bonus.bonus_template;

  const getImage = () => {
    if (template.meta.image) return template.meta.image;
    if (bonus.data.bonuses_list) {
      const game = games?.find((game) => game.id === template.game_id);
      if (game?.image) return game.image;
    }
    return PlaceholderImage;
  };

  const getGameName = () => {
    if (template.game_id) {
      const game = games?.find((game) => game.id === template.game_id);
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
    return template.type === 'freespins' ? 'Freespins бонус' : 'Бонус к депозиту';
  };

  const getDescription = (gameName: string) => {
    if (template.type === 'freespins') {
      return `${template.spins_count} FS${gameName ? ` (${gameName})` : ''}`;
    }
    return `${template.bonus_percent} %`;
  };

  const image = getImage();
  const gameName = getGameName();
  const bonusTitle = getBonusTitle();
  const description = getDescription(gameName);
  return (
    <div className={classNames(styles.container, {})}>
      <img className={styles.img} alt={bonus.} src={image} />
      <div className="flex flex-col gap-[8px] flex-1">
        <div className={styles.subtitle}>{bonusTitle}</div>
        <div className={styles.title}>{description}</div>
      </div>
    </div>
  );
};

export default BonusesItem;
