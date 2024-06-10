import { ICartBonusTemplate } from '@/shared/models/interfaces/bonuses';
import styles from './BonusesItem.module.scss';
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
  let image = PlaceholderImage;
  let gameName = '';
  let bonusTitle = '';
  let description = '';
  const currentLanguage = useCurrentLanguage();
  const dispatch = useAppDispatch();
  const [removing, setRemoving] = useState(false);

  if (template.meta.image != '') {
    image = template.meta.image;
  }

  bonusTitle =
    template.meta.texts?.find((item) => item.language.toLowerCase() === currentLanguage)?.value ??
    '';

  if (template.game_id) {
    games?.forEach((game) => {
      if (game.id != template.game_id) {
        return;
      }
      image = game.image;
      gameName =
        game.data.texts?.find((item) => item.language.toLowerCase() === currentLanguage)?.value ??
        game.name;
    });
  }

  if (!description) {
    if (template.type == 'freespins') {
      description = template.spins_count.toString() + ' FS';
      if (gameName.length > 0) {
        description += ' (' + gameName + ')';
      }
    } else {
      description = template.bonus_percent.toString() + ' %';
    }
  }

  if (!bonusTitle) {
    if (template.type == 'freespins') {
      bonusTitle = 'Freespins бонус';
    } else {
      bonusTitle = 'Бонус к депозиту';
    }
  }

  const removeItem = () => {
    setRemoving(true);
    setTimeout(() => {
      dispatch(deleteCartBonusesItem(template.uuid));
      setRemoving(false);
    }, 300); // Длительность анимации
  };

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
      <div className={styles.remove} onClick={removeItem}>
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
