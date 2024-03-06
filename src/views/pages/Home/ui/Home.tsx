import styles from './Home.module.scss';
import { useHomeGames } from '@/app/repositories/homegames';

export default function Home() {
  const { games } = useHomeGames();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      {/* <div className={styles.top_games}>
        <TopGames />
      </div> */}
      <div className={styles.games_table}>
        <GamesTable games={games} />
      </div>
      <Footer />
    </div>
  );
}
