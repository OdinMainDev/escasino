import { useParams } from 'react-router-dom';
import styles from './Bonuses.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IGame } from '@/shared/models/interfaces/game';
import Loader from '@/shared/ui/Loader';
import Button from '@/shared/ui/Button';
import { useRouter } from '@/shared/helpers/navigation';
import { TabItem } from '@/entities/TabItem';
import { getBonusTemplatesApi } from '@/app/api/bonuses/bonusesApi';
import {
  IBonusTemplate,
  ICartBonusTemplate,
  INoDepositBonusReq,
} from '@/shared/models/interfaces/bonuses';
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
import { PageHeader } from '@/widgets/Header';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { activeNoDepositBonus } from '@/app/api/bonuses/noDepositBonusesApi';
import classNames from 'classnames';
import { fetchBonusGames } from '@/store/slices/getBonusGamesSlice';

interface IProps {
  isNoDeposit?: boolean;
}

const Bonuses = ({ isNoDeposit }: IProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.userReducer);
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const { allGames } = useAppSelector((state) => state.fetchBonusGames);
  const hasBonuesSwiper = (import.meta.env.VITE_HAS_BONUS_SWIPER as string) === 'true';
  const { noDepositsBonuses } = useAppSelector((state) => state.noDepositBonusesSlice);
  const noDepositIsFinished = useAppSelector((state) => state.noDepositBonusesSlice.isFinished);

  const {
    bonusesTemplates: cartBonuses,
    minAmount: minAmountCart,
    maxAmount: maxAmountCart,
  } = useAppSelector((state) => state.cartBonusesSlice);
  const [tabs, setTabs] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<IGame | null | undefined>(null);
  const [bonusesTemplates, setBonusesTemplates] = useState<IBonusTemplate[]>([]);
  const [availGames, setAvailGames] = useState<IGame[]>([]);
  const { doOpenModal, doCloseModals } = useModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<IBonusTemplate | null>(null);
  const dispatch = useAppDispatch();
  const bonusesFS = useRef<IBonusFSMethods>(null);
  const bonusesMoney = useRef<IBonusMoneyMethods>(null);
  const [alertModalData, setAlertModalData] = useState<IAlert>({});
  const [isError, setIsError] = useState(false);
  const [openGamesModal, setOpenGamesModal] = useState(false);
  const isBonusScrollAllTemplates = import.meta.env.VITE_BONUS_SCROLL_TYPE === 'all';
  const imagePath = selectedGame
    ? selectedGame.system_name
      ? `${import.meta.env.VITE_IMAGE_PATH}/${selectedGame.game_provider}/${import.meta.env.VITE_IMAGE_SIZE}/${selectedGame.system_name}.png`
      : selectedGame.image
    : '';

  const maxAmountCartRealTime = selectedTemplate
    ? maxAmountCart > selectedTemplate.bonus_settings.max_amount
      ? selectedTemplate.bonus_settings.max_amount
      : maxAmountCart
    : 0;

  const minAmountCartRealTime = selectedTemplate
    ? minAmountCart < selectedTemplate.bonus_settings.min_amount
      ? selectedTemplate.bonus_settings.min_amount
      : minAmountCart
    : 0;

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
    if (!noDepositsBonuses.length &&  noDepositIsFinished) {
      router.push({
        pathname: '/',
      });
      return;
      
    }
  }, [noDepositIsFinished]);

  useEffect(() => {

    if (!settings) return;

    const bonusArray = getBonusArray(settings);

    if (isNoDeposit && bonusArray.length === 0) {
      router.push({
        pathname: '/',
      });
      return;
    }

    if (bonusArray.length === 0) {
      router.push({
        pathname: '/wallet/deposit/replenish',
      });
      return;
    }
    setTabs(bonusArray);
    setSelectedTab(bonusArray[0]);
  }, [settings, getBonusArray]);

  const openErrorModal = useCallback(() => {
    setAlertModalData({
      title: t('error'),
      text: t('unexpectedError'),
      buttons: [
        {
          text: t('cancel'),
          type: 'outlined',
          onClick: doCloseModals,
        },
      ],
    });
    doOpenModal('alert');
  }, [doCloseModals, doOpenModal]);

  const openTemplateErrorModal = useCallback(() => {
    setAlertModalData({
      title: t('noSuchCombination'),
      buttons: [
        {
          text: t('cancel'),
          type: 'outlined',
          onClick: doCloseModals,
        },
      ],
    });
    doOpenModal('alert');
  }, [doCloseModals, doOpenModal]);

  const successBonusAddedModal = useCallback(() => {
    setAlertModalData({
      title: t('bonusAddedSuccess'),
      text: (
        <div>
          <img src={successIcon} alt="success added bonus" className="m-auto mb-[24px]" />
          <div className="font-semibold text-2xl text-center mb-[8px]">
            {t('bonusAddedSuccessInCart')}
          </div>
          <div className="font-normal text-base text-center mb-[10px]">{t('goodGame')}</div>
        </div>
      ),
      buttons: [
        {
          text: t('close'),
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

      if (totalBonuses > 0 && settings.bonus.max_bonuses_per_deposit == 1) {
        setAlertModalData({
          title: t('bonusAlreadySelected'),
          buttons: [
            {
              text: t('cancel'),
              type: 'outlined',
              onClick: doCloseModals,
            },
          ],
        });
        doOpenModal('alert');
        return;
      }

      if (totalBonuses == 0 && settings.bonus.max_bonuses_per_deposit == 1) {
        addToBasket();
        router.push({
          pathname: '/wallet/deposit/replenish',
        });
        return;
      }

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
      title: t('selectPaymentWay'),
      buttons: [
        {
          text: t('addToCart'),
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
          text: t('goToPayment'),
          type: 'outlined',
          onClick: () => {
            if (selectedTemplate) {
              addToBasket();
              doCloseModals();
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

  const activeNoDeposit = async () => {
    if (noDepositsBonuses.length > 0 && selectedTemplate) {
      try {
        setAlertModalData({
          title: t('loading'),
          text: <Loader />,
        });
        const fid = await getVisitorId();
        const data: INoDepositBonusReq = {
          id: noDepositsBonuses[noDepositsBonuses.length - 1].id,
          bonus_id: selectedTemplate.id,
          game_id: Number(id),
          fid,
        };
        await activeNoDepositBonus(data);
        doCloseModals();
        if (id) {
          localStorage.setItem('nodeposit_game_id', id);
        }
      } catch (e) {
        setAlertModalData({
          title: t('error'),
          text: t('noDepositBonusesEnded'),
        });
        setTimeout(() => {
          doCloseModals();
        }, 3000);
      }
    } else {
      setAlertModalData({
        title: t('error'),
        text: t('noDepositBonusesEnded'),
      });
      setTimeout(() => {
        doCloseModals();
      }, 3000);
    }
  };

  const selectNoDepositBonus = () => {
    setAlertModalData({
      title: t('sureThatBonus'),
      buttons: [
        {
          text: t('cancel'),
          type: 'outlined',
          onClick: doCloseModals,
        },
        {
          text: t('get'),
          type: 'contained',
          onClick: () => void activeNoDeposit(),
        },
      ],
    });
    doOpenModal('alert');
  };

  const bonusChangeHandler = useCallback(
    (id: number | undefined) => {
      if (!id) {
        setIsError(true);
        return;
      }
      setIsError(false);
      const findedTemplate = bonusesTemplates.find((item) => item.id === id);
      if (findedTemplate) {
        setSelectedTemplate(findedTemplate);
      }
    },
    [bonusesTemplates],
  );

  useEffect(() => {
    void dispatch(fetchBonusGames({ bonusId: undefined }));
  }, []);

  useEffect(() => {
    if (id && allGames && allGames.length > 0) {
      const game = allGames.find((item) => item.id.toString() === id);
      setSelectedGame(game);
    } else if (allGames && allGames.length > 0 && settings?.bonus) {
      const game = allGames.find((item) => item.id === settings.bonus.default_game_id);
      setSelectedGame(game);
    } else {
      setSelectedGame(null);
    }

    if (allGames) {
      let gameIds: number[] = [];
      bonusesTemplates.forEach((item) => {
        if (item.game_ids) {
          gameIds.push(...item.game_ids);
        }
      });
      gameIds = Array.from(new Set(gameIds));
      const availGameIds = allGames.filter((item) => gameIds.includes(item.id));
      setAvailGames(availGameIds);
    }
  }, [id, allGames, bonusesTemplates]);

  useEffect(() => {
    const getBonusesTemplates = async () => {
      try {
        setLoading(true);
        const { bonusesTemplates } = await getBonusTemplatesApi(isNoDeposit);
        setBonusesTemplates(bonusesTemplates);
      } catch (e) {
        openErrorModal();
      } finally {
        setLoading(false);
      }
    };
    void getBonusesTemplates();
  }, []);

  // const clearBonuses = () => {
  //   if (bonusesFS.current) {
  //     bonusesFS.current.clearBonusFSSwiper();
  //   }
  //   if (bonusesMoney.current) {
  //     bonusesMoney.current.clearBonusMoneySwiper();
  //   }
  // };

  const addToBasket = () => {
    if (!selectedTemplate) {
      openErrorModal();
      return;
    }

    if (!selectedTemplate.meta.image) {
      selectedTemplate.meta.image = imagePath;
    }

    const data: ICartBonusTemplate = {
      ...selectedTemplate,
      uuid: uuidv4(),
      game_id: selectedTab === 'freespins' && selectedGame ? Number(selectedGame.id) : null,
      type: selectedTab as 'freespins' | 'money',
    };
    dispatch(addToCartBonuses(data));
  };

  return (
    <div className={styles.container}>
      <PageHeader fixed title={t('collectYourBonus')} />
      <div className={styles.content}>
        {loading || !noDepositIsFinished ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <>
            {isNoDeposit && selectedGame ? (
              <div className={styles.game}>
                {imagePath ? (
                  <img src={imagePath} alt={selectedGame.name} className={styles.game_image} />
                ) : (
                  <div className={classNames(styles.game_image_empty, styles.game_image)} />
                )}
                <div className={styles.game_title}>
                  <span>{selectedGame.game_provider}</span>
                  {selectedGame.name}
                </div>
                <Button
                  elType="outlined"
                  className={styles.button}
                  onClick={() => setOpenGamesModal(true)}
                >
                  {t('changeGame')}
                </Button>
              </div>
            ) : selectedTab !== 'money' ? (
              selectedGame ? (
                <div className={styles.game}>
                  {imagePath ? (
                    <img src={imagePath} alt={selectedGame.name} className={styles.game_image} />
                  ) : (
                    <div className={classNames(styles.game_image_empty, styles.game_image)} />
                  )}
                  <div className={styles.game_title}>
                    <span>{selectedGame.game_provider}</span>
                    {selectedGame.name}
                  </div>
                  <Button
                    elType="outlined"
                    className={styles.button}
                    onClick={() => setOpenGamesModal(true)}
                  >
                    {t('changeGame')}
                  </Button>
                </div>
              ) : (
                <div className={styles.game}>
                  <div className={classNames(styles.game_image_empty, styles.game_image)} />
                  <div className={styles.game_title}>{t('chooseGame')}</div>
                  <Button
                    elType="outlined"
                    className={styles.button}
                    onClick={() => setOpenGamesModal(true)}
                  >
                    {t('changeGame')}
                  </Button>
                </div>
              )
            ) : null}
            {hasBonuesSwiper &&
              selectedGame?.id === settings?.bonus.default_game_id &&
              selectedTab !== 'money' && (
                <div className="mb-[25px]">
                  <BonusesGames games={availGames} />
                </div>
              )}
            <div className={styles.settings}>
              {tabs.length > 1 && (
                <>
                  <div className={styles.settings_title}>{t('bonusType')}</div>
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
                </>
              )}

              {isNoDeposit || selectedTab === 'freespins' ? (
                <BonusesFS
                  ref={bonusesFS}
                  isNoDeposit={isNoDeposit}
                  bonusesTemplates={bonusesTemplates}
                  fsChangeHandler={bonusChangeHandler}
                  gameId={selectedGame ? selectedGame.id : undefined}
                  minAmount={minAmountCart}
                  maxAmount={maxAmountCart}
                />
              ) : (
                <BonusesMoney
                  ref={bonusesMoney}
                  moneyChangeHandler={bonusChangeHandler}
                  bonusesTemplates={bonusesTemplates}
                  minAmount={minAmountCart}
                  maxAmount={maxAmountCart}
                />
              )}
            </div>
            <div
              className={classNames(styles.footer, {
                [styles.small]: (!isError || !isBonusScrollAllTemplates) && isNoDeposit,
              })}
            >
              {isError && isBonusScrollAllTemplates ? (
                <div className={styles.footer_error}>{t('impossibleCombination')}</div>
              ) : (
                !isNoDeposit && (
                  <div className={styles.footer_title}>{t('calculatedOnBonusSettings')}</div>
                )
              )}

              {isNoDeposit ? (
                <Button
                  disabled={isError}
                  className="flex-1 uppercase w-[100%] max-h-[47px]"
                  onClick={selectNoDepositBonus}
                >
                  {t('getNoDepositBonus')}
                </Button>
              ) : (
                <div className="flex items-center gap-[16px]">
                  <div className={styles.footer_info}>
                    <div className={styles.footer_label}>
                      {minAmountCartRealTime !== 0 || maxAmountCartRealTime !== 0
                        ? t('depositSum')
                        : ''}
                    </div>
                    <div className={styles.footer_value}>
                      {minAmountCartRealTime === 0 && maxAmountCartRealTime === 0 ? (
                        ''
                      ) : minAmountCartRealTime !== maxAmountCartRealTime ? (
                        <>
                          {t('from')} {minAmountCartRealTime}{' '}
                          {maxAmountCartRealTime !== 0
                            ? `${t('before')} ${maxAmountCartRealTime} ${user?.balance.currency}`
                            : null}
                        </>
                      ) : (
                        <>
                          {minAmountCartRealTime} {user?.balance.currency}
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    disabled={isError}
                    className="flex-1 uppercase"
                    onClick={addToBasketOrOpenModal}
                  >
                    {settings &&
                    (settings?.bonus.max_bonuses_per_deposit === 1 ||
                      (selectedTab === 'money' &&
                        settings?.bonus.max_bonuses_money_per_deposit <=
                          cartBonuses.filter((item) => item.type === 'money').length) ||
                      (selectedTab === 'freespins' &&
                        settings?.bonus.max_bonuses_freespins_per_deposit <=
                          cartBonuses.filter((item) => item.type === 'freespins').length))
                      ? t('goToPayment')
                      : settings?.bonus.max_bonuses_per_deposit === 0
                        ? t('add')
                        : settings?.bonus.max_bonuses_per_deposit === cartBonuses.length
                          ? t('goToPayment')
                          : t('add')}
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <BonusesGamesModal
        isNoDeposit={isNoDeposit}
        isOpen={openGamesModal}
        close={() => setOpenGamesModal(false)}
      />
      <AlertModal {...alertModalData} close={doCloseModals} />
    </div>
  );
};

export default Bonuses;
