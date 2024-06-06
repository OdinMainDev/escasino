import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { useState } from 'react';
import classNames from 'classnames';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
  moneyChangeHandler: (id: number) => void;
}
const BonusesMoney = ({ bonusesTemplates, moneyChangeHandler }: IProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  if (!bonusesTemplates) {
    return;
  }
  const sortedBonuses: IBonusTemplate[] = [];

  bonusesTemplates?.forEach((item) => {
    if (item.bonus_percent <= 0) {
      return;
    }
    const existingIndex = sortedBonuses.findIndex(
      (sortedBonuses) => sortedBonuses.bonus_percent === item.bonus_percent,
    );

    if (existingIndex === -1) {
      sortedBonuses.push(item);
    } else if (sortedBonuses[existingIndex].wager < item.wager) {
      sortedBonuses[existingIndex] = item;
    }
  });

  sortedBonuses.sort((a, b) => a.bonus_percent - b.bonus_percent);

  const selectMoney = (swiper: SwiperClass) => {
    moneyChangeHandler(sortedBonuses[swiper.realIndex].id);
    setActiveIndex(swiper.realIndex);
  };
  return (
    <div>
      <div className={styles.settings_labels}>
        <div>% бонуса</div>
      </div>
      <div className={styles.settings_swiper}>
        <Swiper
          spaceBetween={12}
          effect="coverflow"
          slidesPerView={bonusesTemplates.length >= 5 ? 5 : bonusesTemplates.length}
          centeredSlides
          lazyPreloadPrevNext={5}
          className={styles.settings_params}
          loop={false}
          direction="vertical"
          onSwiper={selectMoney}
          onSlideChange={selectMoney}
        >
          {sortedBonuses.map((item, index) => (
            <SwiperSlide
              className={classNames(styles.settings_data, {
                [styles.active]: activeIndex === index,
              })}
              key={index}
            >
              {item.bonus_percent} %
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BonusesMoney;
