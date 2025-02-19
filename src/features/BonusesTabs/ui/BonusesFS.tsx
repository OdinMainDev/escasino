import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '@/store/hooks/redux';
import { ITab } from '@/entities/Tabs';
import { TabItem } from '@/entities/TabItem';
import { removeDuplicatesByBet, removeDuplicatesBySpinsCount } from '../helpers/removeDuplicates';
import { useTranslation } from 'react-i18next';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
  fsChangeHandler: (betTemplateId: number | undefined) => void;
  gameId?: number;
  minAmount?: number;
  maxAmount?: number;
  isNoDeposit?: boolean;
}

export interface IBonusFSMethods {
  clearBonusFSSwiper: () => void;
}

const BonusesFS = forwardRef<IBonusFSMethods, IProps>(
  ({ bonusesTemplates, fsChangeHandler, gameId, minAmount, maxAmount, isNoDeposit }, ref) => {
    const { t } = useTranslation();
    const tabs: ITab[] = [
      {
        label: t('maxBet'),
        value: 'bet',
      },
      {
        label: t('maxFS'),
        value: 'fs',
      },
    ];
    const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
    const [selectedSpinsIndex, setSelectedSpinsIndex] = useState<number>(0);
    const [selectedTabs, setSelectedTabs] = useState<ITab[]>([]);
    const [filtredBonuses, setFiltredBonuses] = useState<IBonusTemplate[]>([]);
    const [betTemplates, setBetTemplates] = useState<IBonusTemplate[]>([]);
    const [spinsTemplates, setSpinsTemplates] = useState<IBonusTemplate[]>([]);
    const isBonusScrollAllTemplates = import.meta.env.VITE_BONUS_SCROLL_TYPE === 'all';
    const cartBonuses = useAppSelector((state) => state.cartBonusesSlice.bonusesTemplates);
    const betSwiper = useRef<SwiperRef>(null);
    const spinsSwiper = useRef<SwiperRef>(null);
    const isProgrammaticChange = useRef(false);
    const isProgrammaticChangeFS = useRef(false);
    const [selectedTemplate, setSelectedTemplate] = useState<IBonusTemplate | null>(null);

    useImperativeHandle(ref, () => {
      return {
        clearBonusFSSwiper,
      };
    });

    const selectMaxValue = (newTab: ITab, templates: IBonusTemplate[]) => {
      const maxIndex = templates.length - 1;
      if (newTab.value === 'bet' && betSwiper.current) {
        betSwiper.current.swiper?.slideTo(maxIndex, 400);
      } else if (spinsSwiper.current && newTab.value === 'fs') {
        spinsSwiper.current.swiper?.slideTo(maxIndex, 400);
      }
      if (!selectedTabs.find((item) => item.value === newTab.value)) {
        setSelectedTabs((prev) => [...prev, newTab]);
      }
    };

    const clearBonusFSSwiper = () => {
      if (betSwiper.current) {
        betSwiper.current.swiper?.slideTo(0, 0);
      }
      if (spinsSwiper.current) {
        spinsSwiper.current.swiper?.slideTo(0, 0);
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
      if (minAmount !== undefined && minAmount > 0 && !isNoDeposit) {
        filteredTemplates = filteredTemplates.filter(
          (template) =>
            template.bonus_settings.min_amount == 0 ||
            template.bonus_settings.min_amount <= minAmount,
        );
      }

      // Фильтруем по maxAmount, если он указан
      if (maxAmount !== undefined && maxAmount > 0 && !isNoDeposit) {
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

      if ((uniqueBetTemplates.length > 0, uniqueSpinsTemplates.length > 0)) {
        const findedTemplate = filteredTemplates.find(
          (item) =>
            item.configurator.bet_amount === uniqueBetTemplates[0].configurator.bet_amount &&
            item.spins_count === uniqueSpinsTemplates[0].spins_count,
        );
        if (findedTemplate) {
          fsChangeHandler(findedTemplate.id);
          setSelectedTemplate(findedTemplate ?? null);
        }
      }
      // setUBetTemplates(uniqueBetTemplates);
      // setUSpinsTemplates(uniqueSpinsTemplates);
      setFiltredBonuses(filteredTemplates);
      setBetTemplates(uniqueBetTemplates);
      setSpinsTemplates(uniqueSpinsTemplates);
    }, [bonusesTemplates, cartBonuses, gameId, minAmount, maxAmount, isNoDeposit]);

    const selectBet = (swiper: SwiperClass | null) => {
      if (swiper) {
        if (isProgrammaticChangeFS.current) {
          isProgrammaticChangeFS.current = false;
          return;
        }

        const realIndex = swiper.realIndex;
        setSelectedBetIndex(realIndex);
        const selectedBetTemplate = betTemplates[realIndex];
        let mainIndex = selectedSpinsIndex;
        if (!isBonusScrollAllTemplates) {
          const combinationExists = filtredBonuses.find(
            (item) =>
              item.configurator.bet_amount === selectedBetTemplate?.configurator?.bet_amount &&
              item.spins_count === spinsTemplates[mainIndex]?.spins_count,
          );
          if (!combinationExists) {
            const selectedFsTemplates = removeDuplicatesBySpinsCount(
              filtredBonuses.filter(
                (item) =>
                  item.configurator.bet_amount === selectedBetTemplate.configurator.bet_amount,
              ),
            );
            const findedIndex = spinsTemplates.findIndex(
              (item) => item.spins_count === selectedFsTemplates[0].spins_count,
            );
            setSelectedSpinsIndex(findedIndex);
            mainIndex = findedIndex;
            if (spinsSwiper.current) {
              isProgrammaticChange.current = true;
              spinsSwiper.current.swiper?.slideTo(findedIndex, 400);
              setTimeout(() => {
                isProgrammaticChange.current = false;
              }, 1);
            }
          }
        }
        if (selectedBetTemplate && spinsTemplates[mainIndex]) {
          const matchingTemplate = filtredBonuses.find(
            (template) =>
              template.configurator.bet_amount === selectedBetTemplate.configurator.bet_amount &&
              template.spins_count === spinsTemplates[mainIndex]?.spins_count,
          );
          fsChangeHandler(matchingTemplate?.id);
          setSelectedTemplate(matchingTemplate ?? null);
        }

        if (realIndex === betTemplates.length - 1) {
          if (!selectedTabs.find((tab) => tab.value === 'bet')) {
            setSelectedTabs((prev) => [...prev, tabs.find((t) => t.value === 'bet')!]);
          }
        } else {
          setSelectedTabs((prev) => prev.filter((tab) => tab.value !== 'bet'));
        }
        if (mainIndex === spinsTemplates.length - 1) {
          if (!selectedTabs.find((tab) => tab.value === 'fs')) {
            setSelectedTabs((prev) => [...prev, tabs.find((t) => t.value === 'fs')!]);
          }
        } else {
          setSelectedTabs((prev) => prev.filter((tab) => tab.value !== 'fs'));
        }
      }
    };

    const selectSpins = (swiper: SwiperClass | null) => {
      if (swiper) {
        if (isProgrammaticChange.current) {
          isProgrammaticChange.current = false;
          return;
        }
        const realIndex = swiper.realIndex;
        setSelectedSpinsIndex(realIndex);
        const selectedFsTemplate = spinsTemplates[realIndex];
        let mainIndex = selectedBetIndex;
        if (!isBonusScrollAllTemplates) {
          const combinationExists = filtredBonuses.find(
            (item) =>
              item.configurator.bet_amount ===
                betTemplates[selectedBetIndex]?.configurator.bet_amount &&
              item.spins_count === selectedFsTemplate.spins_count,
          );
          if (!combinationExists) {
            const selectedBetTemplates = removeDuplicatesByBet(
              filtredBonuses.filter((item) => item.spins_count === selectedFsTemplate.spins_count),
            );
            const findedIndex = betTemplates.findIndex(
              (item) =>
                item.configurator.bet_amount === selectedBetTemplates[0]?.configurator.bet_amount,
            );
            setSelectedBetIndex(findedIndex);
            mainIndex = findedIndex;
            if (betSwiper.current) {
              isProgrammaticChangeFS.current = true;
              betSwiper.current.swiper?.slideTo(findedIndex, 400);
              setTimeout(() => {
                isProgrammaticChangeFS.current = false;
              }, 1);
            }
          }
        }
        if (betTemplates[mainIndex] && selectedFsTemplate) {
          const matchingTemplate = filtredBonuses.find(
            (template) =>
              template.configurator.bet_amount ===
                betTemplates[mainIndex]?.configurator.bet_amount &&
              template.spins_count === selectedFsTemplate.spins_count,
          );
          fsChangeHandler(matchingTemplate?.id);
          setSelectedTemplate(matchingTemplate ?? null);
        }

        if (realIndex === spinsTemplates.length - 1) {
          if (!selectedTabs.find((tab) => tab.value === 'fs')) {
            setSelectedTabs((prev) => [...prev, tabs.find((t) => t.value === 'fs')!]);
          }
        } else {
          setSelectedTabs((prev) => prev.filter((tab) => tab.value !== 'fs'));
        }
        if (mainIndex === betTemplates.length - 1) {
          if (!selectedTabs.find((tab) => tab.value === 'bet')) {
            setSelectedTabs((prev) => [...prev, tabs.find((t) => t.value === 'bet')!]);
          }
        } else {
          setSelectedTabs((prev) => prev.filter((tab) => tab.value !== 'bet'));
        }
      }
    };

    useEffect(() => {
      if (betSwiper.current && spinsSwiper.current) {
        const middleBetIndex = Math.floor(betTemplates.length / 2);
        betSwiper.current.swiper?.slideTo(middleBetIndex, 400);
        setSelectedBetIndex(middleBetIndex);

        const middleSpinsIndex = Math.floor(spinsTemplates.length / 2);
        spinsSwiper.current.swiper?.slideTo(middleSpinsIndex, 400);
        setSelectedSpinsIndex(middleSpinsIndex);

        const findedBonus = filtredBonuses.find(
          (item) =>
            item.configurator.bet_amount === betTemplates[middleBetIndex].configurator.bet_amount &&
            item.spins_count === spinsTemplates[middleSpinsIndex].spins_count,
        );

        if (findedBonus) {
          setSelectedTemplate(findedBonus);
        }
      }
    }, [betTemplates]);

    if (betTemplates?.length === 0 && spinsTemplates?.length === 0) {
      return <div className={styles.combination_empty}>{t('combinationsRunOut')}</div>;
    }
    return (
      <div>
        <div className={styles.settings_title}>{t('bonusSettings')}</div>
        <div className={styles.settings_tabs}>
          {tabs.map((item, index) => (
            <TabItem
              selected={!!selectedTabs.find((selected) => selected.value === item.value)}
              onClick={() => {
                selectMaxValue(item, item.value === 'bet' ? betTemplates : spinsTemplates);
              }}
              key={index}
            >
              {item.label}
            </TabItem>
          ))}
        </div>

        <div className={styles.settings_labels}>
          <div>{t('bet')}</div>
          <div>{t('FSQuantity')}</div>
          <div>{t('bonusSum')}</div>
        </div>
        <div
          className={classNames(styles.settings_swiper, {
            [styles.error]:
              !bonusesTemplates.find(
                (item) =>
                  item.configurator.bet_amount ===
                    betTemplates[selectedBetIndex]?.configurator.bet_amount &&
                  item.spins_count === spinsTemplates[selectedSpinsIndex]?.spins_count,
              ) && isBonusScrollAllTemplates,
            [styles.success]: bonusesTemplates.find(
              (item) =>
                item.configurator.bet_amount ===
                  betTemplates[selectedBetIndex]?.configurator.bet_amount &&
                item.spins_count === spinsTemplates[selectedSpinsIndex]?.spins_count,
            ),
          })}
        >
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
                  [styles.blocked]:
                    !bonusesTemplates.find(
                      (item) =>
                        item.configurator.bet_amount ===
                          betTemplates[selectedBetIndex]?.configurator.bet_amount &&
                        item.spins_count === spinsTemplates[selectedSpinsIndex]?.spins_count,
                    ) &&
                    selectedBetIndex === index &&
                    isBonusScrollAllTemplates,
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
            onSlideChange={(swiper) => selectSpins(swiper)}
            direction="vertical"
          >
            {spinsTemplates.map((item, index) => (
              <SwiperSlide
                className={classNames(styles.settings_data, {
                  [styles.active]: selectedSpinsIndex === index,
                  [styles.blocked]:
                    isBonusScrollAllTemplates &&
                    !bonusesTemplates.find(
                      (item) =>
                        item.configurator.bet_amount ===
                          betTemplates[selectedBetIndex]?.configurator.bet_amount &&
                        item.spins_count === spinsTemplates[selectedSpinsIndex]?.spins_count,
                    ) &&
                    selectedSpinsIndex === index,
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
          {isBonusScrollAllTemplates &&
          !bonusesTemplates.find(
            (item) =>
              item.configurator.bet_amount ===
                betTemplates[selectedBetIndex]?.configurator.bet_amount &&
              item.spins_count === spinsTemplates[selectedSpinsIndex]?.spins_count,
          ) ? (
            <div className={styles.cross}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1L1 11M1 1L11 11"
                  stroke="var(--error-secondary"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <input
              className={classNames(styles.settings_input)}
              value={
                selectedTemplate
                  ? selectedTemplate.configurator.bet_amount * selectedTemplate.spins_count
                  : 0
              }
              readOnly
              disabled
            />
          )}
        </div>
      </div>
    );
  },
);

export default BonusesFS;
