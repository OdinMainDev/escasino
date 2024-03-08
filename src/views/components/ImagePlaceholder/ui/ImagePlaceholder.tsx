import { IGame } from '@/app/entities/game';
import styles from './ImagePlaceholder.module.scss';

const ImagePlaceholder = (game: IGame) => {
  return (
    <div className={styles.container}>
      <div>{game.name}</div>
    </div>
  );
};

export default ImagePlaceholder;
