import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { useState } from 'react';
import classNames from 'classnames';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
}

const BonuesFS = ({ bonusesTemplates }: IProps) => {
  const [selectedBet, setSelectedBet] = useState<number>(
    bonusesTemplates.length > 0 ? bonusesTemplates[0].configurator.bet_amount : 0,
  );
  const [selectedSpins, setSelectedSpins] = useState<number>(
    bonusesTemplates.length > 0 ? bonusesTemplates[0].spins_count : 0,
  );

  const selectBet = (swiper: SwiperClass) => {
    setSelectedBet(bonusesTemplates[swiper.activeIndex].configurator.bet_amount);
  };

  const selectSpins = (swiper: SwiperClass) => {
    setSelectedSpins(bonusesTemplates[swiper.activeIndex].spins_count);
  };

  return (
    <div>
      <div className={styles.settings_labels}>
        <div>Ставка</div>
        <div>Кол-во FS</div>
        <div>Сумма бонуса</div>
      </div>
      <div className={styles.settings_swiper}>
        <Swiper
          spaceBetween={12}
          effect="coverflow"
          slidesPerView={5}
          centeredSlides
          className={styles.settings_params}
          lazyPreloadPrevNext={5}
          loop={bonusesTemplates.length >= 5}
          onSlideChange={selectBet}
          direction="vertical"
        >
          {bonusesTemplates?.map((item, index) => (
            <SwiperSlide
              className={classNames(styles.settings_data, {
                [styles.active]: true,
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
          spaceBetween={12}
          effect="coverflow"
          slidesPerView={5}
          centeredSlides
          className={styles.settings_params}
          lazyPreloadPrevNext={5}
          loop={bonusesTemplates.length >= 5}
          direction="vertical"
          onSlideChange={selectSpins}
        >
          {bonusesTemplates?.map((item, index) => (
            <SwiperSlide className={styles.settings_data} key={index}>
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
          value={selectedBet * selectedSpins}
          readOnly
          disabled
        />
      </div>
    </div>
  );
};

export default BonuesFS;
