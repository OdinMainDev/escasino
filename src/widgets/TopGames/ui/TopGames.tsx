import classNames from 'classnames';
import styles from './TopGames.module.scss';
import { GamesSlider } from '@/features/GamesSlider';
import { IGame } from '@/shared/models/interfaces/games';
import { getGamesApi } from '@/shared/api/gamesApi';
import { useEffect, useState } from 'react';

const TopGames = () => {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    const getGames = async () => {
      const data = await getGamesApi();
      setGames(data);
    };
    void getGames();
  }, []);

  return (
    <div className={styles.container}>
      <div className={classNames('title', styles.title)}>Top Games</div>
      <GamesSlider games={games} />
    </div>
  );
};

export default TopGames;
