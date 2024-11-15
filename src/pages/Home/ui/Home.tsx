import styles from './Home.module.scss';

import { themeHasTopGames } from '@/app/config/appearance';
import { useAppSelector } from '@/store/hooks/redux';
import { IGame } from '@/shared/models/interfaces/game';
import { TopGames } from '@/widgets/Games/ui/TopGames';
import { GamesGrid } from '@/widgets/Games/ui/Grid';
import IndexLayout from '@/shared/layouts/home';
import Loader from '@/shared/ui/Loader';
import { useEffect, useState } from 'react';

export default function Home() {
  const { games: homeGames, loading } = useAppSelector((state) => state.homeGamesReducer);
  const [games, setGames] = useState<IGame[]>([]);
  let gamesGrid: IGame[] = homeGames ? homeGames : [];
  let topGamesGrid: IGame[] = gamesGrid;
  if (themeHasTopGames) {
    topGamesGrid = gamesGrid.slice(0, 20);
    gamesGrid = gamesGrid.slice(20);
  }

  useEffect(() => {
    if (homeGames) {
      setGames(homeGames);
    }
  }, [homeGames]);

  return (
    <IndexLayout>
      <div className={styles.container}>
        {!loading && themeHasTopGames ? (
          <div className={styles.top_games}>
            <TopGames games={topGamesGrid} />
          </div>
        ) : (
          ''
        )}
        {loading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <div className={styles.games_table}>
            <GamesGrid games={games} />
          </div>
        )}
      </div>
    </IndexLayout>
  );
}
