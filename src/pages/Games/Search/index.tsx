/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './styles.module.scss';
import { IGame } from '@/entities/game';
import { IFilter, getSearchGamesApi } from '@/app/api/games/getSearchGames';
import { GamesGrid } from '@/widgets/Games/ui/Grid';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';
import { useQuery } from '@/shared/helpers/navigation';
import IndexLayout from '@/shared/ui/home';
import { isAppDebug } from '@/app/config/app';
import Loader from '@/shared/components/Loader';

export default function Search() {
  const [games, setGames] = useState<IGame[] | null>(null);
  const { setFilters, getFilters } = useGamesFilters();

  const searchParams = useQuery();
  const location = useLocation();

  useEffect(() => {
    if (searchParams.get('query') != undefined || null) {
      const newFilters = getFilters();
      newFilters.query = searchParams.get('query') ?? '';
      setFilters(newFilters);
    }

    const getGames = async () => {
      setGames(null);
      const filter: IFilter = {
        query: getFilters().query,
        providers: getFilters().providers,
        categories: getFilters().categories,
        is_game_avail_for_bonus: getFilters().is_game_avail_for_bonus,
      };
      const data = await getSearchGamesApi(filter);
      if (isAppDebug) {
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        await sleep(5000);
      }
      setGames(data);
    };

    void getGames();
  }, [location]);

  // TODO: сделать в хидере или где то кнопку дополнительную, что сбросить поиск по тексту или фильтры ( тут надо тебе подумать надо ли )
  return (
    <IndexLayout>
      <div className={styles.games_table}>
        {games && games?.length > 0 ? (
          <GamesGrid games={games} />
        ) : (
          <div className={styles.not_found}>
            {games ? <div>По вашему запросу ничего не найдено</div> : <Loader />}
          </div>
        )}
      </div>
    </IndexLayout>
  );
}
