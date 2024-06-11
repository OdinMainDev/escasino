import { ICartBonusTemplate } from '@/shared/models/interfaces/bonuses';
import styles from './BonusesTemplateItem.module.scss';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import { BaseHTMLAttributes, useState } from 'react';
import { useAppDispatch } from '@/store/hooks/redux';
import { deleteCartBonusesItem } from '@/store/slices/cartBonusesSlice';
import classNames from 'classnames';
import { IGame } from '@/shared/models/interfaces/game';
import { useCurrentLanguage } from '@/app/providers/LangProvider';

interface IProps extends BaseHTMLAttributes<HTMLElement> {
  template: ICartBonusTemplate;
  games: IGame[] | null;
}

const BonusesItem = ({ template, games, ...otherProps }: IProps) => {
  const currentLanguage = useCurrentLanguage();
  const dispatch = useAppDispatch();
  const [removing, setRemoving] = useState(false);

  const getImage = () => {
    if (template.meta.image) return template.meta.image;
    if (template.game_id) {
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

  const handleRemoveItem = () => {
    setRemoving(true);
    setTimeout(() => {
      dispatch(deleteCartBonusesItem(template.uuid));
      setRemoving(false);
    }, 300); // Duration of animation
  };

  const image = getImage();
  const gameName = getGameName();
  const bonusTitle = getBonusTitle();
  const description = getDescription(gameName);

  return (
    <div
      className={classNames(styles.container, {
        [styles.removing]: removing,
      })}
      {...otherProps}
    >
      <img className={styles.img} alt={bonusTitle} src={image} />
      <div className="flex flex-col gap-[8px] flex-1">
        <div className={styles.subtitle}>{bonusTitle}</div>
        <div className={styles.title}>{description}</div>
      </div>
      <div className={styles.remove} onClick={handleRemoveItem}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 1L1 13M1 1L13 13"
            stroke="#FFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default BonusesItem;
