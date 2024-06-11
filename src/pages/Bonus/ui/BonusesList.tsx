import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './BonusesList.module.scss';
import Icons from '@/shared/ui/Icons';
import { useAppSelector } from '@/store/hooks/redux';
import Loader from '@/shared/ui/Loader';
import { BonusesItem } from '@/entities/BonusesItem';
import Tabs, { ITab } from '@/entities/Tabs';
import { useCallback, useEffect, useState } from 'react';
import { TabItem } from '@/entities/TabItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { IBonus } from '@/shared/models/interfaces/bonuses';

interface IBonusTabs {
  tab: ITab;
  filters: ITab[];
}

const BonusesList = () => {
  const { bonuses: storeBonuses, loading } = useAppSelector((state) => state.bonusesSlice);
  const [bonuses, setBonuses] = useState<IBonus[]>([]);
  const tabs: IBonusTabs[] = [
    {
      tab: {
        label: 'Активные',
        value: 'current',
      },
      filters: [
        {
          label: 'Все',
          value: 0,
        },
        {
          label: 'Активные',
          value: 2,
        },
        {
          label: 'Не активные',
          value: 1,
        },
      ],
    },
    {
      tab: {
        label: 'История',
        value: 'history',
      },
      filters: [
        {
          label: 'Все',
          value: 0,
        },
        {
          label: 'Завершенный',
          value: 3,
        },
        {
          label: 'Отмененные',
          value: 4,
        },
        {
          label: 'Истекший',
          value: 5,
        },
      ],
    },
  ];
  const [selectedTab, setSelectedTab] = useState<ITab>(tabs[0].tab);
  const [selectedFilter, setSelectedFilter] = useState<ITab>(tabs[0].filters[0]);
  const [filters, setFilters] = useState<ITab[]>(tabs[0].filters);

  const changeTab = (tab: ITab) => {
    setSelectedTab(tab);
    const selected = tabs.find((item) => item.tab.value === tab.value);
    if (selected) {
      setFilters(selected.filters);
      filterHandler(selected.filters[0], selected.filters);
    }
  };

  const filterHandler = useCallback(
    (selectedFilter: ITab, filters: ITab[]) => {
      setSelectedFilter(selectedFilter);
      if (storeBonuses) {
        if (selectedFilter.value !== 0) {
          setBonuses(storeBonuses.filter((item) => item.status === selectedFilter.value));
        } else {
          const values = filters.map((item) => Number(item.value));
          setBonuses(storeBonuses.filter((item) => values.includes(item.status)));
        }
      }
    },
    [storeBonuses],
  );

  useEffect(() => {
    if (storeBonuses) {
      filterHandler(filters[0], filters);
    }
  }, [filterHandler, filters, storeBonuses]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton />
        <div className={styles.title}>Спиок бонусов</div>
        <Icons icon="chat" />
      </div>
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
              onClick={() => filterHandler(item, filters)}
            >
              {item.label}
            </TabItem>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loader}>
            <Loader />
            <div>Загрузка бонусов...</div>
          </div>
        ) : bonuses && bonuses.length > 0 ? (
          bonuses.map((item) => <BonusesItem key={item.id} bonus={item} />)
        ) : (
          <div className={styles.emplty}>У вас нет бонусов</div>
        )}
      </div>
    </div>
  );
};

export default BonusesList;
