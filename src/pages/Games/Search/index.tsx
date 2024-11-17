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
  const [games, setGames] = useState<IGame[] | null>(null);
  const { setFilters, getFilters, countActiveKeys } = useGamesFilters();
  const router = useRouter();
  const searchParams = useQuery();

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
    if (countActiveKeys(getFilters()) + getFilters().query.length === 0) {
      router.replace('/');
    }
  }, [
    getFilters().providers,
    getFilters().categories,
    getFilters().is_game_avail_for_bonus,
    getFilters().query,
  ]);

  return (
    <IndexLayout>
      <div
        className={classNames(styles.games_table, {
          [styles.has_categories]: getFilters().categories.length > 0,
        })}
      >
        {games && games?.length > 0 ? (
          <GamesGrid games={games} />
        ) : (
          <div className={styles.not_found}>
            {games ? <div>{t('nothingFoundForRequest')}</div> : <Loader />}
          </div>
        )}
      </div>
    </IndexLayout>
  );
}
