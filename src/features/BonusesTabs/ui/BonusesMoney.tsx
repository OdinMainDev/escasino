import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '@/store/hooks/redux';
import { useTranslation } from 'react-i18next';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
  moneyChangeHandler: (id: number) => void;
  minAmount?: number;
  maxAmount?: number;
}

export interface IBonusMoneyMethods {
  clearBonusMoneySwiper: () => void;
}

const BonusesMoney = forwardRef<IBonusMoneyMethods, IProps>(
  ({ bonusesTemplates, moneyChangeHandler, minAmount, maxAmount }, ref) => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const moneySwiper = useRef<SwiperRef>(null);
    const cartBonuses = useAppSelector((state) => state.cartBonusesSlice.bonusesTemplates);
    const [sortedBonuses, setSortedBonuses] = useState<IBonusTemplate[]>([]);
    useImperativeHandle(ref, () => {
      return {
        clearBonusMoneySwiper,
      };
    });

    const clearBonusMoneySwiper = () => {
      if (moneySwiper.current) {
        moneySwiper.current.swiper?.slideTo(0, 0);
      }
      setActiveIndex(0);
    };

    useEffect(() => {
      let filteredTemplates = bonusesTemplates;
      // Скрываем элементы, если они есть в корзине и is_duplicatable = false
      filteredTemplates = filteredTemplates.filter(
        (template) =>
          !cartBonuses.some((cartItem) => cartItem.id === template.id && !cartItem.is_duplicatable),
      );

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

      const uniqueBonuses = filteredTemplates
        .reduce((acc: IBonusTemplate[], item: IBonusTemplate) => {
          if (item.bonus_percent > 0) {
            const existingIndex = acc.findIndex(
              (bonus) => bonus.bonus_percent === item.bonus_percent,
            );
            if (existingIndex === -1) {
              acc.push(item);
            } else if (acc[existingIndex].wager < item.wager) {
              acc[existingIndex] = item;
            }
          }
          return acc;
        }, [])
        .sort((a, b) => a.bonus_percent - b.bonus_percent);
      // setFiltredBonuses(filteredTemplates);
      setSortedBonuses(uniqueBonuses);
    }, [bonusesTemplates, cartBonuses, minAmount, maxAmount]);

    useEffect(() => {
      if (moneySwiper.current) {
        const middleIndex = Math.floor(sortedBonuses.length / 2);
        moneySwiper.current.swiper?.slideTo(middleIndex, 400);
        setActiveIndex(middleIndex);
      }
      if (sortedBonuses.length > 0) {
        void moneyChangeHandler(sortedBonuses[0].id);
      }
    }, [sortedBonuses]);

    const selectMoney = (swiper: SwiperClass | null) => {
      if (swiper) {
        const realIndex = swiper?.realIndex;
        if (sortedBonuses[realIndex]) {
          moneyChangeHandler(sortedBonuses[realIndex].id);
          setActiveIndex(realIndex);
        }
      }
    };

    if (sortedBonuses?.length === 0) {
      return <div className={styles.combination_empty}>{t('combinationsRunOut')}</div>;
    }

    return (
      <div>
        <div className={styles.settings_labels}>
          <div>{t('bonusPercent')}</div>
        </div>
        <div className={styles.settings_swiper}>
          <Swiper
            ref={moneySwiper}
            spaceBetween={12}
            effect="coverflow"
            slidesPerView={sortedBonuses.length >= 5 ? 5 : sortedBonuses.length}
            centeredSlides
            lazyPreloadPrevNext={5}
            className={styles.settings_params}
            loop={false}
            freeMode
            direction="vertical"
            onSwiper={selectMoney}
            onSlideChange={selectMoney}
          >
            {sortedBonuses.map((item, index) => (
              <SwiperSlide
                className={classNames(styles.settings_data, {
                  [styles.active]: activeIndex === index,
                })}
                key={item.id}
              >
                {item.bonus_percent} %
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  },
);

export default BonusesMoney;
