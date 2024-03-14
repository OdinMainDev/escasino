import { IFilter, getSearchGamesApi } from '@/app/api/games/getSearchGames';
import styles from './Search.module.scss';

import { usePreloader } from '@/app/providers/PreloaderProvider';
// import { useAppSelector } from '@/store/hooks/redux';
import { IGame } from '@/entities/game';
import { GamesGrid } from '@/widgets/Games/ui/Grid';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';
import { useQuery } from '@/shared/helpers/navigation';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Search() {
  const [games, setGames] = useState<IGame[]>([]);
  const { hidePreloader } = usePreloader();
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
      const filter: IFilter = {
        query: getFilters().query,
        providers: getFilters().providers,
        categories: getFilters().categories,
        is_game_avail_for_bonus: getFilters().is_game_avail_for_bonus,
      };
      const data = await getSearchGamesApi(filter);
      setGames(data);
      hidePreloader();
    };

    void getGames();
  }, [location]);

  // TODO: сделать в хидере или где то кнопку дополнительную, что сбросить поиск по тексту или фильтры ( тут надо тебе подумать надо ли )
  return (
    <div>
      <div className={styles.games_table}>
        {games?.length > 0 ? (
          <GamesGrid games={games} />
        ) : (
          <div className={styles.not_found}>По вашему запросу ничего не найдено</div>
        )}
      </div>
    </div>
  );
}
