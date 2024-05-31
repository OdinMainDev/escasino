import { useParams } from 'react-router-dom';
import styles from './Bonus.module.scss';
import GoBackButton from '@/shared/ui/GoBackButton';
import Icons from '@/shared/ui/Icons';
import { useEffect, useState } from 'react';
import { getGameApi } from '@/app/api/games/getGameById';
import { IGame } from '@/shared/models/interfaces/game';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import Loader from '@/shared/ui/Loader';
import Button from '@/shared/ui/Button';
import { useRouter } from '@/shared/helpers/navigation';
import { TabItem } from '@/entities/TabItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Bonus.scss';

const Bonus = () => {
  const { id } = useParams();
  const [game, setGame] = useState<IGame | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const tabs = ['Макс ставка', 'Макс FS'];

  useEffect(() => {
    const getGameById = async () => {
      setLoading(true);
      const data = await getGameApi(Number(id));
      setLoading(false);
      setGame(data?.game);
    };

    void getGameById();
  }, [id]);

  if (!game) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <GoBackButton />
          <div className={styles.title}>Собери свой бонус</div>
          <Icons icon="chat" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton />
        <div className={styles.title}>Собери свой бонус</div>
        <Icons icon="chat" />
      </div>
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <>
            <div className={styles.game}>
              {game?.image ? (
                <img src={game.image} alt={game.name} className={styles.game_image} />
              ) : (
                <img src={PlaceholderImage} alt={game?.name} className={styles.game_image} />
              )}
              <div className={styles.game_title}>{game.name}</div>
              <Button elType="outlined" className="w-[100%]" onClick={() => router.push('/')}>
                Изменить игру
              </Button>
            </div>
            <div className={styles.settings}>
              <div className={styles.settings_title}>Настройки бонуса</div>
              <div className={styles.settings_tabs}>
                {tabs.map((item, index) => (
                  <TabItem key={index}>{item}</TabItem>
                ))}
              </div>
              <div className={styles.settings_labels}>
                <div>Ставка</div>
                <div>Кол-во FS</div>
                <div>Сумма бонуса</div>
              </div>
              <div className={styles.settings_swiper}>
                <Swiper
                  spaceBetween={12}
                  loop
                  effect="coverflow"
                  slidesPerView={5}
                  centeredSlides
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 800,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  direction="vertical"
                >
                  <SwiperSlide>Slide 1</SwiperSlide>
                  <SwiperSlide>Slide 2</SwiperSlide>
                  <SwiperSlide>Slide 3</SwiperSlide>
                  <SwiperSlide>Slide 4</SwiperSlide>
                  <SwiperSlide>Slide 5</SwiperSlide>
                  <SwiperSlide>Slide 6</SwiperSlide>
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
                  loop
                  effect="coverflow"
                  slidesPerView={5}
                  centeredSlides
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 800,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  direction="vertical"
                >
                  <SwiperSlide>Slide 1</SwiperSlide>
                  <SwiperSlide>Slide 2</SwiperSlide>
                  <SwiperSlide>Slide 3</SwiperSlide>
                  <SwiperSlide>Slide 4</SwiperSlide>
                  <SwiperSlide>Slide 5</SwiperSlide>
                  <SwiperSlide>Slide 6</SwiperSlide>
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
            <div className={styles.footer}>
              <div className={styles.footer_title}>Рассчитывается на основе настроек бонуса</div>
              <div className="flex items-center gap-[16px]">
                <div className={styles.footer_info}>
                  <div className={styles.footer_label}>Сумма депозита</div>
                  <div className={styles.footer_value}>500.00 ₽</div>
                </div>
                <Button className="flex-1 uppercase">Пополнить</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bonus;
