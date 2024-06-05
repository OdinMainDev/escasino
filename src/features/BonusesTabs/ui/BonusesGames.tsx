import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IGame } from '@/shared/models/interfaces/game';
import { Game } from '@/entities/Game';

interface IProps {
  games: IGame[];
}

import { Autoplay } from 'swiper/modules';
import { useRouter } from '@/shared/helpers/navigation';

const BonusesGames = ({ games }: IProps) => {
  const router = useRouter();
  return (
    <Swiper
      className={styles.games}
      spaceBetween={10}
      autoplay={{
        delay: 1000,
      }}
      speed={1000}
      modules={[Autoplay]}
      lazyPreloadPrevNext={5}
      slidesPerView={2}
      loop={games.length > 2}
    >
      {games.map((item) => (
        <SwiperSlide className={styles.games_item} key={item.id}>
          <Game onClick={() => router.push(`/bonus/${item.id}`)} game={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BonusesGames;
