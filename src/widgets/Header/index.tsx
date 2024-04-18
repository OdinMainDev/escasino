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
            onClear={() => setFilterVal('')}
            onChange={(e) => setFilterVal(() => e.target.value)}
          />
        )}

        {hasTitle && <div className={styles.title}>{hasTitle}</div>}
        <div className={styles.icons_list}>
          <div className={styles.icon} onClick={clickFilter}>
            <FilterIcon quantity={availKeys} />
          </div>
          <ChatIcon />
          <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
            <span className="elementor-toggle-icon-closed">
              <svg
                className="e-font-icon-svg e-fas-chevron-down"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
              </svg>
            </span>
            <span className="elementor-toggle-icon-opened">
              <svg
                className="elementor-toggle-icon-opened e-font-icon-svg e-fas-chevron-up"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path>
              </svg>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
