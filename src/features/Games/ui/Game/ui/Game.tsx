'use client';

import { HTMLAttributes } from 'react';

import styles from './Game.module.scss';
import { IGame } from '@/entities/game';
import { useRouter } from '@/shared/helpers/navigation';

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
        // TODO: тут надо убрать текст ( No Image Available ) ( название игры оставить) и на задний фон картинку поставить
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
