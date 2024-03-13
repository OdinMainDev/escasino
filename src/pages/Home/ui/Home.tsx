import styles from './Home.module.scss';

import { themeHasTopGames } from '@/app/config/appearance';
import { usePreloader } from '@/app/providers/PreloaderProvider';
import { useAppSelector } from '@/store/hooks/redux';
import { IGame } from '@/entities/game';
import { Header } from '@/widgets/Header';
import { TopGames } from '@/widgets/Games/ui/TopGames';
import { GamesGrid } from '@/widgets/Games/ui/Grid';
import { Footer } from '@/widgets/Footer';

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
