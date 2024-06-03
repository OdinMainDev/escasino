import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
}

const BonuesFS = ({ bonusesTemplates }: IProps) => {
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
          direction="vertical"
        >
          {bonusesTemplates?.map((item, index) => (
            <SwiperSlide className={styles.settings_data} key={index}>
              {item.bonus_percent} %
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
        >
          {bonusesTemplates?.map((item, index) => (
            <SwiperSlide className={styles.settings_data} key={index}>
              {item.spins_count} %
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
        <input className={styles.settings_input} />
      </div>
    </div>
  );
};

export default BonuesFS;
