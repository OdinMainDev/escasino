import { IGame } from '@/entities/Game';
import styles from './GamesGrid.module.scss';
import { GridItem } from '@/shared/components/Games/ui/GridItem';

interface IProps {
  games: IGame[];
}

const GamesGrid = ({ games }: IProps) => {
  return (
    <div className={styles.container}>
      {/* <div className={classNames('title', styles.title)}>Games</div> */}
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
