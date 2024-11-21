import styles from './Home.module.scss';

import { themeHasTopGames } from '@/app/config/appearance';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { IGame } from '@/shared/models/interfaces/game';
import { TopGames } from '@/widgets/Games/ui/TopGames';
import { GamesGrid } from '@/widgets/Games/ui/Grid';
import IndexLayout from '@/shared/layouts/home';
import Loader from '@/shared/ui/Loader';
import { useEffect, useState } from 'react';
import { getHomeGames, setGames } from '@/store/slices/homeGamesSlice';

export default function Home() {
  const { games: homeGames, loading } = useAppSelector((state) => state.homeGamesReducer);
  let gamesGrid: IGame[] = homeGames ? homeGames : [];
  let topGamesGrid: IGame[] = gamesGrid;
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  if (themeHasTopGames) {
    topGamesGrid = gamesGrid.slice(0, 20);
    gamesGrid = gamesGrid.slice(20);
  }

  useEffect(() => {
    return () => {
      dispatch(setGames([]));
    };
  }, []);

  const viewLastElement = () => {
    if (!loading) {
      void dispatch(getHomeGames({ page: page + 1 }));
      setPage(page + 1);
    }
  };

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
        <div className={styles.games_table}>
          <GamesGrid games={homeGames} viewLastElement={viewLastElement} />
          {loading && <Loader />}
        </div>
      </div>
    </IndexLayout>
  );
}
