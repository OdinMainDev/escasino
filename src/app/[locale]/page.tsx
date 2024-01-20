import { Header } from '@/widgets/Header';
import { TopGames } from '@/widgets/TopGames';
import { GamesTable } from '@/features/GamesTable';

import styles from './styles.module.scss';
import { AuthModal, AuthFooter } from '@/widgets/Auth';
import { getGamesApi } from '@/shared/api/gamesApi';

export default async function Home() {
  const games = await getGamesApi({ offset: 10, limit: 'all' });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.top_games}>
        <TopGames />
      </div>
      <div className={styles.games_table}>
        <GamesTable games={games} />
      </div>
      <AuthFooter />
      <AuthModal />
    </div>
  );
}
