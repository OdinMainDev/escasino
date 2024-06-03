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
import SwiperClass from 'swiper';
import { getBonusTemplatesApi } from '@/app/api/bonuses/bonusesApi';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import Game from '@/entities/Game/ui/Game';
import { getGamesAllApi } from '@/app/api/games/getGamesAll';
import { BonuesFS, BonusesMoney } from '@/features/BonusesTabs';

const Bonus = () => {
  const { id } = useParams();
  const [game, setGame] = useState<IGame | null>(null);
  const [bonusesTemplates, setBonusesTemplates] = useState<IBonusTemplate[]>([]);
  const [games, setGames] = useState<IGame[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const tabs = ['Деньги', 'FS'];
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
  };

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

    const getBonusesTemplates = async () => {
      try {
        const { bonusesTemplates } = await getBonusTemplatesApi();
        if (id) {
          setBonusesTemplates(
            bonusesTemplates.filter((item) => item.game_ids.includes(Number(id))),
          );
        } else {
          setBonusesTemplates(bonusesTemplates);
        }
      } catch (e) {
        /* empty */
      }
    };

    void getBonusesTemplates();
  }, [id]);

  useEffect(() => {
    const getAllGames = async () => {
      const allGames = await getGamesAllApi();
      if (allGames.games) {
        setGames(allGames.games);
      }
    };
    void getAllGames();
  }, []);

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
                <Button
                  elType="outlined"
                  className="w-[100%] mb-[20px]"
                  onClick={() => router.push('/')}
                >
                  Изменить игру
                </Button>
                {bonusesTemplates[activeIndex] && games ? (
                  <Swiper
                    className={styles.games}
                    spaceBetween={10}
                    autoplay={{
                      delay: 1,
                    }}
                    speed={500}
                    lazyPreloadPrevNext={5}
                    slidesPerView={2}
                    loop
                  >
                    {games
                      ?.filter((item) => bonusesTemplates[activeIndex].game_ids.includes(item.id))
                      .map((item) => (
                        <SwiperSlide className={styles.games_item} key={item.id}>
                          <Game game={item} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                ) : null}
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
                <BonusesMoney
                  handleSlideChange={handleSlideChange}
                  bonusesTemplates={bonusesTemplates}
                />
              ) : (
                <BonuesFS bonusesTemplates={bonusesTemplates} />
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
