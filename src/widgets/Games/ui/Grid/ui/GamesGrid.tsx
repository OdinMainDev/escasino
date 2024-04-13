import { IGame } from '@/shared/models/interfaces/game';
import styles from './GamesGrid.module.scss';
import { GridItem } from '@/widgets/Games/ui/GridItem';

interface IProps {
  games: IGame[];
}

const GamesGrid = ({ games }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {games.map((item) => (
          <div className={styles.game} key={item.id}>
            <GridItem game={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesGrid;
