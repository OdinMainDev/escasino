import { useRouter } from '@/shared/helpers/navigation';
import styles from './FilterModal.module.scss';
import { useCallback, useState } from 'react';
import CategoriesList from './CategoriesList';
import ProviderList from './ProviderList';
import Button from '@/shared/ui/Button';
import Switch from '@/shared/ui/Switch';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';
import { useAppSelector } from '@/store/hooks/redux';
import { useTranslation } from 'react-i18next';
import Modal from '@/shared/ui/Modal';
import { IModal } from '@/shared/models/interfaces/modal';

const FilterModal = ({ isOpen, close }: IModal) => {
  const { t } = useTranslation();
  const { setFilters, getFilters, countActiveKeys } = useGamesFilters();
  const router = useRouter();
  const { categories } = useAppSelector((state) => state.gameCategoriesReducer);
  const { providers } = useAppSelector((state) => state.gameProvidersReducer);
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
          {categories && categories.length > 0 ? (
            <div className={styles.subtitle}>{t('gameType')}</div>
          ) : null}
          <CategoriesList selectCategory={selectCategory} />
        </div>
        <div className={styles.provider}>
          {providers && providers?.length > 0 && (
            <>
              {providers && providers.length > 0 ? (
                <div className={styles.subtitle}>{t('providers')}</div>
              ) : null}
              <ProviderList selectProvider={selectProvider} />
            </>
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.footer_wrapper}>
            <Button elType="outlined" onClick={resetFilter}>
              {t('reset')}
            </Button>
            <Button onClick={applyFilters} disabled={activeKeys === 0}>
              {t('apply')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
