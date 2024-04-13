'use client';
import React, { KeyboardEvent, useState } from 'react';

import styles from './styles.module.scss';
import FilterIcon from './ui/FilterIcon';
import ChatIcon from './ui/ChatIcon';

import { usePathname, useRouter } from '@/shared/helpers/navigation';
import GoBackButton from '@/shared/ui/GoBackButton';
import Input from '@/shared/ui/Input';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';

type HeaderProps = {
  hasNotSearch?: boolean;
  hasTitle?: string;
};

const Header = ({ hasNotSearch, hasTitle }: HeaderProps) => {
  const { getFilters, countActiveKeys } = useGamesFilters();
  const [filterVal, setFilterVal] = useState<string>(getFilters().query);
  const router = useRouter();
  const pathname = usePathname();

  const clickFilter = () => {
    router.push({
      pathname: '/games/filter',
    });
  };

  // TODO: сделать кнопку поиска ( иконку лупу ) нажимаемой
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

  const availKeys = countActiveKeys(getFilters());

  // TODO: исправить чтобы показывалось FilterIcon quantity ( функцию вычисления напишу потом сам countActiveKeys, просто пусть она 5 выводит и все, или рандом от 0 до 5)
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <GoBackButton className={styles.back} customPath="/" />
        {!hasNotSearch && (
          <Input
            placeholder="Поиск игры"
            elType="search"
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
