import { GamesTable } from '@/features/GamesTable';
import { IGame } from '@/shared/models/interfaces/games';
import { useQuery } from '@/shared/hooks/navigation';
import { useEffect, useState } from 'react';
import { postSearchGamesApi } from '@/shared/api/searchApi';
import { IFilter } from '@/shared/models/interfaces/filter';
import styles from './GamesList.module.scss';
import Loader from '@/shared/ui/Loader';

const GamesList = () => {
  const searchParams = useQuery();
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    const getGames = async () => {
      const filter: IFilter = {
        query: searchParams.get('query') ?? '',
        providers: searchParams.getAll('providers[]') ?? [],
        categories: searchParams.getAll('categories[]') ?? [],
        is_game_avail_for_bonus: searchParams.get('is_game_avail_for_bonus') == 'true' ?? false,
        distinct_filters: searchParams.get('distinct_filters') === 'true' ?? true,
      };
      setLoading(true);
      setGames(await postSearchGamesApi(filter));
      setLoading(false);
    };

    void getGames();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      {games.length > 0 ? (
        <GamesTable games={games} />
      ) : (
        <div className={styles.warning}>К сожалению у нас нет таких игр</div>
      )}
    </div>
  );
};

export default GamesList;
