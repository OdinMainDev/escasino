import classNames from 'classnames';
import styles from './TopGames.module.scss';
import { GamesSlider } from '@/features/GamesSlider';
import { IGame } from '@/shared/models/interfaces/games';
import { getGamesApi } from '@/shared/api/gamesApi';

const TopGames = async () => {
  const games: IGame[] = await getGamesApi();
  return (
    <div className={styles.container}>
      <div className={classNames('title', styles.title)}>Top Games</div>
      <GamesSlider games={games} />
    </div>
  );
};

export default TopGames;
