import { useParams } from 'react-router-dom';
import styles from './Bonuses.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IGame } from '@/shared/models/interfaces/game';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import Loader from '@/shared/ui/Loader';
import Button from '@/shared/ui/Button';
import { useRouter } from '@/shared/helpers/navigation';
import { TabItem } from '@/entities/TabItem';
import { getBonusTemplatesApi } from '@/app/api/bonuses/bonusesApi';
import { IBonusTemplate, ICartBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { BonusesFS, BonusesGames, BonusesMoney } from '@/features/BonusesTabs';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { AlertModal, IAlert } from '@/entities/AlertModal';
import { useModal } from '@/app/providers/ModalProvider';
import { addToCartBonuses } from '@/store/slices/cartBonusesSlice';
import successIcon from '@/app/assets/images/success.svg';
import { ISettings } from '@/shared/models/interfaces/settings';
import { IBonusFSMethods } from '@/features/BonusesTabs/ui/BonusesFS';
import { IBonusMoneyMethods } from '@/features/BonusesTabs/ui/BonusesMoney';
import { BonusesGamesModal } from '@/features/BonusesGamesModal';
import { v4 as uuidv4 } from 'uuid';
import { useCurrentLanguage } from '@/app/providers/LangProvider';
import { PageHeader } from '@/widgets/Header';
import { useTranslation } from 'react-i18next';

const Bonuses = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.userReducer);
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const { games } = useAppSelector((state) => state.gamesAllSlice);
  const {
    bonusesTemplates: cartBonuses,
    minAmount: minAmountCart,
    maxAmount: maxAmountCart,
  } = useAppSelector((state) => state.cartBonusesSlice);
  const [tabs, setTabs] = useState<string[]>([]);
  const currentLanguage = useCurrentLanguage();
  const [selectedGame, setSelectedGame] = useState<IGame | null | undefined>(null);
  const [bonusesTemplates, setBonusesTemplates] = useState<IBonusTemplate[]>([]);
  const [availGames, setAvailGames] = useState<IGame[]>([]);
  const { doOpenModal, doCloseModals } = useModal();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<IBonusTemplate | null>(null);
  const dispatch = useAppDispatch();
  const bonusesFS = useRef<IBonusFSMethods>(null);
  const bonusesMoney = useRef<IBonusMoneyMethods>(null);
  const [alertModalData, setAlertModalData] = useState<IAlert>({});
  const [openGamesModal, setOpenGamesModal] = useState(false);
  const { t } = useTranslation();

  const getBonusArray = useCallback((settings: ISettings | null) => {
    if (settings) {
      const isFreespinsDisabled = settings?.bonus?.is_freespins_disabled;
      const isMoneyDisabled = settings?.bonus?.is_money_disabled;
      if (isFreespinsDisabled && isMoneyDisabled) {
        return [];
      }
      if (isFreespinsDisabled) {
        return ['money'];
      }
      if (isMoneyDisabled) {
        return ['freespins'];
      }
    }
    return ['freespins', 'money'];
  }, []);

  useEffect(() => {
    if (!settings) return;

    const bonusArray = getBonusArray(settings);
    if (bonusArray.length === 0) {
      router.push({
        pathname: '/wallet/deposit/replenish',
      });
      return;
    }
    setTabs(bonusArray);
    setSelectedTab(bonusArray[0]);
    setLoading(false);
  }, [settings, getBonusArray]);

  const openErrorModal = useCallback(() => {
    setAlertModalData({
      title: 'Ошибка',
      text: 'Произошла непредвиденная ошибка, повторите попытку позже',
      buttons: [
        {
          text: 'Отмена',
          type: 'outlined',
          onClick: doCloseModals,
        },
      ],
    });
    doOpenModal('alert');
  }, [doCloseModals, doOpenModal]);

  const openTemplateErrorModal = useCallback(() => {
    setAlertModalData({
      title: 'Отсутствует такая комбинация',
      buttons: [
        {
          text: 'Отмена',
          type: 'outlined',
          onClick: doCloseModals,
        },
      ],
    });
    doOpenModal('alert');
  }, [doCloseModals, doOpenModal]);

  const successBonusAddedModal = useCallback(() => {
    router.push({
      pathname: '/bonus',
    });
    setAlertModalData({
      title: 'Бонус успешно добавлен',
      text: (
        <div>
          <img src={successIcon} alt="success added bonus" className="m-auto mb-[24px]" />
          <div className="font-semibold text-2xl text-center mb-[8px]">
            Бонус успешно добавлен в корзину
          </div>
          <div className="font-normal text-base text-center mb-[10px]">
            Желаем вам приятной игры!
          </div>
        </div>
      ),
      buttons: [
        {
          text: 'Закрыть',
          type: 'contained',
          onClick: () => {
            doCloseModals();
          },
        },
      ],
    });
    doOpenModal('alert');
  }, [doCloseModals, doOpenModal, router]);

  const addToBasketOrOpenModal = () => {
    if (settings) {
      const moneyCount = cartBonuses.filter((item) => item.type === 'money').length;
      const fsCount = cartBonuses.filter((item) => item.type === 'freespins').length;
      const totalBonuses = cartBonuses.length;

      const maxMoneyBonusesReached = settings?.bonus.max_bonuses_money_per_deposit <= moneyCount;
      const maxFsBonusesReached = settings?.bonus.max_bonuses_freespins_per_deposit <= fsCount;
      const maxTotalBonusesReached = settings?.bonus.max_bonuses_per_deposit === totalBonuses;

      if (settings && selectedTab === 'money' && maxMoneyBonusesReached) {
        router.push({
          pathname: '/wallet/deposit/replenish',
        });
        return;
      }

      if (settings && selectedTab === 'freespins' && maxFsBonusesReached) {
        router.push({
          pathname: '/wallet/deposit/replenish',
        });
        return;
      }

      if (maxTotalBonusesReached) {
        router.push({
          pathname: '/wallet/deposit/replenish',
        });
        return;
      }
    }

    setAlertModalData({
      title: 'Выберите способ оплаты',
      buttons: [
        {
          text: 'Добавить в корзину',
          type: 'contained',
          onClick: () => {
            if (selectedTemplate) {
              addToBasket();
              successBonusAddedModal();
            } else {
              openTemplateErrorModal();
            }
          },
        },
        {
          text: 'Перейти к оплате',
          type: 'outlined',
          onClick: () => {
            if (selectedTemplate) {
              addToBasket();
              router.push({
                pathname: '/wallet/deposit/replenish',
              });
            } else {
              openTemplateErrorModal();
            }
          },
        },
      ],
    });
    doOpenModal('alert');
  };

  const bonusChangeHandler = useCallback(
    (id: number) => {
      const findedTemplate = bonusesTemplates.find((item) => item.id === id);
      if (findedTemplate) {
        setSelectedTemplate(findedTemplate);
      }
    },
    [bonusesTemplates],
  );

  useEffect(() => {
    if (id && games) {
      const game = games.find((item) => item.id.toString() === id);
      setSelectedGame(game);
    } else {
      setSelectedGame(null);
    }

    if (games) {
      let gameIds: number[] = [];
      bonusesTemplates.forEach((item) => {
        gameIds.push(...item.game_ids);
      });
      gameIds = Array.from(new Set(gameIds));
      const availGameIds = games.filter((item) => gameIds.includes(item.id));
      setAvailGames(availGameIds);
    }
  }, [id, games, bonusesTemplates]);

  useEffect(() => {
    const getBonusesTemplates = async () => {
      try {
        const { bonusesTemplates } = await getBonusTemplatesApi();
        setBonusesTemplates(bonusesTemplates);
      } catch (e) {
        openErrorModal();
      }
    };
    void getBonusesTemplates();
  }, []);

  const clearBonuses = () => {
    if (bonusesFS.current) {
      bonusesFS.current.clearBonusFSSwiper();
    }
    if (bonusesMoney.current) {
      bonusesMoney.current.clearBonusMoneySwiper();
    }
    setSelectedGame(null);
    setSelectedTemplate(null);
  };

  const addToBasket = () => {
    if (!selectedTemplate) {
      openErrorModal();
      return;
    }
    clearBonuses();
    const data: ICartBonusTemplate = {
      ...selectedTemplate,
      uuid: uuidv4(),
      game_id: selectedTab === 'freespins' && selectedGame ? Number(selectedGame.id) : null,
      type: selectedTab as 'freespins' | 'money',
    };
    dispatch(addToCartBonuses(data));
    router.push('/bonus');
  };

  return (
    <div className={styles.container}>
      <PageHeader
        customBackPath={'/' + currentLanguage + '/wallet/deposit/replenish'}
        title="Собери свой бонус"
      />
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <>
            {selectedTab !== 'money' ? (
              selectedGame ? (
                <div className={styles.game}>
                  {selectedGame.image ? (
                    <img
                      src={selectedGame.image}
                      alt={selectedGame.name}
                      className={styles.game_image}
                    />
                  ) : (
                    <img
                      src={PlaceholderImage}
                      alt={selectedGame?.name}
                      className={styles.game_image}
                    />
                  )}
                  <div className={styles.game_title}>{selectedGame.name}</div>
                  <Button
                    elType="outlined"
                    className="w-[100%]"
                    onClick={() => setOpenGamesModal(true)}
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
                    onClick={() => setOpenGamesModal(true)}
                  >
                    Изменить игру
                  </Button>
                  <BonusesGames games={availGames} />
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
                    {t('bonusesConfigurator.tab.' + item)}
                  </TabItem>
                ))}
              </div>
              {selectedTab === 'money' ? (
                <BonusesMoney
                  ref={bonusesMoney}
                  moneyChangeHandler={bonusChangeHandler}
                  bonusesTemplates={bonusesTemplates}
                  minAmount={minAmountCart}
                  maxAmount={maxAmountCart}
                />
              ) : (
                <BonusesFS
                  ref={bonusesFS}
                  bonusesTemplates={bonusesTemplates}
                  fsChangeHandler={bonusChangeHandler}
                  gameId={selectedGame ? selectedGame.id : undefined}
                  minAmount={minAmountCart}
                  maxAmount={maxAmountCart}
                />
              )}
            </div>
            <div className={styles.footer}>
              <div className={styles.footer_title}>Рассчитывается на основе настроек бонуса</div>
              <div className="flex items-center gap-[16px]">
                <div className={styles.footer_info}>
                  <div className={styles.footer_label}>
                    {minAmountCart !== 0 || maxAmountCart !== 0 ? 'Сумма депозита' : ''}
                  </div>
                  <div className={styles.footer_value}>
                    {minAmountCart === 0 && maxAmountCart === 0 ? (
                      ''
                    ) : minAmountCart !== maxAmountCart ? (
                      <>
                        От {minAmountCart}{' '}
                        {maxAmountCart !== 0
                          ? `до ${maxAmountCart} ${user?.balance.currency}`
                          : null}
                      </>
                    ) : (
                      <>
                        {minAmountCart} {user?.balance.currency}
                      </>
                    )}
                  </div>
                </div>
                <Button className="flex-1 uppercase" onClick={addToBasketOrOpenModal}>
                  {settings &&
                  (settings?.bonus.max_bonuses_per_deposit === 1 ||
                    (selectedTab === 'money' &&
                      settings?.bonus.max_bonuses_money_per_deposit <=
                        cartBonuses.filter((item) => item.type === 'money').length) ||
                    (selectedTab === 'freespins' &&
                      settings?.bonus.max_bonuses_freespins_per_deposit <=
                        cartBonuses.filter((item) => item.type === 'freespins').length))
                    ? 'Перейти к оплате'
                    : settings?.bonus.max_bonuses_per_deposit === 0
                      ? 'Добавить'
                      : settings?.bonus.max_bonuses_per_deposit === cartBonuses.length
                        ? 'Перейти к оплате'
                        : 'Добавить'}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <BonusesGamesModal
        games={availGames}
        isOpen={openGamesModal}
        close={() => setOpenGamesModal(false)}
      />
      <AlertModal {...alertModalData} close={doCloseModals} />
    </div>
  );
};

export default Bonuses;
