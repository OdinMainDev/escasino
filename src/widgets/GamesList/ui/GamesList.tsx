'use client';

import { GamesTable } from '@/features/GamesTable';
import { IGame } from '@/shared/models/interfaces/games';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './GamesList.module.scss';
import { postSearchGamesApi } from '@/shared/api/searchApi';
import { IFilter } from '@/shared/models/interfaces/filter';

const GamesList = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    const getGames = async () => {
      const filter: IFilter = {
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
  }, [searchParams]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.roulette_wheel}></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GamesTable games={games} />
    </div>
  );
};

export default GamesList;
