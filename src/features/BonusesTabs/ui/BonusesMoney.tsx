import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
  handleSlideChange: (swiper: SwiperClass) => void;
}
const BonusesMoney = ({ bonusesTemplates, handleSlideChange }: IProps) => {
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
          onSlideChange={handleSlideChange}
        >
          {bonusesTemplates?.map((item, index) => (
            <SwiperSlide className={styles.settings_data} key={index}>
              {item.bonus_percent} %
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BonusesMoney;
