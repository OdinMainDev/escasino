'use client';

import { useState } from 'react';

import Input from '@/shared/ui/Input';
import styles from './Header.module.scss';
import { ChatIcon, FilterIcon } from './Icons';
import GoBackButton from '@/shared/ui/GoBackButton';
import FilterModal from '@/features/FilterModal';
import { usePathname } from 'next/navigation';
import useLanguageFromUrl from '@/shared/hooks/laguage';

const Header = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [filterQuantity, setFilterQuantity] = useState<number>(0);
  const pathname = usePathname();
  const lang = useLanguageFromUrl();

  const containerStyles = {
    backgroundColor: `#${process.env.NEXT_PUBLIC_HEADER_COLOR}` ?? '#121212',
  };

  const openModal = () => {
    document.body.classList.add('overflow-hidden');
    setOpenFilter(true);
  };

  const closeModal = () => {
    document.body.classList.remove('overflow-hidden');
    setOpenFilter(false);
  };

  return (
    <div className={styles.container} style={containerStyles}>
      <div className={styles.search}>
        {`/${lang}` !== pathname && <GoBackButton className={styles.back} />}
        <Input
          placeholder="Поиск игры"
          elType="search"
          containerClassName={styles.input}
          elSize="s"
        />
        {/* <UserIcon /> */}
        <div className={styles.icons_list}>
          <div className={styles.icon} onClick={openModal}>
            <FilterIcon quantity={filterQuantity} />
          </div>
          <ChatIcon />
        </div>
      </div>
      <FilterModal isOpen={openFilter} close={closeModal} setFilterQuantity={setFilterQuantity} />
      {/* <ProvidersList /> */}
    </div>
  );
};

export default Header;
