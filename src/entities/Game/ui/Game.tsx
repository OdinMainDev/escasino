import { IGame } from '@/shared/models/interfaces/games';
import styles from './Game.module.scss';
import Image from 'next/image';

interface IProps {
  game: IGame;
}

const Game = ({ game }: IProps) => {
  return (
    <div className={styles.container}>
      {game.image ? (
        <Image
          src={game.image}
          alt={game.name}
          className={styles.image}
          fill
          sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
        />
      ) : (
        <div className={styles.without_image}>
          <div className={styles.without_image_title}>No Image Available</div>
          <div>{game.name}</div>
        </div>
      )}
    </div>
  );
};

export default Game;
