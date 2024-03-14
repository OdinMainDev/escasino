'use client';

import { HTMLAttributes } from 'react';

import styles from './GridItem.module.scss';

import { IGame } from '@/entities/game';
import { useRouter } from '@/shared/helpers/navigation';
import { PlaceholderGame } from '@/app/assets/images/Placeholder';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  game: IGame;
}

const GridItem = ({ game, ...otherProps }: IProps) => {
  const router = useRouter();
  return (
    <div
      {...otherProps}
      className={styles.container}
      onClick={() => router.push(`/games/details/${game.id}`)}
    >
      {game.image ? (
        <img src={game.image} alt={game.name} className={styles.image} />
      ) : (
        <PlaceholderGame {...game} />
      )}
    </div>
  );
};

export default GridItem;
