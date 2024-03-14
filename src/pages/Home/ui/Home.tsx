import styles from './Home.module.scss';

import { themeHasTopGames } from '@/app/config/appearance';
import { useAppSelector } from '@/store/hooks/redux';
import { IGame } from '@/entities/game';
import { TopGames } from '@/widgets/Games/ui/TopGames';
import { GamesGrid } from '@/widgets/Games/ui/Grid';
import IndexLayout from '@/shared/ui/home';
import Loader from '@/shared/components/Loader';

export default function Home() {
  const { games, loading } = useAppSelector((state) => state.homeGamesReducer);
  let gamesGrid: IGame[] = games ? games : [];
  let topGamesGrid: IGame[] = gamesGrid;
  if (themeHasTopGames) {
    topGamesGrid = gamesGrid.slice(0, 20);
    gamesGrid = gamesGrid.slice(20);
  }

  return (
    <IndexLayout>
      {!loading && themeHasTopGames ? (
        <div className={styles.top_games}>
          <TopGames games={topGamesGrid} />
        </div>
      ) : (
        ''
      )}
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className={styles.games_table}>
          <GamesGrid games={gamesGrid} />
        </div>
      )}
    </IndexLayout>
  );
}
