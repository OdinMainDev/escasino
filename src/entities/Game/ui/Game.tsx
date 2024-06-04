import { IGame } from '@/shared/models/interfaces/game';
import styles from './Game.module.scss';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import { BaseHTMLAttributes } from 'react';

interface IProps extends BaseHTMLAttributes<HTMLElement> {
  game: IGame;
}
const Game = ({ game, ...otherProps }: IProps) => {
  return (
    <div className={styles.container} {...otherProps}>
      {game.image ? (
        <img className={styles.img} alt={game.name} src={game.image} />
      ) : (
        <img className={styles.img} alt={game.name} src={PlaceholderImage} />
      )}
      <div className="flex flex-col gap-[8px]">
        <div className={styles.subtitle}>{game.game_provider}</div>
        <div className={styles.title}>{game.name}</div>
      </div>
    </div>
  );
};

export default Game;
