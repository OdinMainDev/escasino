import styles from './BonusesList.module.scss';
import { useAppSelector } from '@/store/hooks/redux';
import Loader from '@/shared/ui/Loader';
import { BonusesItem } from '@/entities/BonusesItem';
import Tabs, { ITab } from '@/entities/Tabs';
import { useCallback, useEffect, useState } from 'react';
import { TabItem } from '@/entities/TabItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { IBonus } from '@/shared/models/interfaces/bonuses';
import { tabs } from '../constants';
import { AlertModal } from '@/entities/AlertModal';
import { useModal } from '@/app/providers/ModalProvider';
import { PageHeader } from '@/widgets/Header';

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
