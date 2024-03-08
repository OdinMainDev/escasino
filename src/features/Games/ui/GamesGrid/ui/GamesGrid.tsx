import styles from './GamesGrid.module.scss';
import { IGame } from '@/entities/game';
import { Game } from '@/features/Games/ui/Game';

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
            <Game game={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesGrid;
