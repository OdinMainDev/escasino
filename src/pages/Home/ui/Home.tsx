import { Header } from '@/widgets/Header';
// import { TopGames } from '@/widgets/TopGames';
import { GamesTable } from '@/features/GamesTable';

import styles from './Home.module.scss';
import { Footer } from '@/widgets/Footer';
import { useEffect, useState } from 'react';
import { IGame } from '@/shared/models/interfaces/games';
import { postSearchGamesApi } from '@/shared/api/searchApi';
import { IFilter } from '@/shared/models/interfaces/filter';
import { useQuery } from '@/shared/hooks/navigation';

export default function Home() {
  // TODO: починить список игр( не работает почему то )
  const [games, setGames] = useState<IGame[]>([]);
  const searchParams = useQuery();
  useEffect(() => {
    const getGames = async () => {
      const filter: IFilter = {
        query: searchParams.get('query') ?? '',
        providers: searchParams.getAll('providers[]') ?? [],
        categories: searchParams.getAll('categories[]') ?? [],
        is_game_avail_for_bonus: searchParams.get('is_game_avail_for_bonus') == 'true' ?? false,
        distinct_filters: searchParams.get('distinct_filters') === 'true' ?? true,
      };
      const data = await postSearchGamesApi(filter);
      setGames(data);
    };

    void getGames();
  }, [searchParams]);

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
