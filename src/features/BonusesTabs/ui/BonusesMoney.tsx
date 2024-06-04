import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { useState } from 'react';
import classNames from 'classnames';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
  moneyChangeHandler: (moneyTemplate: IBonusTemplate) => void;
}
const BonusesMoney = ({ bonusesTemplates, moneyChangeHandler }: IProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const selectMoney = (swiper: SwiperClass) => {
    moneyChangeHandler(bonusesTemplates[swiper.activeIndex]);
    setActiveIndex(swiper.activeIndex);
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
          loop={bonusesTemplates.length >= 5}
          direction="vertical"
          onSwiper={selectMoney}
          onSlideChange={selectMoney}
        >
          {bonusesTemplates?.map((item, index) => (
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
