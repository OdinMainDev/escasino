import classNames from 'classnames';
import styles from './Games.module.scss';
import { Game } from '@/entities/Game';
import { IGame } from '@/shared/models/interfaces/games';

interface IProps {
  games: IGame[];
}

const GamesTable = ({ games }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={classNames('title', styles.title)}>Games</div>
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

export default GamesTable;
