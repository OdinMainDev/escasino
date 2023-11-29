import classNames from 'classnames';
import styles from './Games.module.scss';
import { getTopGamesApi } from '@/shared/api/gamesApi';
import { Game } from '@/entities/Game';

const GamesTable = async () => {
  const games = await getTopGamesApi({ offset: 10, limit: 'all' });
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
