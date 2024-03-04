'use client';

import { KeyboardEvent, useEffect, useState } from 'react';

import Input from '@/shared/ui/Input';
import styles from './Header.module.scss';
import { ChatIcon, FilterIcon } from './Icons';
import GoBackButton from '@/shared/ui/GoBackButton';
import FilterModal from '@/features/FilterModal';
import { usePathname, useRouter } from '@/shared/hooks/navigation';
import { useSearchParams } from 'next/navigation';
import { IFilter } from '@/shared/models/interfaces/filter';

const Header = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [filterQuantity, setFilterQuantity] = useState<number>(0);
  const searchParams = useSearchParams();
  const [filter, setFilters] = useState<IFilter>({
    categories: searchParams.getAll('categories[]') ?? [],
    providers: searchParams.getAll('providers[]') ?? [],
    is_game_avail_for_bonus: searchParams.get('is_game_avail_for_bonus') == 'true' ?? false,
    distinct_filters: true,
    query: searchParams.get('query') ?? '',
  });
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setFilters({
      categories: searchParams.getAll('categories[]') ?? [],
      providers: searchParams.getAll('providers[]') ?? [],
      is_game_avail_for_bonus: searchParams.get('is_game_avail_for_bonus') == 'true' ?? false,
      distinct_filters: true,
      query: searchParams.get('query') ?? '',
    });
  }, [searchParams]);

  const openModal = () => {
    document.body.classList.add('overflow-hidden');
    setOpenFilter(true);
  };

  const closeModal = () => {
    document.body.classList.remove('overflow-hidden');
    setOpenFilter(false);
  };

  const searchGames = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        {'/' !== pathname && <GoBackButton className={styles.back} />}
        <Input
          placeholder="Поиск игры"
          elType="search"
          onKeyDown={searchGames}
          containerClassName={styles.input}
          elSize="s"
          value={filter.query}
          onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
        />
        <div className={styles.icons_list}>
          <div className={styles.icon} onClick={openModal}>
            <FilterIcon quantity={filterQuantity} />
          </div>
          <ChatIcon />
        </div>
      </div>
      <FilterModal isOpen={openFilter} close={closeModal} setFilterQuantity={setFilterQuantity} />
    </div>
  );
};

export default Header;
