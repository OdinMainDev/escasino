import styles from './Placeholder.module.scss';
import { IGame } from '@/shared/models/interfaces/game';

const PlaceholderGame = (game: IGame) => {
  return (
    <div className={styles.container}>
      <div>{game.name}</div>
    </div>
  );
};

export default PlaceholderGame;
