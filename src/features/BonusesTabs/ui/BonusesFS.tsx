import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '@/store/hooks/redux';
import { removeDuplicatesByBet, removeDuplicatesBySpinsCount } from '../helpers/removeDuplicates';
import { ITab } from '@/entities/Tabs';
import { TabItem } from '@/entities/TabItem';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
  fsChangeHandler: (betTemplateId: number) => void;
  gameId?: number;
  minAmount?: number;
  maxAmount?: number;
}

export interface IBonusFSMethods {
  clearBonusFSSwiper: () => void;
}

const BonusesFS = forwardRef<IBonusFSMethods, IProps>(
  ({ bonusesTemplates, fsChangeHandler, gameId, minAmount, maxAmount }, ref) => {
    const tabs: ITab[] = [
      {
        label: 'Макс FS',
        value: 'fs',
      },
      {
        label: 'Макс ставка',
        value: 'bet',
      },
    ];
    const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
    const [selectedSpinsIndex, setSelectedSpinsIndex] = useState<number>(0);
    const [selectedTabs, setSelectedTabs] = useState<ITab[]>([]);
    const [betTemplates, setBetTemplates] = useState<IBonusTemplate[]>([]);
    const [filtredBonuses, setFiltredBonuses] = useState<IBonusTemplate[]>([]);
    const [spinsTemplates, setSpinsTemplates] = useState<IBonusTemplate[]>([]);
    const cartBonuses = useAppSelector((state) => state.cartBonusesSlice.bonusesTemplates);
    const betSwiper = useRef<SwiperRef>(null);
    const spinsSwiper = useRef<SwiperRef>(null);

    useImperativeHandle(ref, () => {
      return {
        clearBonusFSSwiper,
      };
    });

    const selectMaxValue = (newTab: ITab) => {
      if (newTab.value === 'bet' && betSwiper.current) {
        const maxIndex = betTemplates.length - 1;
        betSwiper.current.swiper?.slideToLoop(maxIndex, 400);
      } else if (spinsSwiper.current && newTab.value === 'fs') {
        const maxIndex = spinsTemplates.length - 1;
        spinsSwiper.current.swiper?.slideToLoop(maxIndex, 400);
      }
      if (!selectedTabs.find((item) => item.value === newTab.value)) {
        setSelectedTabs((prev) => [...prev, newTab]);
      }
    };

    const unSelectMaxValue = (tab: ITab) => {
      setSelectedTabs((prev) => prev.filter((item) => item.value !== tab.value));
    };

    useEffect(() => {
      const selectedTab = tabs[1];
      if (betTemplates.length - 1 === selectedBetIndex) {
        if (!selectedTabs.find((item) => item.value === selectedTab.value)) {
          setSelectedTabs((prev) => [...prev, selectedTab]);
        }
      } else {
        unSelectMaxValue(selectedTab);
      }
    }, [selectedBetIndex]);

    useEffect(() => {
      const selectedTab = tabs[0];
      if (spinsTemplates.length - 1 === selectedSpinsIndex) {
        if (!selectedTabs.find((item) => item.value === selectedTab.value)) {
          setSelectedTabs((prev) => [...prev, selectedTab]);
        }
      } else {
        unSelectMaxValue(selectedTab);
      }
    }, [selectedSpinsIndex]);

    const clearBonusFSSwiper = () => {
      if (betSwiper.current) {
        betSwiper.current.swiper?.slideToLoop(0, 0);
      }
      if (spinsSwiper.current) {
        spinsSwiper.current.swiper?.slideToLoop(0, 0);
      }
      setSelectedBetIndex(0);
      setSelectedSpinsIndex(0);
      setBetTemplates([]);
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

      // Уникальные ставки с учетом большего значения wager
      const uniqueBetTemplates = filteredTemplates
        .reduce((acc, template) => {
          const existing = acc.find(
            (item) => item.configurator.bet_amount === template.configurator.bet_amount,
          );
          if (existing) {
            if (existing.wager < template.wager) {
              acc = acc.filter(
                (item) => item.configurator.bet_amount !== template.configurator.bet_amount,
              );
              acc.push(template);
            }
          } else {
            acc.push(template);
          }
          return acc;
        }, [] as IBonusTemplate[])
        .sort((a, b) => a.configurator.bet_amount - b.configurator.bet_amount);

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

      setFiltredBonuses(filteredTemplates);
      if ((uniqueBetTemplates.length > 0, uniqueSpinsTemplates.length > 0)) {
        const findedTemplate = filteredTemplates.find(
          (item) =>
            item.configurator.bet_amount === uniqueBetTemplates[0].configurator.bet_amount &&
            item.spins_count === uniqueSpinsTemplates[0].spins_count,
        );
        if (findedTemplate) {
          fsChangeHandler(findedTemplate.id);
        }
      }

      setBetTemplates(uniqueBetTemplates);
      setSpinsTemplates(uniqueSpinsTemplates);
    }, [bonusesTemplates, cartBonuses, gameId, minAmount, maxAmount]);

    const selectBet = (swiper: SwiperClass | null) => {
      if (swiper) {
        const realIndex = swiper.realIndex;
        setSelectedBetIndex(realIndex);
        const selectedBetTemplate = betTemplates[realIndex];
        const selectedFsTemplates = removeDuplicatesBySpinsCount(
          filtredBonuses.filter(
            (item) => item.configurator.bet_amount === selectedBetTemplate.configurator.bet_amount,
          ),
        );
        let mainIndex = 0;
        if (!selectedFsTemplates[selectedSpinsIndex]) {
          setSelectedSpinsIndex(0);
          if (spinsSwiper.current) {
            spinsSwiper.current.swiper?.slideToLoop(0, 0, false);
          }
        } else {
          mainIndex = selectedSpinsIndex;
        }

        if (selectedBetTemplate && selectedFsTemplates[mainIndex]) {
          setSpinsTemplates(selectedFsTemplates);
          const matchingTemplate = filtredBonuses.find(
            (template) =>
              template.configurator.bet_amount === selectedBetTemplate.configurator.bet_amount &&
              template.spins_count === selectedFsTemplates[mainIndex].spins_count,
          );
          if (matchingTemplate) {
            fsChangeHandler(matchingTemplate.id);
          }
        }
      }
    };

    const selectSpins = (swiper: SwiperClass | null) => {
      if (swiper) {
        const realIndex = swiper.realIndex;
        setSelectedSpinsIndex(realIndex);
        const selectedFsTemplate = spinsTemplates[realIndex];
        const selectedBetTemplates = removeDuplicatesByBet(
          filtredBonuses.filter((item) => item.spins_count === selectedFsTemplate.spins_count),
        );
        if (selectedBetTemplates[selectedBetIndex] && selectedFsTemplate) {
          const matchingTemplate = filtredBonuses.find(
            (template) =>
              template.configurator.bet_amount ===
                selectedBetTemplates[selectedBetIndex].configurator.bet_amount &&
              template.spins_count === selectedFsTemplate.spins_count,
          );
          if (matchingTemplate) {
            fsChangeHandler(matchingTemplate.id);
          }
        }
      }
    };

    useEffect(() => {
      if (betSwiper.current) {
        selectBet(betSwiper.current.swiper);
      }
    }, [betTemplates]);

    if (betTemplates?.length === 0 && spinsTemplates?.length === 0) {
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
                selectMaxValue(item);
              }}
              key={index}
            >
              {item.label}
            </TabItem>
          ))}
        </div>

        <div className={styles.settings_labels}>
          <div>Ставка</div>
          <div>Кол-во FS</div>
          <div>Сумма бонуса</div>
        </div>
        <div className={styles.settings_swiper}>
          <Swiper
            ref={betSwiper}
            spaceBetween={12}
            effect="coverflow"
            slidesPerView={5}
            centeredSlides
            className={styles.settings_params}
            lazyPreloadPrevNext={2}
            slideToClickedSlide
            loop={false}
            onSlideChange={(swiper) => selectBet(swiper)}
            direction="vertical"
          >
            {betTemplates.map((item, index) => (
              <SwiperSlide
                className={classNames(styles.settings_data, {
                  [styles.active]: selectedBetIndex === index,
                })}
                key={index}
              >
                {item.configurator.bet_amount}
              </SwiperSlide>
            ))}
          </Swiper>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 1L1 11M1 1L11 11"
              stroke="#95999D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H15M1 7H15"
              stroke="#95999D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            className={styles.settings_input}
            value={
              betTemplates.length > 0 &&
              spinsTemplates.length > 0 &&
              spinsTemplates[selectedSpinsIndex] &&
              betTemplates[selectedBetIndex]
                ? betTemplates[selectedBetIndex].configurator.bet_amount *
                  spinsTemplates[selectedSpinsIndex].spins_count
                : 0
            }
            readOnly
            disabled
          />
        </div>
      </div>
    );
  },
);

export default BonusesFS;
