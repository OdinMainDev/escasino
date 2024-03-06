import styles from './Home.module.scss';
import { useHomeGames } from '@/app/repositories/homegames';
import { usePreloader } from '@/app/providers/preloader';
import { GamesGrid } from '@/views/components/GamesGrid';
import { themeHasTopGames } from '@/common/config/appearance';
import { IGame } from '@/app/entities/game';
import { Header } from '@/views/components/Header';
import { Footer } from '@/views/components/Footer';
import { TopGames } from '@/views/components/TopGames';

export default function Home() {
  const { games, loading: loadingGames } = useHomeGames();
  const { hidePreloader } = usePreloader();
  if (loadingGames) {
    return null;
  }

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
      <div className={styles.top_games}>
        <TopGames games={topGamesGrid} />
      </div>
      <div className={styles.games_table}>
        <GamesGrid games={gamesGrid} />
      </div>
      <Footer />
    </div>
  );
}
