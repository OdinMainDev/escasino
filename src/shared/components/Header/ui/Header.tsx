'use client';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { ChatIcon, FilterIcon } from './Icons';
import { useRouter } from '@/shared/helpers/navigation';
import GoBackButton from '../../GoBackButton';
import Input from '../../Input';

const Header = () => {
  const [filterVal, setFilterVal] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setFilterVal('');
  }, []);

  const openModal = () => {
    // TODO: сделать страницу с сортировкой ( вместо модалки )
    router.push({
      pathname: '/games/filter',
    });
  };

  const searchGames = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && filterVal.length > 0) {
      router.push({
        pathname: '/games/search',
        query: {
          query: filterVal,
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <GoBackButton className={styles.back} />
        <Input
          placeholder="Поиск игры"
          elType="search"
          onKeyDown={searchGames}
          containerClassName={styles.input}
          elSize="s"
          value={filterVal}
          onChange={(e) => setFilterVal(() => e.target.value)}
        />
        <div className={styles.icons_list}>
          <div className={styles.icon} onClick={openModal}>
            <FilterIcon quantity={0} />
          </div>
          <ChatIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
