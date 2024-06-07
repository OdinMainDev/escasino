import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { useState, useMemo, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
  moneyChangeHandler: (id: number) => void;
}

export interface IBonusMoneyMethods {
  clearBonusMoneySwiper: () => void;
}

const BonusesMoney = forwardRef<IBonusMoneyMethods, IProps>(
  ({ bonusesTemplates, moneyChangeHandler }, ref) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const moneySwiper = useRef<SwiperRef>(null);

    useImperativeHandle(ref, () => {
      return {
        clearBonusMoneySwiper,
      };
    });

    const clearBonusMoneySwiper = () => {
      if (moneySwiper.current) {
        moneySwiper.current.swiper.slideTo(0, 0);
      }
      setActiveIndex(0);
    };

    const sortedBonuses = useMemo(() => {
      if (!bonusesTemplates || bonusesTemplates.length === 0) {
        return [];
      }

      const uniqueBonuses = bonusesTemplates.reduce(
        (acc: IBonusTemplate[], item: IBonusTemplate) => {
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
        },
        [],
      );

      return uniqueBonuses.sort((a, b) => a.bonus_percent - b.bonus_percent);
    }, [bonusesTemplates]);

    const selectMoney = useCallback(
      (swiper: SwiperClass) => {
        const selectedBonus = sortedBonuses[swiper.realIndex];
        if (selectedBonus) {
          moneyChangeHandler(selectedBonus.id);
          setActiveIndex(swiper.realIndex);
        }
      },
      [moneyChangeHandler, sortedBonuses],
    );

    if (sortedBonuses.length === 0) {
      return null;
    }

    return (
      <div>
        <div className={styles.settings_labels}>
          <div>% бонуса</div>
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
