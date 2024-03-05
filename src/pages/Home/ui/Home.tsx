import { Header } from '@/widgets/Header';
// import { TopGames } from '@/widgets/TopGames';
import { GamesTable } from '@/features/GamesTable';

import styles from './Home.module.scss';
import { getGamesApi } from '@/shared/api/gamesApi';
import { Footer } from '@/widgets/Footer';
import { useEffect, useState } from 'react';
import { IGame } from '@/shared/models/interfaces/games';

export default function Home() {
  // TODO: починить список игр( не работает почему то )
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    const getGames = async () => {
      const data = await getGamesApi({ offset: 0, limit: 'all' });
      setGames(data);
    };

    void getGames();
  }, []);

  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <Header />
      </div> */}
      {/* <div className={styles.top_games}>
        <TopGames />
      </div> */}
      <div className={styles.games_table}>
        <GamesTable games={games} />
      </div>
      <Footer />
    </div>
  );
}
