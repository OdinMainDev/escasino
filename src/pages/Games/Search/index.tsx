import { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { IGame } from '@/shared/models/interfaces/game';
import { IFilter, getSearchGamesApi } from '@/app/api/games/getSearchGames';
import { GamesGrid } from '@/widgets/Games/ui/Grid';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';
import { useQuery, useRouter } from '@/shared/helpers/navigation';
import IndexLayout from '@/shared/layouts/home';
import { isAppDebug } from '@/app/config/app';
import Loader from '@/shared/ui/Loader';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export default function Search() {
  const { t } = useTranslation();
  const [games, setGames] = useState<IGame[]>([]);
  const { setFilters, getFilters, countActiveKeys } = useGamesFilters();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [isLastElement, setIsLastElement] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useQuery();

  useEffect(() => {
    if (searchParams.get('query') != undefined || null) {
      const newFilters = getFilters();
      newFilters.query = searchParams.get('query') ?? '';
      setFilters(newFilters);
      setPage(1);
    }

    const getGames = async () => {
      setGames([]);
      setPage(1);
      setLoading(true);
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
      setLoading(false);
    };
    void getGames();
    if (countActiveKeys(getFilters()) + getFilters().query.length === 0) {
      router.replace('/');
    }
  }, [
    getFilters().providers,
    getFilters().categories,
    getFilters().is_game_avail_for_bonus,
    getFilters().query,
  ]);

  const viewLastElement = async () => {
    if (!loading && !isLastElement) {
      const filter: IFilter = {
        query: getFilters().query,
        providers: getFilters().providers,
        categories: getFilters().categories,
        is_game_avail_for_bonus: getFilters().is_game_avail_for_bonus,
      };
      const nextPage = page + 1;
      const data = await getSearchGamesApi(filter, nextPage);
      if (data.length === 0) {
        setIsLastElement(true);
        return;
      }
      setPage(nextPage);
      setGames((prev) => [...prev, ...data]);
    }
  };

  return (
    <IndexLayout>
      <div
        className={classNames(styles.games_table, {
          [styles.has_categories]:
            getFilters().categories.length > 0 || getFilters().is_game_avail_for_bonus,
        })}
      >
        {games && games?.length > 0 ? (
          <GamesGrid games={games} viewLastElement={() => void viewLastElement()} />
        ) : (
          <div className={styles.not_found}>
            {games.length === 0 && !loading && <div>{t('nothingFoundForRequest')}</div>}
          </div>
        )}
        {loading && <Loader />}
      </div>
    </IndexLayout>
  );
}
