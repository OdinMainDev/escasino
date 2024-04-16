'use client';
import React, { KeyboardEvent, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import FilterIcon from './ui/FilterIcon';
import ChatIcon from './ui/ChatIcon';

import { usePathname, useRouter } from '@/shared/helpers/navigation';
import GoBackButton from '@/shared/ui/GoBackButton';
import Input from '@/shared/ui/Input';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';
import Icons from '@/shared/ui/Icons';

type HeaderProps = {
  hasNotSearch?: boolean;
  hasTitle?: string;
};

const Header = ({ hasNotSearch, hasTitle }: HeaderProps) => {
  const { getFilters, countActiveKeys } = useGamesFilters();
  const [filterVal, setFilterVal] = useState<string>(getFilters().query);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setFilterVal(getFilters().query);
  }, [getFilters().query]);

  const clickFilter = () => {
    router.push({
      pathname: '/games/filter',
    });
  };

  const searchGames = (event: KeyboardEvent<HTMLInputElement>) => {
    if (hasNotSearch) {
      return;
    }
    if (event.key === 'Enter') {
      if (pathname == '/' && filterVal == '') {
        return;
      }
      router.push({
        pathname: '/games/search',
        query: {
          query: filterVal,
        },
      });
    }
  };

  const clickValue = () => {
    if (filterVal.trim() !== '') {
      router.push({
        pathname: '/games/search',
        query: {
          query: filterVal,
        },
      });
    }
  };

  const availKeys = countActiveKeys(getFilters());

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <GoBackButton className={styles.back} customPath="/" />
        {!hasNotSearch && (
          <Input
            placeholder="Поиск игры"
            icon={
              <div onClick={clickValue}>
                <Icons icon="search" />
              </div>
            }
            onKeyDown={searchGames}
            containerClassName={styles.input}
            elSize="s"
            value={filterVal}
            onChange={(e) => setFilterVal(() => e.target.value)}
          />
        )}

        {hasTitle && <div className={styles.title}>{hasTitle}</div>}
        <div className={styles.icons_list}>
          <div className={styles.icon} onClick={clickFilter}>
            <FilterIcon quantity={availKeys} />
          </div>
          <ChatIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
