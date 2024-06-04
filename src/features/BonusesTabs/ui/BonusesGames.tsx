import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './BonusesTabs.module.scss';
import { IGame } from '@/shared/models/interfaces/game';
import Game from '@/entities/Game/ui/Game';

interface IProps {
  games: IGame[];
}

import { Autoplay } from 'swiper/modules';

const BonusesGames = ({ games }: IProps) => {
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
      loop
    >
      {games.map((item) => (
        <SwiperSlide className={styles.games_item} key={item.id}>
          <Game game={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BonusesGames;
