import { HTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from '@/shared/helpers/navigation';
import { PlaceholderGame } from '@/app/assets/images/Placeholder';
import { IGame } from '@/shared/models/interfaces/game';
import styles from './GridItem.module.scss';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  game: IGame;
}

const GridItem = ({ game, ...otherProps }: IProps) => {
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageEffect = import.meta.env.VITE_IMAGE_EFFECT as string;
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
        <div className={styles.imageWrapper}>
          {!isImageLoaded && (
            <div className={styles.post_card_skeleton}>
              <span className={classNames(styles.post_thumbnail, styles.shimmer)}></span>
            </div>
          )}
          <div
            className={classNames(styles.image_container, {
              [styles.slide_in]: imageEffect === 'slide-in',
              [styles.visible]: isImageLoaded,
            })}
          >
            <img
              alt={game.name}
              src={imagePath}
              loading="lazy"
              className={styles.image}
              onLoad={() => {
                setIsImageLoaded(true);
              }}
            />
          </div>
        </div>
      ) : (
        <PlaceholderGame {...game} />
      )}
    </div>
  );
};

export default GridItem;
