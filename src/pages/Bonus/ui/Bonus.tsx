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
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import './Bonus.scss';
import { getBonusTemplatesApi } from '@/app/api/bonuses/bonusesApi';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';

const Bonus = () => {
  const { id } = useParams();
  const [game, setGame] = useState<IGame | null>(null);
  const [bonusesTemplates, setBonusesTemplates] = useState<IBonusTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const tabs = ['Деньги', 'FS'];
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    const getBonusesTemplates = async () => {
      try {
        const { bonusesTemplates } = await getBonusTemplatesApi();
        setBonusesTemplates(bonusesTemplates);
      } catch (e) {
        /* empty */
      }
    };
    void getBonusesTemplates();
  }, []);

  useEffect(() => {
    if (id) {
      const getGameById = async () => {
        setLoading(true);
        const data = await getGameApi(Number(id));
        setLoading(false);
        setGame(data?.game);
      };

      void getGameById();
    }
  }, [id]);

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
            {game ? (
              <div className={styles.game}>
                {game?.image ? (
                  <img src={game.image} alt={game.name} className={styles.game_image} />
                ) : (
                  <img src={PlaceholderImage} alt={game?.name} className={styles.game_image} />
                )}
                <div className={styles.game_title}>{game?.name}</div>
                <Button elType="outlined" className="w-[100%]" onClick={() => router.push('/')}>
                  Изменить игру
                </Button>
              </div>
            ) : (
              <div className={styles.game}>
                <img src={PlaceholderImage} alt="without_game" className={styles.game_image} />
                <div className={styles.game_title}>Выберите игру</div>
                <Button elType="outlined" className="w-[100%]" onClick={() => router.push('/')}>
                  Изменить игру
                </Button>
                <div>{bonusesTemplates[activeIndex] && bonusesTemplates[activeIndex].id}</div>
              </div>
            )}
            <div className={styles.settings}>
              <div className={styles.settings_title}>Тип бонуса</div>
              <div className={styles.settings_tabs}>
                {tabs.map((item, index) => (
                  <TabItem
                    selected={item === selectedTab}
                    onClick={() => setSelectedTab(item)}
                    key={index}
                  >
                    {item}
                  </TabItem>
                ))}
              </div>
              {selectedTab === 'Деньги' ? (
                <>
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
                      loop={bonusesTemplates.length >= 5}
                      direction="vertical"
                      onSlideChange={handleSlideChange}
                    >
                      {bonusesTemplates?.map((item, index) => (
                        <SwiperSlide key={index}>{item.bonus_percent} %</SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </>
              ) : (
                <>
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
                      lazyPreloadPrevNext={5}
                      loop
                      direction="vertical"
                    >
                      {bonusesTemplates?.map((item, index) => (
                        <SwiperSlide key={index}>{item.bonus_percent} %</SwiperSlide>
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
                      lazyPreloadPrevNext={5}
                      loop
                      direction="vertical"
                    >
                      {bonusesTemplates?.map((item, index) => (
                        <SwiperSlide key={index}>{item.spins_count} %</SwiperSlide>
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
                </>
              )}
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
