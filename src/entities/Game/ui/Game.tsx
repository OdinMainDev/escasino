'use client';

import { IGame } from '@/shared/models/interfaces/games';
import styles from './Game.module.scss';
import { HTMLAttributes } from 'react';
import { useRouter } from '@/shared/hooks/navigation';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  game: IGame;
}

const Game = ({ game, ...otherProps }: IProps) => {
  const router = useRouter();
  return (
    <div
      {...otherProps}
      className={styles.container}
      onClick={() => router.push(`games/${game.id}`)}
    >
      {game.image ? (
        <img src={game.image} alt={game.name} className={styles.image} />
      ) : (
        <div className={styles.without_image}>
          <div className={styles.without_image_title}>No Image Available</div>
          <div>{game.name}</div>
        </div>
      )}
      {/* <div className={styles.without_image}>
        <div className={styles.without_image_title}>No Image Available</div>
        <div>{game.name}</div>
      </div> */}
    </div>
  );
};

export default Game;
