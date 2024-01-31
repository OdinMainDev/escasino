import Modal from '@/shared/ui/Modal';
import styles from './FilterModal.module.scss';
import { IModal } from '@/shared/models/interfaces/modal';
import Switch from '@/shared/ui/Switch';
import ProviderList from './ProviderList';
import { useCallback, useEffect, useState } from 'react';
import { IFilter } from '@/shared/models/interfaces/filter';
import Button from '@/shared/ui/Button';
import CategoriesList from './CategoriesList';
import { usePathname, useRouter } from '@/shared/hooks/navigation';
import { useSearchParams } from 'next/navigation';
import { countActiveKeys } from '../helpers/countActiveKeys';

interface IProps extends IModal {
  setFilterQuantity: (value: number) => void;
}

const FilterModal = ({ isOpen, close, setFilterQuantity }: IProps) => {
  const searchParams = useSearchParams();
  const [filter, setFilters] = useState<IFilter>({
    categories: searchParams.getAll('categories[]') ?? [],
    providers: searchParams.getAll('providers[]') ?? [],
    is_game_avail_for_bonus: searchParams.get('is_game_avail_for_bonus') == 'true' ?? false,
    distinct_filters: true,
    query: searchParams.get('query') ?? '',
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setFilterQuantity(countActiveKeys(filter));
  }, []);

  const selectCategory = useCallback(
    (selectedCategory: string) => {
      const category = filter.categories.find((item) => item === selectedCategory);
      if (!category) {
        setFilters((prev) => ({
          ...prev,
          categories: [...prev.categories, selectedCategory],
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          categories: prev.categories.filter((item) => item !== selectedCategory),
        }));
      }
    },
    [filter],
  );

  const selectProvider = useCallback(
    (selectedProvider: string) => {
      const provider = filter.providers.find((item) => item === selectedProvider);
      if (!provider) {
        setFilters((prev) => ({
          ...prev,
          providers: [...prev.providers, selectedProvider],
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          providers: prev.providers.filter((item) => item !== selectedProvider),
        }));
      }
    },
    [filter],
  );

  const applyFilter = () => {
    if (close) {
      close();
    }
    setFilterQuantity(countActiveKeys(filter));
    router.push({
      pathname: '/games',
      query: {
        query: filter.query,
        'categories[]': filter.categories,
        'providers[]': filter.providers,
        is_game_avail_for_bonus: filter.is_game_avail_for_bonus,
        distinct_filters: filter.distinct_filters,
      },
    });
  };

  const cacel = () => {
    if (pathname !== '/') {
      const filter = {
        categories: [],
        providers: [],
        is_game_avail_for_bonus: false,
        distinct_filters: true,
        query: '',
      };
      setFilters(filter);
      router.push('/games');
    }
    if (close) {
      close();
    }
  };

  return (
    <Modal isOpen={isOpen} close={close} reRendering={false}>
      <div className={styles.container}>
        <div className={styles.title}>Фильтр и сортировка</div>
        <div className={styles.bonus}>
          <div className={styles.bonus_info}>
            <div className={styles.subtitle}>Собери бонус</div>
            <div className={styles.bonus_subtitle}>Игры с возможностью создать свой бонус</div>
          </div>
          <div className={styles.bonus_active}>
            <Switch
              isToggled={filter.is_game_avail_for_bonus}
              onToggle={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilters((prev) => ({ ...prev, is_game_avail_for_bonus: e.target.checked }))
              }
            />
          </div>
        </div>
        <div className={styles.type}>
          <div className={styles.subtitle}>Тип игры</div>
          <CategoriesList selectedCategories={filter.categories} selectCategory={selectCategory} />
        </div>
        <div className={styles.provider}>
          <div className={styles.subtitle}>Провайдеры</div>
          <ProviderList selectedProviders={filter.providers} selectProvider={selectProvider} />
        </div>
        <div className={styles.footer}>
          <Button elType="outlined" onClick={cacel}>
            Отменить
          </Button>
          <Button onClick={applyFilter}>Применить</Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
