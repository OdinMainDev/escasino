import { useParams } from 'react-router-dom';
import styles from './Bonuses.module.scss';
import GoBackButton from '@/shared/ui/GoBackButton';
import Icons from '@/shared/ui/Icons';
import { useCallback, useEffect, useState } from 'react';
import { getGameApi } from '@/app/api/games/getGameById';
import { IGame } from '@/shared/models/interfaces/game';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import Loader from '@/shared/ui/Loader';
import Button from '@/shared/ui/Button';
import { useRouter } from '@/shared/helpers/navigation';
import { TabItem } from '@/entities/TabItem';
import { getBonusTemplatesApi } from '@/app/api/bonuses/bonusesApi';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { getGamesAllApi } from '@/app/api/games/getGamesAll';
import { BonuesFS, BonusesGames, BonusesMoney } from '@/features/BonusesTabs';
import { useAppSelector } from '@/store/hooks/redux';
import { AlertModal } from '@/entities/AlertModal';
import { useModal } from '@/app/providers/ModalProvider';

const Bonus = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.userReducer);
  const [game, setGame] = useState<IGame | null>(null);
  const [bonusesTemplates, setBonusesTemplates] = useState<IBonusTemplate[]>([]);
  const [games, setGames] = useState<IGame[]>([]);
  const [filtredGames, setFiltredGames] = useState<IGame[]>([]);
  const { doOpenModal, doCloseModals } = useModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const tabs = ['Деньги', 'FS'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const moneyChangeHandler = useCallback(
    (moneyTemplate: IBonusTemplate) => {
      const filtredGames = games.filter((item) => moneyTemplate.game_ids.includes(item.id));
      setFiltredGames(filtredGames);
    },
    [games],
  );

  const fsChangeHandler = useCallback(
    (betTemplate: IBonusTemplate, fsTemplate: IBonusTemplate) => {
      const result = [...new Set([...betTemplate.game_ids, ...fsTemplate.game_ids])];
      const filtredGames = games.filter((item) => result.includes(item.id));
      setFiltredGames(filtredGames);
    },
    [games],
  );

  useEffect(() => {
    if (id) {
      const getGameById = async () => {
        setLoading(true);
        const data = await getGameApi(Number(id));
        setLoading(false);
        setGame(data?.game);
      };
      void getGameById();
    } else {
      setGame(null);
    }
  }, [id]);

  useEffect(() => {
    const getAllGames = async () => {
      const allGames = await getGamesAllApi();
      if (allGames.games) {
        setGames(allGames.games);
      }
    };
    const getBonusesTemplates = async () => {
      try {
        const { bonusesTemplates } = await getBonusTemplatesApi();
        setBonusesTemplates(bonusesTemplates);
      } catch (e) {
        /* empty */
      }
    };
    void getAllGames();
    void getBonusesTemplates();
  }, []);

  useEffect(() => {
    if (games.length > 0 && bonusesTemplates.length > 0) {
      moneyChangeHandler(bonusesTemplates[0]);
    }
  }, [bonusesTemplates, games, moneyChangeHandler]);

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
                  onClick={() =>
                    router.push({
                      pathname: '/bonus/games',
                      query: {
                        game_ids: filtredGames.map((item) => item.id.toString()),
                      },
                    })
                  }
                >
                  Изменить игру
                </Button>
                <BonusesGames games={filtredGames} />
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
                  moneyChangeHandler={moneyChangeHandler}
                  bonusesTemplates={bonusesTemplates}
                />
              ) : (
                <BonuesFS bonusesTemplates={bonusesTemplates} fsChangeHandler={fsChangeHandler} />
              )}
            </div>
            <div className={styles.footer}>
              <div className={styles.footer_title}>Рассчитывается на основе настроек бонуса</div>
              <div className="flex items-center gap-[16px]">
                <div className={styles.footer_info}>
                  <div className={styles.footer_label}>Сумма депозита</div>
                  <div className={styles.footer_value}>
                    {user?.balance.formatted_balance_real} {user?.balance.currency}
                  </div>
                </div>
                <Button
                  className="flex-1 uppercase"
                  onClick={() => {
                    doOpenModal('alert');
                  }}
                >
                  Добавить
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <AlertModal
        close={doCloseModals}
        title="Выдерите способ оплаты"
        buttons={[
          {
            text: 'Добавить в корзину',
            type: 'contained',
            onClick: () => {},
          },
          {
            text: 'Оформить сейчас',
            type: 'outlined',
            onClick: () => {},
          },
        ]}
      />
    </div>
  );
};

export default Bonus;
