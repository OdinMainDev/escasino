import React, { KeyboardEvent, useRef, useState } from 'react';

import styles from './MainHeader.module.scss';
import FilterIcon from './FilterIcon';
import ChatIcon from './ChatIcon';

import { usePathname, useRouter } from '@/shared/helpers/navigation';
import Input from '@/shared/ui/Input';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';
import { useTranslation } from 'react-i18next';
import { FilterModal } from '@/features/FilterModal';
import { TabItem } from '@/entities/TabItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useEffect } from 'react';
import { getSearchQuery } from '@/shared/helpers/location';
import { useAppSelector } from '@/store/hooks/redux';
import { useCurrentLanguage } from '@/app/providers/LangProvider';


type HeaderProps = {
  hasNotSearch?: boolean;
  hasTitle?: string;
};

const MainHeader = ({ hasNotSearch, hasTitle }: HeaderProps) => {
  const { t } = useTranslation();
  const currentLanguage = useCurrentLanguage();
  const { categories } = useAppSelector((state) => state.gameCategoriesReducer);

  const { getFilters, countActiveKeys, setFilters } = useGamesFilters();
  const [filterVal, setFilterVal] = useState<string>(getFilters().query);
  const router = useRouter();
  const pathname = usePathname();
  const [openFilter, setOpenFilter] = useState(false);
  const timer = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(() => {

    const query = getSearchQuery();
    if (query) {
      setFilterVal(query);
    }


  }, []);


  const clickFilter = () => {
    setOpenFilter(true);
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

  const availKeys = countActiveKeys(getFilters()) + (getSearchQuery() ? 1 : 0);

  const onSearchHandler = (value: string) => {
    setFilterVal(value);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setFilters({ ...getFilters(), query: value });
      if (value.length >= 3) {
        router.push({
          pathname: '/games/search',
          query: {
            query: value,
          },
        });
      } else if (countActiveKeys(getFilters()) + value.length === 0) {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        router.replace('/');
      }
    }, 1000);
  };

  const closeFilterModal = () => {
    setOpenFilter(false);
  };

  const deleteFilter = (value: string) => {
    const newCatgeories = getFilters().categories.filter((item) => item != value);
    setFilters({ ...getFilters(), categories: newCatgeories });
  };

  const deleteFilterBonus = () => {
    setFilters({ ...getFilters(),  is_game_avail_for_bonus: false})
  }


  const getCategoryName = (categoryUrl: string) => {

    if (!categories){
      return categoryUrl;
    }

    const category = categories.find(item => item.url === categoryUrl);


    if (category) {
      const textObj = category.data.texts.find(
        text => text.language.toLowerCase() === currentLanguage.toLowerCase()
      );

      if (textObj) {
        return textObj.value;
      }    

    }

    return categoryUrl;
  };

  const clearSearch = () => {
    setFilterVal('');
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setFilters({ ...getFilters(), query: '' });
      if (countActiveKeys(getFilters()) === 0) {
        router.replace('/');
      } else {
        router.push({
          pathname: '/games/search',
          query: {
            query: '',
          },
        });
      }
    }, 1000);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {!hasNotSearch && (
            <Input
              withoutLabel
              placeholder={t('findGames')}
              elType="search"
              icon={
                <div onClick={clickFilter}>
                  <FilterIcon quantity={availKeys} />
                </div>
              }
              onKeyDown={searchGames}
              containerClassName={styles.input}
              value={filterVal}
              onClear={clearSearch}
              onChange={(e) => onSearchHandler(e.target.value)}
            />
          )}
          {hasTitle && <div className={styles.title}>{hasTitle}</div>}
          <div className={styles.icons_list}>
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
        {(getFilters().categories.length > 0 || getFilters().is_game_avail_for_bonus) && (
          <Swiper
            modules={[FreeMode]}
            slidesPerView="auto"
            spaceBetween={10}
            freeMode={true}
            className={styles.slider}
          >
            {getFilters().categories.map((item, index) => (
              <SwiperSlide className="w-auto" key={index}>
                <TabItem className="flex items-center gap-[16px]">
                  {getCategoryName(item)}
                  <div onClick={() => deleteFilter(item)}>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1L1 9M1 1L9 9"
                        stroke="#A1A1AA"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </TabItem>
              </SwiperSlide>
            ))}
            {getFilters().is_game_avail_for_bonus && (
              <SwiperSlide className="w-auto">
                <TabItem className="flex items-center gap-[16px]">
                  {t('collectBonus')}
                  <div onClick={() => deleteFilterBonus()}>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1L1 9M1 1L9 9"
                        stroke="#A1A1AA"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </TabItem>
              </SwiperSlide>
            )}
          </Swiper>
        )}

      </div>
      <FilterModal isOpen={openFilter} close={closeFilterModal} />
    </>
  );
};

export default MainHeader;
