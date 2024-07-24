'use client';

import { HTMLAttributes } from 'react';

import styles from './GridItem.module.scss';

import { useRouter } from '@/shared/helpers/navigation';
import { PlaceholderGame } from '@/app/assets/images/Placeholder';
import { IGame } from '@/shared/models/interfaces/game';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
        <LazyLoadImage
          alt={game.name}
          src={game.image}
          wrapperClassName={styles.image}
          effect="opacity"
        />
      ) : (
        <PlaceholderGame {...game} />
      )}
    </div>
  );
};

export default GridItem;
