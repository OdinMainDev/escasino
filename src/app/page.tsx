import GamesTable from '@/widgets/GamesTable/ui/GamesTable';
import { Header } from '@/widgets/Header';
import { TopGames } from '@/widgets/TopGames';

import styles from './styles.module.scss';
import { AuthFooter } from '@/widgets/Auth';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.top_games}>
        <TopGames />
      </div>
      <div className={styles.games_table}>
        <GamesTable />
      </div>
      <AuthFooter />
    </div>
  );
}
