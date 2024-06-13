/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from '@/shared/helpers/navigation';
import styles from './styles.module.scss';
import { useCallback, useState } from 'react';
// import { IFilter } from '@/app/api/games/getSearchGames';
import CategoriesList from './ui/CategoriesList';
import ProviderList from './ui/ProviderList';
import Button from '@/shared/ui/Button';
import Switch from '@/shared/ui/Switch';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';
import Icons from '@/shared/ui/Icons';

const Filter = () => {
  const { setFilters, getFilters, countActiveKeys } = useGamesFilters();
  const router = useRouter();
  const [withBonuses, setWithBonuses] = useState<boolean>(getFilters().is_game_avail_for_bonus);

  const selectCategory = useCallback((selectedCategory: string) => {
    const category = getFilters().categories.find((item) => item === selectedCategory);
    const newFilters = getFilters();
    if (!category) {
      if (newFilters) {
        newFilters.categories = [...newFilters.categories, selectedCategory];
      }
      setFilters(newFilters);
    } else {
      if (newFilters) {
        newFilters.categories = newFilters.categories.filter((item) => item !== selectedCategory);
      }
      setFilters(newFilters);
    }
  }, []);

  const selectProvider = useCallback((selectedProvider: string) => {
    const provider = getFilters().providers.find((item) => item === selectedProvider);
    const newFilters = getFilters();
    if (!provider) {
      if (newFilters) {
        newFilters.providers = [...newFilters.providers, selectedProvider];
      }
      setFilters(newFilters);
    } else {
      if (newFilters) {
        newFilters.providers = newFilters.providers.filter((item) => item !== selectedProvider);
      }
      setFilters(newFilters);
    }
  }, []);

  const applyFilters = () => {
    router.push({
      pathname: '/games/search',
    });
  };

  const resetFilter = () => {
    const newFilters = getFilters();
    newFilters.categories = [];
    newFilters.providers = [];
    newFilters.is_game_avail_for_bonus = false;
    setFilters(newFilters);
    setWithBonuses(false);
  };

  const activeKeys = countActiveKeys(getFilters());
  return (
    <>
      <div className={styles.loader_container}>{/* <Loader /> */}</div>
      <div className={styles.container}>
        <div className="flex items-center justify-between">
          <div className={styles.title}>Фильтр и сортировка</div>
          <div className="cursor-pointer" onClick={router.goBack}>
            <Icons icon="cross" />
          </div>
        </div>
        <div className={styles.bonus}>
          <div className={styles.bonus_info}>
            <div className={styles.subtitle}>Собери бонус</div>
            <div className={styles.bonus_subtitle}>Игры с возможностью создать свой бонус</div>
          </div>
          <div className={styles.bonus_active}>
            <Switch
              isToggled={withBonuses}
              onToggle={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = e.target.checked;
                const newFilters = getFilters();
                if (newFilters) {
                  newFilters.is_game_avail_for_bonus = val;
                }
                setFilters(newFilters);
                setWithBonuses(val);
              }}
            />
          </div>
        </div>
        <div className={styles.type}>
          <div className={styles.subtitle}>Тип игры</div>
          <CategoriesList selectCategory={selectCategory} />
        </div>
        <div className={styles.provider}>
          <div className={styles.subtitle}>Провайдеры</div>
          <ProviderList selectProvider={selectProvider} />
        </div>
        <div className={styles.footer}>
          <Button elType="outlined" onClick={resetFilter}>
            Сбросить
          </Button>
          <Button onClick={applyFilters} disabled={activeKeys === 0}>
            Применить
          </Button>
        </div>
      </div>
    </>
  );
};

export default Filter;
