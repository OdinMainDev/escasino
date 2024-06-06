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
import { IBonusTemplate, ICartBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { getGamesAllApi } from '@/app/api/games/getGamesAll';
import { BonuesFS, BonusesGames, BonusesMoney } from '@/features/BonusesTabs';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { AlertModal, IAlert } from '@/entities/AlertModal';
import { useModal } from '@/app/providers/ModalProvider';
import { addToCartBonuses } from '@/store/slices/cartBonusesSlice';
import successIcon from '@/app/assets/images/success.svg';
import { ISettings } from '@/shared/models/interfaces/settings';

const Bonus = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.userReducer);
  const { depositAmount } = useAppSelector((state) => state.cartBonusesSlice);
  const { settings } = useAppSelector((state) => state.settingsReducer);

  const [game, setGame] = useState<IGame | null>(null);
  const [bonusesTemplates, setBonusesTemplates] = useState<IBonusTemplate[]>([]);
  const [games, setGames] = useState<IGame[]>([]);
  const [filtredGames, setFiltredGames] = useState<IGame[]>([]);
  const { doOpenModal, doCloseModals } = useModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [tabs, setTabs] = useState(getBonusArray(settings));
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<IBonusTemplate | null>(null);
  const dispatch = useAppDispatch();
  const [alertModalData, setAlertModalData] = useState<IAlert>({
    title: 'Выберите способ оплаты',
    buttons: [
      {
        text: 'Добавить в корзину',
        type: 'contained',
        onClick: () => {
          if (selectedTemplate) {
            addToBasket();
            successBonusAddedModal();
          }
        },
      },
      {
        text: 'Оформить сейчас',
        type: 'outlined',
        onClick: () => {
          router.push('/wallet/deposit/replenish');
          addToBasket();
        },
      },
    ],
  });

  function getBonusArray(settings: ISettings | null) {
    if (settings) {
      const isFreespinsDisabled = settings?.bonus?.is_freespins_disabled;
      const isMoneyDisabled = settings?.bonus?.is_money_disabled;
      if (isFreespinsDisabled && isMoneyDisabled) {
        return [];
      }
      if (isFreespinsDisabled) {
        return ['Деньги'];
      }
      if (isMoneyDisabled) {
        return ['FS'];
      }
    }
    return ['FS', 'Деньги'];
  }

  const moneyChangeHandler = useCallback(
    (moneyTemplate: IBonusTemplate) => {
      const filtredGames = games.filter((item) => moneyTemplate.game_ids.includes(item.id));
      setFiltredGames(filtredGames);
      const findedTemplate = bonusesTemplates.find(
        (item) => item.bonus_percent === moneyTemplate.bonus_percent,
      );
      if (findedTemplate) {
        setSelectedTemplate(findedTemplate);
      }
    },
    [bonusesTemplates, games],
  );

  useEffect(() => {
    if (settings) {
      setTabs(getBonusArray(settings));
    }
  }, [setTabs, settings]);

  const openGameErrorModal = () => {
    setAlertModalData({
      title: 'Игра не выбрана',
      text: 'Выберите игру прежде чем добавить бонус',
      buttons: [
        {
          text: 'Отмена',
          type: 'outlined',
          onClick: doCloseModals,
        },
        {
          text: 'Выбрать игру',
          type: 'contained',
          onClick: () => {
            router.push({
              pathname: '/bonus/games',
              query: {
                game_ids: filtredGames.map((item) => item.id.toString()),
              },
            });
          },
        },
      ],
    });
    doOpenModal('alert');
  };

  const successBonusAddedModal = () => {
    setAlertModalData({
      title: 'Бонус успешно добавлен',
      text: (
        <div>
          <img src={successIcon} alt="success added bonus" className="m-auto mb-[24px]" />
          <div className="font-semibold text-2xl text-center mb-[8px]">Бонус успешно добавлен</div>
          <div className="font-normal text-base text-center mb-[10px]">
            Желаем вам приятной игры!
          </div>
        </div>
      ),
      buttons: [
        {
          text: 'Вернуться к бонусам',
          type: 'contained',
          onClick: () => {
            doCloseModals();
          },
        },
      ],
    });
    doOpenModal('alert');
  };

  const openSelectedGameBonus = () => {
    setAlertModalData({
      title: 'Выберите способ оплаты',
      buttons: [
        {
          text: 'Добавить в корзину',
          type: 'contained',
          onClick: () => {
            console.log(selectedTemplate);
            if (selectedTemplate) {
              addToBasket();
              successBonusAddedModal();
            }
          },
        },
        {
          text: 'Оформить сейчас',
          type: 'outlined',
          onClick: () => {
            router.push('/wallet/deposit/replenish');
            addToBasket();
          },
        },
      ],
    });
    doOpenModal('alert');
  };

  const fsChangeHandler = useCallback(
    (betTemplate: IBonusTemplate, fsTemplate: IBonusTemplate) => {
      const result = [...new Set([...betTemplate.game_ids, ...fsTemplate.game_ids])];
      const filtredGames = games.filter((item) => result.includes(item.id));
      setFiltredGames(filtredGames);
      const findedTemplate = bonusesTemplates.find(
        (item) =>
          item.configurator.bet_amount === betTemplate.configurator.bet_amount &&
          item.spins_count === fsTemplate.spins_count,
      );
      if (findedTemplate) {
        setSelectedTemplate(findedTemplate);
      }
    },
    [bonusesTemplates, games],
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

  const navigateBySelectedGame = (game_id: number) => {
    const templates = bonusesTemplates.filter((item) => item.game_ids.includes(game_id));
    const combinedGameIds = templates.reduce((acc, obj) => {
      return acc.concat(obj.game_ids);
    }, [] as number[]);
    const uniqueGameIds = [...new Set(combinedGameIds)];
    router.push({
      pathname: '/bonus/games',
      query: {
        game_ids: uniqueGameIds.map((item) => item.toString()),
      },
    });
  };

  const addToBasket = () => {
    if (selectedTemplate && game) {
      if (selectedTab === 'FS') {
        const data: ICartBonusTemplate = {
          ...selectedTemplate,
          game_id: Number(game.id),
          type: 'freespins',
        };
        dispatch(addToCartBonuses(data));
      } else if (selectedTab == 'Деньги') {
        const data: ICartBonusTemplate = {
          ...selectedTemplate,
          game_id: Number(game.id),
          type: 'money',
        };
        console.log(data);
        dispatch(addToCartBonuses(data));
      }
    } else {
      openSelectedGameBonus();
    }
  };

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
            {selectedTab !== 'Деньги' ? (
              game ? (
                <div className={styles.game}>
                  {game?.image ? (
                    <img src={game.image} alt={game.name} className={styles.game_image} />
                  ) : (
                    <img src={PlaceholderImage} alt={game?.name} className={styles.game_image} />
                  )}
                  <div className={styles.game_title}>{game?.name}</div>
                  <Button
                    elType="outlined"
                    className="w-[100%]"
                    onClick={() => navigateBySelectedGame(game.id)}
                  >
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
              )
            ) : null}
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
                    {Number(depositAmount)} {user?.balance.currency}
                  </div>
                </div>
                <Button
                  className="flex-1 uppercase"
                  onClick={() => {
                    if (game) {
                      openSelectedGameBonus();
                    } else {
                      openGameErrorModal();
                    }
                  }}
                >
                  Добавить
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <AlertModal {...alertModalData} close={doCloseModals} />
    </div>
  );
};

export default Bonus;
