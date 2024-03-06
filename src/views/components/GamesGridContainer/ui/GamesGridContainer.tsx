import { IGame } from '@/app/entities/game';
import styles from './GamesGrid.module.scss';
import { GamesTable } from '@/features/GamesTable';

interface GamesGridContainerProps {
  games: IGame[] | null;
}

const GamesGridContainer: React.FC<GamesGridContainerProps> = ({ games }) => {
  if (!games) {
    return null;
  }

  return (
    <div className={styles.container}>
      {games.length > 0 ? (
        <GamesTable games={games} />
      ) : (
        <div className={styles.warning}>К сожалению у нас нет таких игр</div>
      )}
    </div>
  );
};

export default GamesGridContainer;
