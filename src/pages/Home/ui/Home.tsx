import styles from './Home.module.scss';

import { themeHasTopGames } from '@/app/config/appearance';
import { usePreloader } from '@/app/providers/PreloaderProvider';
import { TopGames } from '@/features/Games/ui/TopGames';
import { Header } from '@/shared/components/Header';
import { useAppSelector } from '@/store/hooks/redux';
import { Footer } from '@/shared/components/Footer';
import { GamesGrid } from '@/features/Games/ui/Grid';
import { IGame } from '@/entities/game';

export default function Home() {
  const { games } = useAppSelector((state) => state.homeGamesReducer);
  const { hidePreloader } = usePreloader();
  let gamesGrid: IGame[] = games ? games : [];
  let topGamesGrid: IGame[] = gamesGrid;
  if (themeHasTopGames) {
    topGamesGrid = gamesGrid.slice(0, 20);
    gamesGrid = gamesGrid.slice(20);
  }

  hidePreloader();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      {themeHasTopGames ? (
        <div className={styles.top_games}>
          <TopGames games={topGamesGrid} />
        </div>
      ) : (
        ''
      )}
      <div className={styles.games_table}>
        <GamesGrid games={gamesGrid} />
      </div>
      <Footer />
    </div>
  );
}
