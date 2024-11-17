import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { IGame } from '@/shared/models/interfaces/game';
import { getGameApi } from '@/app/api/games/getGameById';
import Icons from '@/shared/ui/Icons';
import Button from '@/shared/ui/Button';
import { WinningsList } from '@/widgets/WinningsList';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { useRouter } from '@/shared/helpers/navigation';
import { useModal } from '@/app/providers/ModalProvider';
import Footer from '@/widgets/Footer';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import ModalZeroBalance from './ui/ModalZeroBalance';
import { gamesHeaderTypeCover } from '@/app/config/app';
import { AlertModal, IAlert } from '@/entities/AlertModal';
import { deleteCartBonusesItem } from '@/store/slices/cartBonusesSlice';
import { PageHeader } from '@/widgets/Header';
import { useCurrentLanguage } from '@/app/providers/LangProvider';

import { getBonuses } from '@/store/slices/bonusesSlices';
import { validateUserData, validateUserDataError } from './helpers/validateUserData';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';

const Details = () => {
  const [game, setGame] = useState<IGame | null>(null);
  const { id } = useParams();
  const { isAuth } = useAuthProvider();
  const router = useRouter();
  const { noDepositsBonuses } = useAppSelector((state) => state.noDepositBonusesSlice);
  const { doOpenModal, doCloseModals } = useModal();
  const { bonuses, activeBonuses } = useAppSelector((state) => state.bonusesSlice);
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const { bonusesTemplates: cartBonuses } = useAppSelector((state) => state.cartBonusesSlice);
  const [alertData, setAlertData] = useState<IAlert | null>(null);
  const dispatch = useAppDispatch();
  const currentLanguage = useCurrentLanguage();
  const [imagePath, setImagePath] = useState('');
  const warningText =
    game?.has_no_deposit_bonus &&
    (!isAuth ||
      (user && settings && !validateUserData(user.data, settings)) ||
      activeBonuses.length > 0);
  const { t } = useTranslation();
  useEffect(() => {
    if (Number(id) > 0) {
      const getGameById = async () => {
        const data = await getGameApi(Number(id));
        setGame(data?.game);
        if (data.game) {
          setImagePath(
            data.game.image
              ? data.game.image
              : data.game.system_name
                ? `${import.meta.env.VITE_IMAGE_PATH}/${data.game.game_provider}/${import.meta.env.VITE_IMAGE_SIZE}/${data.game.system_name}.png`
                : data.game.image,
          );
        }
      };

      void getGameById();
    }
  }, [id]);

  useEffect(() => {
    if (isAuth) {
      void dispatch(getBonuses());
    }
  }, [isAuth]);

  const openBonusError = () => {
    setAlertData({
      title: t('attention'),
      text: (
        <div>
          <div className="mb-[5px]">
            {bonuses && bonuses.length > 0 ? t('youHaveActiveBonus') : null}
          </div>
          <div>{t('wagerOrDeclineBonus')}</div>
        </div>
      ),
      buttons: [
        {
          type: 'outlined',
          text: t('cancel'),
          onClick: doCloseModals,
        },
        {
          type: 'contained',
          text: t('play'),
          onClick: () => {},
        },
      ],
      close: doCloseModals,
    });
    doOpenModal('alert');
  };

  const openCartError = () => {
    setAlertData({
      title: t('attention'),
      text: (
        <div>
          <div className="mb-[5px]">
            {cartBonuses.length > 0
              ? `${t('youHaveBonusUnder')} id:${cartBonuses[0].id} ${t('youAchivedLimit')}`
              : null}
          </div>
          <div>{t('deleteBonusFromTrash')}</div>
        </div>
      ),
      buttons: [
        {
          type: 'outlined',
          text: t('cancel'),
          onClick: doCloseModals,
        },
        {
          type: 'contained',
          text: t('delete'),
          onClick: () => {
            dispatch(deleteCartBonusesItem(cartBonuses[0].uuid));
            doCloseModals();
          },
        },
      ],
      close: doCloseModals,
    });
    doOpenModal('alert');
  };

  const openDemoPlay = () => {
    router.push('/play/demo/' + id);
  };

  const openRealPlay = () => {
    if (isAuth) {
      if (user?.balance.balance_bonus == 0 && user?.balance.balance_real == 0) {
        doOpenModal('play-real-zero-balance');
        return;
      }
      router.push('/play/real/' + id);
      return;
    }

    doOpenModal('register');
  };

  const openBonus = () => {
    if (!isAuth) {
      doOpenModal('register');
      return;
    }
    if (settings) {
      if (settings.bonus.max_avail_bonuses !== 0 && bonuses) {
        if (bonuses.length >= settings.bonus.max_avail_bonuses) {
          openBonusError();
        } else {
          router.push(`/bonus/${game?.id}`);
        }
      } else if (
        settings.bonus.max_bonuses_per_deposit > 0 &&
        settings.bonus.max_bonuses_per_deposit <= cartBonuses.length
      ) {
        openCartError();
      } else {
        router.push(`/bonus/${game?.id}`);
      }
    }
  };

  const openNoDepositBonus = () => {
    if (!isAuth) {
      doOpenModal('register');
      return;
    }
    router.push(`/bonus/nodeposit/${game?.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <PageHeader fixed title={game?.game_provider} isHover={gamesHeaderTypeCover} />
        <div
          className={classNames(styles.image_container, {
            [styles.cover]: gamesHeaderTypeCover,
          })}
        >
          {imagePath ? (
            <img
              src={imagePath}
              alt={game?.name}
              className={classNames(styles.image, {
                [styles.cover]: gamesHeaderTypeCover,
              })}
            />
          ) : (
            <div
              className={classNames(styles.image, {
                [styles.cover]: gamesHeaderTypeCover,
              })}
            />
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <Button elType="dark" className={styles.button} onClick={openDemoPlay}>
          {t('demoGame')}
        </Button>
        <Button elType="contained" className={styles.button} onClick={openRealPlay}>
          {t('playOnMoney')}
        </Button>

        {warningText || noDepositsBonuses.length > 0 ? (
          <Button
            elType="outlined"
            disabled={
              activeBonuses.length > 0 ||
              (!!user && !!settings && !validateUserData(user.data, settings))
            }
            className={classNames(styles.button, styles.button_big)}
            onClick={() => (isAuth ? openNoDepositBonus() : doOpenModal('register'))}
          >
            <Icons icon="settings" />
            <span>{t('configureNoDepositBonus')}</span>
          </Button>
        ) : game?.has_bonus ? (
          <Button
            elType="outlined"
            className={classNames(styles.button, styles.button_big)}
            onClick={openBonus}
          >
            <Icons icon="settings" />
            <span>{t('configureBonus')}</span>
          </Button>
        ) : null}
      </div>
      {warningText ? (
        <div className={styles.warning}>
          <Icons icon="warning" />
          {!isAuth ? (
            <span>
              {t('noDepositBonusUnavailable')} {t('causeYouDontConfirmEmail')}
            </span>
          ) : user && settings && !validateUserData(user.data, settings) ? (
            <span>
              {t('noDepositBonusUnavailable')}{' '}
              {t(validateUserDataError(user.data, settings) as unknown as string)}
            </span>
          ) : (
            <span>
              {t('noDepositBonusUnavailable')} {t('youHaveActiveBonus').toLocaleLowerCase()}
            </span>
          )}
        </div>
      ) : null}
      <div className={styles.winnings}>
        <WinningsList />
      </div>
      <div className={styles.description}>
        <div className={styles.description_title}>{game?.name}</div>
        <div className={styles.description_info}>
          <Markdown>
            {
              game?.data.texts?.find(
                (item) =>
                  item.language.toLowerCase() === currentLanguage && item.key === 'description',
              )?.value
            }
          </Markdown>
        </div>
      </div>
      <Footer />
      <AlertModal {...alertData} />
      <ModalZeroBalance close={doCloseModals} gameId={game?.id} />
    </div>
  );
};

export default Details;
