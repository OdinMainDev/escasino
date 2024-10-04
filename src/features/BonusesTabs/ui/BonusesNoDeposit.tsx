import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '@/store/hooks/redux';
import { ITab } from '@/entities/Tabs';
import { TabItem } from '@/entities/TabItem';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
  selectNoDepositBonus: (id: number) => void;
  gameId?: number;
  minAmount?: number;
  maxAmount?: number;
}

export interface IBonusFSMethods {
  clearBonusFSSwiper: () => void;
}

const BonusesNoDeposit = forwardRef<IBonusFSMethods, IProps>(
  ({ bonusesTemplates, selectNoDepositBonus, gameId, minAmount, maxAmount }, ref) => {
    const tabs: ITab[] = [
      {
        label: 'Макс FS',
        value: 'fs',
      },
    ];
    const [selectedSpinsIndex, setSelectedSpinsIndex] = useState<number>(0);
    const [selectedTabs, setSelectedTabs] = useState<ITab[]>([]);
    const [spinsTemplates, setSpinsTemplates] = useState<IBonusTemplate[]>([]);
    const cartBonuses = useAppSelector((state) => state.cartBonusesSlice.bonusesTemplates);
    const spinsSwiper = useRef<SwiperRef>(null);

    useImperativeHandle(ref, () => {
      return {
        clearBonusFSSwiper,
      };
    });

    const selectMaxValue = (templates: IBonusTemplate[]) => {
      const maxIndex = templates.length - 1;
      if (spinsSwiper.current) {
        spinsSwiper.current.swiper?.slideToLoop(maxIndex, 400);
      }
    };

    const unSelectMaxValue = (tab: ITab) => {
      setSelectedTabs((prev) => prev.filter((item) => item.value !== tab.value));
    };

    useEffect(() => {
      const selectedTab = tabs[0];
      if (spinsTemplates.length - 1 === selectedSpinsIndex) {
        if (!selectedTabs.find((item) => item.value === selectedTab.value)) {
          setSelectedTabs((prev) => [...prev, selectedTab]);
        }
      } else {
        unSelectMaxValue(selectedTab);
      }
    }, [selectedSpinsIndex, spinsTemplates]);

    const clearBonusFSSwiper = () => {
      if (spinsSwiper.current) {
        spinsSwiper.current.swiper?.slideToLoop(0, 0);
      }
      setSelectedSpinsIndex(0);
      setSpinsTemplates([]);
    };

    useEffect(() => {
      let filteredTemplates = bonusesTemplates;
      // Скрываем элементы, если они есть в корзине и is_duplicatable = false
      filteredTemplates = filteredTemplates.filter(
        (template) =>
          !cartBonuses.some((cartItem) => cartItem.id === template.id && !cartItem.is_duplicatable),
      );

      // Фильтруем по gameId, если он указан
      if (gameId !== undefined) {
        filteredTemplates = filteredTemplates.filter((template) =>
          template.game_ids.includes(gameId),
        );
      }

      // Фильтруем по minAmount, если он указан
      if (minAmount !== undefined && minAmount > 0) {
        filteredTemplates = filteredTemplates.filter(
          (template) =>
            template.bonus_settings.min_amount == 0 ||
            template.bonus_settings.min_amount <= minAmount,
        );
      }

      // Фильтруем по maxAmount, если он указан
      if (maxAmount !== undefined && maxAmount > 0) {
        filteredTemplates = filteredTemplates.filter(
          (template) =>
            template.bonus_settings.max_amount == 0 ||
            template.bonus_settings.max_amount >= maxAmount,
        );
      }

      // Уникальные количества FS с учетом большего значения wager
      const uniqueSpinsTemplates = filteredTemplates
        .reduce((acc, template) => {
          const existing = acc.find((item) => item.spins_count === template.spins_count);
          if (existing) {
            if (existing.wager < template.wager) {
              acc = acc.filter((item) => item.spins_count !== template.spins_count);
              acc.push(template);
            }
          } else {
            acc.push(template);
          }
          return acc;
        }, [] as IBonusTemplate[])
        .sort((a, b) => a.spins_count - b.spins_count);

      setSpinsTemplates(uniqueSpinsTemplates);
    }, [bonusesTemplates, cartBonuses, gameId, minAmount, maxAmount]);

    const selectSpins = (swiper: SwiperClass | null) => {
      if (swiper) {
        const realIndex = swiper.realIndex;
        setSelectedSpinsIndex(realIndex);
        selectNoDepositBonus(spinsTemplates[realIndex].id);
      }
    };

    if (spinsTemplates?.length === 0) {
      return <div className={styles.title}>К сожалению доступные комбинации закончились</div>;
    }

    return (
      <div>
        <div className={styles.settings_title}>Настройки бонуса</div>
        <div className={styles.settings_tabs}>
          {tabs.map((item, index) => (
            <TabItem
              selected={!!selectedTabs.find((selected) => selected.value === item.value)}
              onClick={() => {
                selectMaxValue(spinsTemplates);
              }}
              key={index}
            >
              {item.label}
            </TabItem>
          ))}
        </div>

        <div className={styles.settings_labels}>
          <div>Кол-во FS</div>
        </div>
        <div className={styles.settings_swiper}>
          <Swiper
            ref={spinsSwiper}
            spaceBetween={12}
            effect="coverflow"
            slidesPerView={5}
            centeredSlides
            slideToClickedSlide
            className={styles.settings_params}
            lazyPreloadPrevNext={2}
            loop={false}
            direction="vertical"
            onSlideChange={(swiper) => selectSpins(swiper)}
          >
            {spinsTemplates.map((item, index) => (
              <SwiperSlide
                className={classNames(styles.settings_data, {
                  [styles.active]: selectedSpinsIndex === index,
                })}
                key={index}
              >
                {item.spins_count}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  },
);

export default BonusesNoDeposit;
