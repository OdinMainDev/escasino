import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import classNames from 'classnames';

interface IProps {
  bonusesTemplates: IBonusTemplate[];
  fsChangeHandler: (betTemplateId: number) => void;
  gameId?: number;
}

export interface IBonusFSMethods {
  clearBonusFSSwiper: () => void;
}

const BonusesFS = forwardRef<IBonusFSMethods, IProps>(
  ({ bonusesTemplates, fsChangeHandler, gameId }, ref) => {
    const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
    const [selectedSpinsIndex, setSelectedSpinsIndex] = useState<number>(0);
    const [betTemplates, setBetTemplates] = useState<IBonusTemplate[]>([]);
    const [spinsTemplates, setSpinsTemplates] = useState<IBonusTemplate[]>([]);
    const betSwiper = useRef<SwiperRef>(null);
    const spinsSwiper = useRef<SwiperRef>(null);

    useImperativeHandle(ref, () => {
      return {
        clearBonusFSSwiper,
      };
    });

    const clearBonusFSSwiper = () => {
      if (betSwiper.current) {
        betSwiper.current.swiper.slideTo(0, 0);
      }
      if (spinsSwiper.current) {
        spinsSwiper.current.swiper.slideTo(0, 0);
      }
      setSelectedBetIndex(0);
      setSelectedSpinsIndex(0);
    };

    useEffect(() => {
      let filteredTemplates = bonusesTemplates;

      // Фильтруем по gameId, если он указан
      if (gameId !== undefined) {
        filteredTemplates = bonusesTemplates.filter((template) =>
          template.game_ids.includes(gameId),
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

      setBetTemplates(uniqueBetTemplates);
      setSpinsTemplates(uniqueSpinsTemplates);
    }, [bonusesTemplates, gameId]);

    const selectBet = (swiper: SwiperClass) => {
      const realIndex = swiper.realIndex;
      setSelectedBetIndex(realIndex);
      const selectedBetTemplate = betTemplates[realIndex];
      const selectedFsTemplate = spinsTemplates[selectedSpinsIndex];
      if (selectedBetTemplate && selectedFsTemplate) {
        const matchingTemplate = bonusesTemplates.find(
          (template) =>
            template.configurator.bet_amount === selectedBetTemplate.configurator.bet_amount &&
            template.spins_count === selectedFsTemplate.spins_count,
        );
        if (matchingTemplate) {
          fsChangeHandler(matchingTemplate.id);
        }
      }
    };

    const selectSpins = (swiper: SwiperClass) => {
      const realIndex = swiper.realIndex;
      setSelectedSpinsIndex(realIndex);
      const selectedBetTemplate = betTemplates[selectedBetIndex];
      const selectedFsTemplate = spinsTemplates[realIndex];
      if (selectedBetTemplate && selectedFsTemplate) {
        const matchingTemplate = bonusesTemplates.find(
          (template) =>
            template.configurator.bet_amount === selectedBetTemplate.configurator.bet_amount &&
            template.spins_count === selectedFsTemplate.spins_count,
        );
        if (matchingTemplate) {
          fsChangeHandler(matchingTemplate.id);
        }
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
            ref={betSwiper}
            spaceBetween={12}
            effect="coverflow"
            slidesPerView={5}
            centeredSlides
            className={styles.settings_params}
            lazyPreloadPrevNext={5}
            freeMode
            loop={betTemplates.length >= 5}
            onSwiper={selectBet}
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
            ref={spinsSwiper}
            spaceBetween={12}
            effect="coverflow"
            slidesPerView={5}
            centeredSlides
            freeMode
            className={styles.settings_params}
            lazyPreloadPrevNext={5}
            loop={spinsTemplates.length >= 5}
            direction="vertical"
            onSwiper={selectSpins}
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
              betTemplates.length > 0 && spinsTemplates.length > 0
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
