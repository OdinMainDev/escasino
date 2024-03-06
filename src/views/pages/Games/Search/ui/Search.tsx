import { IGame } from '@/app/entities/game';
import styles from './Search.module.scss';
import { useQuery } from '@/app/helpers/navigation';
import { useLocation } from 'react-router-dom';
import { IFilter, getSearchGamesApi } from '@/app/api/games/getSearchGames';
import { useEffect, useState } from 'react';
import { usePreloader } from '@/app/providers/preloader';
import { Header } from '@/views/components/Header';
import { GamesGrid } from '@/views/components/GamesGrid';
import { Footer } from '@/views/components/Footer';

export default function Search() {
  const [games, setGames] = useState<IGame[]>([]);
  const searchParams = useQuery();
  const location = useLocation();
  const { isLoading, hidePreloader } = usePreloader();

  useEffect(() => {
    const getGames = async () => {
      const filter: IFilter = {
        query: searchParams.get('query') ?? '',
        providers: searchParams.getAll('providers[]') ?? [],
        categories: searchParams.getAll('categories[]') ?? [],
        is_game_avail_for_bonus: searchParams.get('is_game_avail_for_bonus') == 'true' ?? false,
        distinct_filters: searchParams.get('distinct_filters') === 'true' ?? true,
      };
      const data = await getSearchGamesApi(filter);
      setGames(data);
      hidePreloader();
    };

    void getGames();
  }, [location]);

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.games_table}>
        <GamesGrid games={games} />
      </div>
      <Footer />
    </div>
  );
}
