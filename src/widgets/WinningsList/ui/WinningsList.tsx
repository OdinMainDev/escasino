import { useTranslation } from 'react-i18next';
import { getWinningsList } from '../api/winnningsApi';
import WinningsItem from './WinningsItem';
import styles from './WinningsList.module.scss';
import { useEffect, useState } from 'react';
import { IWinning } from '../models/interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

interface IProps {
  game_id: number;
}

const WinningsList = ({ game_id }: IProps) => {
  const { t } = useTranslation();
  const [winnings, setWinnings] = useState<IWinning[]>([]);

  useEffect(() => {
    const getData = async (game_id: number) => {
      const data = await getWinningsList(game_id);
      setWinnings(data);
    };

    if (game_id > 0) {
      void getData(game_id);
    }
  }, [game_id]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('lastWins')}</div>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={8}
        slidesPerView={3}
        grabCursor={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={winnings.length > 3}
        speed={1000}
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          380: {
            slidesPerView: 2,
          },
        }}
      >
        {winnings.map((item, index) => (
          <SwiperSlide key={index}>
            <WinningsItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WinningsList;
