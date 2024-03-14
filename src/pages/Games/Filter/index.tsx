/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from '@/shared/helpers/navigation';
import styles from './styles.module.scss';
import { useCallback, useState } from 'react';
// import { IFilter } from '@/app/api/games/getSearchGames';
import CategoriesList from './ui/CategoriesList';
import ProviderList from './ui/ProviderList';
import Button from '@/shared/components/Button';
import Switch from '@/shared/components/Switch';
import { usePreloader } from '@/app/providers/PreloaderProvider';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';
import { useNavigate } from 'react-router-dom';

const Filter = () => {
  const { setFilters, getFilters, countActiveKeys, setFiltersQuantity } = useGamesFilters();
  const router = useRouter();
  const { hidePreloader } = usePreloader();
  const [withBonuses, setWithBonuses] = useState<boolean>(getFilters().is_game_avail_for_bonus);
  const navigate = useNavigate();
  const [isReseted, setIsReseted] = useState<boolean>(false);

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
    setFiltersQuantity(countActiveKeys(getFilters()));
    router.push({
      pathname: '/games/search',
    });
  };

  const cancelButton = () => {
    setIsReseted(true);
    const newFilters = getFilters();
    newFilters.categories = [];
    newFilters.providers = [];
    newFilters.is_game_avail_for_bonus = false;
    setFilters(newFilters);
    setWithBonuses(false);
    setTimeout(() => {
      setIsReseted(false);
    }, 1);
    // setIsReseted(false);
    //
    return;
    navigate(-1);
  };

  hidePreloader();

  // TODO: добавить крестик ( go back button)
  const template = (
    <div className={styles.container}>
      <div className={styles.title}>Фильтр и сортировка</div>
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
        <Button elType="outlined" onClick={cancelButton}>
          Сбросить
        </Button>
        <Button onClick={applyFilters}>Применить</Button>
      </div>
    </div>
  );
  // TODO: или исправить чтобы ререндерилось норм или сделать какую то херь чтобы показало по середине экрана что очистило ( но конечно колхоз ) (setIsReseted)
  // хотя вроде и так работает конечно, но это немного колхозный вариант, подумай в общем
  if (!isReseted) {
    return template;
  }
  return (
    <>
      <div className={styles.loader_container}>{/* <Loader /> */}</div>
      {template}
    </>
  );
};

export default Filter;
