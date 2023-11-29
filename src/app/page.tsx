import GamesTable from '@/widgets/GamesTable/ui/GamesTable';
import { Header } from '@/widgets/Header';
import { TopGames } from '@/widgets/TopGames';

import styles from './styles.module.scss';

export default function Home() {
  return (
    <div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.top_games}>
        <TopGames />
      </div>
      <div>
        <GamesTable />
      </div>
    </div>
  );
}
