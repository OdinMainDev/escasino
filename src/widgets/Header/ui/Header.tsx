'use client';

import { memo, useState } from 'react';

import Input from '@/shared/ui/Input';
import styles from './Header.module.scss';
import { ChatIcon, FilterIcon, UserIcon } from './Icons';
import GoBackButton from '@/shared/ui/GoBackButton';
import FilterModal from '@/features/FilterModal';

const Header = memo(() => {
  const [openFilter, setOpenFilter] = useState<boolean>(true);
  const containerStyles = {
    backgroundColor: `#${process.env.HEADER_COLOR}`,
  };

  const openModal = () => {
    setOpenFilter(true);
  };

  const closeModal = () => {
    setOpenFilter(false);
  };

  return (
    <div className={styles.container} style={containerStyles}>
      <div className={styles.search}>
        {/* <GoBackButton className={styles.back} /> */}
        <Input placeholder="Поиск игры" elType="search" className={styles.input} elSize="s" />
        {/* <UserIcon /> */}
        <div className={styles.icons_list}>
          <div className={styles.icon} onClick={openModal}>
            <FilterIcon />
          </div>
          <ChatIcon />
        </div>
      </div>
      <FilterModal isOpen={openFilter} close={closeModal} />
      {/* <ProvidersList /> */}
    </div>
  );
});

export default Header;
