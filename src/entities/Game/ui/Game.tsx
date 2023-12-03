import { IGame } from '@/shared/models/interfaces/games';
import styles from './Game.module.scss';
import Image from 'next/image';

interface IProps {
  game: IGame;
}

const Game = ({ game }: IProps) => {
  return (
    <div className={styles.container}>
      {game.image && (
        <Image
          src={game.image}
          alt={game.name}
          className={styles.image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
};

export default Game;
