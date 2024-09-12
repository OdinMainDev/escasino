import { useRef } from 'react';
import styles from './BonusesList.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import Loader from '@/shared/ui/Loader';
import { BonusesItem } from '@/entities/BonusesItem';
import Tabs, { ITab } from '@/entities/Tabs';
import { useEffect, useState } from 'react';
import { TabItem } from '@/entities/TabItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { BonusStatusesType, IBonus } from '@/shared/models/interfaces/bonuses';
import { tabs } from '../constants';
import { AlertModal } from '@/entities/AlertModal';
import { useModal } from '@/app/providers/ModalProvider';
import { PageHeader } from '@/widgets/Header';
import { getBonuses } from '@/store/slices/bonusesSlices';

const BonusesList = () => {
  const {
    bonuses: storeBonuses,
    loading,
    activeBonuses,
  } = useAppSelector((state) => state.bonusesSlice);
  const [bonuses, setBonuses] = useState<IBonus[]>([]);
  const [selectedTab, setSelectedTab] = useState<ITab>(tabs[0].tab);
  const [selectedFilter, setSelectedFilter] = useState<ITab>(tabs[0].filters[0]);
  const [filters, setFilters] = useState<ITab[]>(tabs[0].filters);
  const { doCloseModals } = useModal();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const prevBonusesLength = useRef(0);
  const [hasMoreBonuses, setHasMoreBonuses] = useState(true);

  const changeTab = (tab: ITab) => {
    setSelectedTab(tab);
    setPage(1);
    setBonuses([]);
    setIsFetching(false);
    setHasMoreBonuses(true);
    prevBonusesLength.current = 0;
    void dispatch(getBonuses({ completed: tab.value === 'true', page: 1 }));
    const selected = tabs.find((item) => item.tab.value === tab.value);
    console.log(selected);
    if (selected) {
      setFilters(selected.filters);
      setSelectedFilter(selected.filters[0]);
    }
  };

  const filterHandler = (selectedFilter: ITab) => {
    setSelectedFilter(selectedFilter);
    setPage(1);
    setBonuses([]);
    setIsFetching(false);
    setHasMoreBonuses(true);
    prevBonusesLength.current = 0;
    void dispatch(
      getBonuses({
        completed: selectedTab.value === 'true',
        page: 1,
        status: selectedFilter.value as unknown as BonusStatusesType,
      }),
    );
  };

  useEffect(() => {
    if (storeBonuses && storeBonuses.length > 0) {
      setBonuses(storeBonuses);
    } else if (storeBonuses && storeBonuses.length === 0 && page === 1) {
      setBonuses([]);
      setHasMoreBonuses(false);
    }
  }, [storeBonuses, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (
          storeBonuses &&
          storeBonuses.length > 2 &&
          lastEntry.isIntersecting &&
          !isFetching &&
          hasMoreBonuses &&
          storeBonuses.length > prevBonusesLength.current
        ) {
          prevBonusesLength.current = storeBonuses.length;
          setPage((prevPage) => prevPage + 1);
          setIsFetching(true);
          void dispatch(
            getBonuses({
              completed: selectedTab.value === 'true',
              status: selectedFilter.value as unknown as BonusStatusesType,
              page: page + 1,
            }),
          );
        } else if (storeBonuses && storeBonuses.length === prevBonusesLength.current) {
          setIsFetching(false);
        }
      },
      { threshold: 1.0 },
    );

    if (bonuses.length > 0) {
      const lastElement = document.querySelector('.bonuses-list:last-child');
      if (lastElement) {
        observer.observe(lastElement);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [bonuses, isFetching, storeBonuses, page, dispatch, selectedTab, hasMoreBonuses]);

  return (
    <div className={styles.container}>
      <PageHeader title="Спиок бонусов" />
      <Tabs
        className={styles.tabs}
        tabs={tabs.map((item) => item.tab)}
        value={selectedTab.value}
        onChange={changeTab}
      />
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        freeMode
        className={styles.filter}
        modules={[FreeMode]}
      >
        {filters.map((item, index) => (
          <SwiperSlide className="w-auto" key={index}>
            <TabItem
              selected={item.value === selectedFilter.value}
              onClick={() => filterHandler(item)}
            >
              {item.label}
            </TabItem>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.content}>
        {loading && page === 1 ? (
          <div className={styles.loader}>
            <Loader />
            <div>Загрузка бонусов...</div>
          </div>
        ) : bonuses && bonuses.length > 0 ? (
          bonuses.map((item) => <BonusesItem key={item.id} className="bonuses-list" bonus={item} />)
        ) : (
          <div className={styles.empty}>У вас нет бонусов</div>
        )}
      </div>
      {loading && page > 1 ? <Loader /> : null}
      {activeBonuses.length > 0 && (
        <AlertModal
          title="Отмените бонус"
          close={doCloseModals}
          buttons={[
            {
              text: 'Отменить',
              onClick: () => doCloseModals(),
              type: 'outlined',
            },
          ]}
          text={'Отмените один из активных бонусов прежде чем активировать этот'}
        />
      )}
    </div>
  );
};

export default BonusesList;
