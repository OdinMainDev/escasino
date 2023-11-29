import GamesTable from '@/widgets/GamesTable/ui/GamesTable';
import { Header } from '@/widgets/Header';
import { TopGames } from '@/widgets/TopGames';

import styles from './styles.module.scss';
import { AuthFooter } from '@/widgets/AuthFooter';

export default function Home() {
  return (
    <div>
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
