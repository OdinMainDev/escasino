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
  const imagePath = game.image
    ? game.image
    : game.system_name
      ? `${import.meta.env.VITE_IMAGE_PATH}/${game.game_provider}/${import.meta.env.VITE_IMAGE_SIZE}/${game.system_name}.png`
      : game.image;
  return (
    <div
      {...otherProps}
      className={styles.container}
      onClick={() => router.push(`/games/details/${game.id}`)}
    >
      {imagePath ? (
        <LazyLoadImage
          alt={game.name}
          src={imagePath}
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
