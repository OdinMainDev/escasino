import { useRouter } from '@/shared/helpers/navigation';
import styles from './FilterModal.module.scss';
import { useCallback, useEffect, useState } from 'react';
import CategoriesList from './CategoriesList';
import ProviderList from './ProviderList';
import Button from '@/shared/ui/Button';
import Switch from '@/shared/ui/Switch';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { useTranslation } from 'react-i18next';
import Modal from '@/shared/ui/Modal';
import { IModal } from '@/shared/models/interfaces/modal';
import { getGameProviders } from '@/store/slices/gameProvidersSlice';
import { getGameCategories } from '@/store/slices/gameCategoriesSlice';

const FilterModal = ({ isOpen, close }: IModal) => {
  const { t } = useTranslation();
  const { setFilters, getFilters } = useGamesFilters();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.gameCategoriesReducer);
  const { providers } = useAppSelector((state) => state.gameProvidersReducer);
  const [selectedProviders, setSelectedProviders] = useState<string[]>(getFilters().providers);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(getFilters().categories);
  const [withBonuses, setWithBonuses] = useState<boolean>(getFilters().is_game_avail_for_bonus);

  useEffect(() => {
    void dispatch(getGameProviders());
    void dispatch(getGameCategories());
  }, []);

  useEffect(() => {
    setSelectedCategories(getFilters().categories);
  }, [getFilters().categories]);

  const selectCategory = (selectedCategory: string) => {
    const category = selectedCategories.find((item) => item === selectedCategory);
    if (!category) {
      setSelectedCategories((prev) => [...prev, selectedCategory]);
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== selectedCategory));
    }
  };

  const selectProvider = useCallback((selectedProvider: string) => {
    const provider = selectedProviders.find((item) => item === selectedProvider);
    if (!provider) {
      setSelectedProviders((prev) => [...prev, selectedProvider]);
    } else {
      setSelectedProviders((prev) => prev.filter((item) => item !== selectedProvider));
    }
  }, []);

  const applyFilters = () => {
    const newFilters = getFilters();
    router.push({
      pathname: '/games/search',
      query: {
        query: newFilters.query,
      },
    });
    newFilters.categories = selectedCategories;
    newFilters.providers = selectedProviders;
    newFilters.is_game_avail_for_bonus = withBonuses;
    setFilters(newFilters);
    if (close) close();
  };

  const resetFilter = () => {
    const newFilters = getFilters();
    newFilters.categories = [];
    newFilters.providers = [];
    newFilters.is_game_avail_for_bonus = false;
    setFilters(newFilters);
    setWithBonuses(false);
    setSelectedCategories([]);
    setSelectedProviders([]);
    if (close) close();
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <div className="flex items-center justify-between">
          <div className={styles.title}>{t('filterAndSort')}</div>
        </div>
        <div className={styles.bonus}>
          <div className={styles.bonus_info}>
            <div className={styles.subtitle}>{t('collectBonus')}</div>
            <div className={styles.bonus_subtitle}>{t('gameWithCreateBonus')}</div>
          </div>
          <div className={styles.bonus_active}>
            <Switch
              isToggled={withBonuses}
              onToggle={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = e.target.checked;
                setWithBonuses(val);
              }}
            />
          </div>
        </div>
        <div className={styles.type}>
          {categories && categories.length > 0 ? (
            <div className={styles.subtitle}>{t('gameType')}</div>
          ) : null}
          <CategoriesList selectedCategories={selectedCategories} selectCategory={selectCategory} />
        </div>
        <div className={styles.provider}>
          {providers && providers?.length > 0 && (
            <>
              {providers && providers.length > 0 ? (
                <div className={styles.subtitle}>{t('providers')}</div>
              ) : null}
              <ProviderList selectedProviders={selectedProviders} selectProvider={selectProvider} />
            </>
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.footer_wrapper}>
            <Button elType="outlined" onClick={resetFilter}>
              {t('reset')}
            </Button>
            <Button
              onClick={applyFilters}
              disabled={
                selectedCategories.length + selectedProviders.length + Number(withBonuses) === 0
              }
            >
              {t('apply')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
