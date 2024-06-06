import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
  fsChangeHandler: (betTemplate: IBonusTemplate, fsTemplate: IBonusTemplate) => void;
}

const BonuesFS = ({ bonusesTemplates, fsChangeHandler }: IProps) => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selectedSpinsIndex, setSelectedSpinsIndex] = useState<number>(0);
  const [betTemplates, setBetTemplates] = useState<IBonusTemplate[]>(bonusesTemplates);
  const [spinsTemplates, setSpinsTemplates] = useState<IBonusTemplate[]>(bonusesTemplates);

  useEffect(() => {
    setBetTemplates(bonusesTemplates);
    setSpinsTemplates(bonusesTemplates);
  }, [bonusesTemplates]);

  const selectBet = (swiper: SwiperClass) => {
    if (bonusesTemplates.length > 0) {
      const realIndex = swiper.realIndex;
      setSelectedBetIndex(realIndex);
      setSpinsTemplates(
        bonusesTemplates.filter(
          (item) => item.spins_count === bonusesTemplates[realIndex].spins_count,
        ),
      );
      fsChangeHandler(betTemplates[realIndex], spinsTemplates[selectedSpinsIndex]);
    }
  };

  const selectSpins = (swiper: SwiperClass) => {
    if (bonusesTemplates.length > 0) {
      const realIndex = swiper.realIndex;
      setSelectedSpinsIndex(realIndex);
      setBetTemplates(
        bonusesTemplates.filter(
          (item) =>
            item.configurator.bet_amount === bonusesTemplates[realIndex].configurator.bet_amount,
        ),
      );
      fsChangeHandler(betTemplates[selectedBetIndex], spinsTemplates[realIndex]);
    }
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
          loop={betTemplates.length >= 5}
          onSlideChange={selectBet}
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
          spaceBetween={12}
          effect="coverflow"
          slidesPerView={5}
          centeredSlides
          className={styles.settings_params}
          lazyPreloadPrevNext={5}
          loop={spinsTemplates.length >= 5}
          direction="vertical"
          onSlideChange={selectSpins}
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
            bonusesTemplates.length > 0 && betTemplates.length > 0 && spinsTemplates.length > 0
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
};

export default BonuesFS;
