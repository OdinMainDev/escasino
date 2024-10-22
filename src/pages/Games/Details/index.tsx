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

const Details = () => {
  const [game, setGame] = useState<IGame | null>(null);
  const { id } = useParams();
  const { isAuth } = useAuthProvider();
  const router = useRouter();
  const { noDepositsBonuses } = useAppSelector((state) => state.noDepositBonusesSlice);
  const { doOpenModal, doCloseModals } = useModal();
  const { bonuses } = useAppSelector((state) => state.bonusesSlice);
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const { bonusesTemplates: cartBonuses } = useAppSelector((state) => state.cartBonusesSlice);
  const [alertData, setAlertData] = useState<IAlert | null>(null);
  const dispatch = useAppDispatch();
  const currentLanguage = useCurrentLanguage();
  const [imagePath, setImagePath] = useState('');
  useEffect(() => {
    if (Number(id) > 0) {
      const getGameById = async () => {
        const data = await getGameApi(Number(id));
        setGame(data?.game);
        if (data.game) {
          setImagePath(
            data.game.system_name
              ? `${import.meta.env.VITE_IMAGE_PATH}/${data.game.game_provider}/${import.meta.env.VITE_IMAGE_SIZE}/${data.game.system_name}.png`
              : data.game.image,
          );
        }
      };

      void getGameById();
    }
  }, [id]);

  const openBonusError = () => {
    setAlertData({
      title: 'Внимание!',
      text: (
        <div>
          <div className="mb-[5px]">
            {bonuses && bonuses.length > 0 ? 'У вас есть активный бонус.' : null}
          </div>
          <div>Отыграйте его или откажитесь от бонуса.</div>
        </div>
      ),
      buttons: [
        {
          type: 'outlined',
          text: 'Отказаться',
          onClick: doCloseModals,
        },
        {
          type: 'contained',
          text: 'Играть',
          onClick: () => {},
        },
      ],
      close: doCloseModals,
    });
    doOpenModal('alert');
  };

  const openCartError = () => {
    setAlertData({
      title: 'Внимание!',
      text: (
        <div>
          <div className="mb-[5px]">
            {cartBonuses.length > 0
              ? `У вас есть бонус под id:${cartBonuses[0].id} вы достигли лимита бонусов`
              : null}
          </div>
          <div>Удалите бонус из корзины чтобы доавить новый</div>
        </div>
      ),
      buttons: [
        {
          type: 'outlined',
          text: 'Отмена',
          onClick: doCloseModals,
        },
        {
          type: 'contained',
          text: 'Удалить',
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

    doOpenModal('login');
  };

  const openBonus = () => {
    if (!isAuth) {
      doOpenModal('login');
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
      doOpenModal('login');
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
        <Button elType="outlined" className={styles.button} onClick={openDemoPlay}>
          Демо-игра
        </Button>
        <Button elType="contained" className={styles.button} onClick={openRealPlay}>
          Играть на деньги
        </Button>

        {game?.has_no_deposit_bonus && noDepositsBonuses.length > 0 ? (
          <Button
            className={classNames(styles.button, styles.button_big)}
            onClick={openNoDepositBonus}
          >
            <Icons icon="settings" />
            <span>Сконфигурировать бездеп бонус</span>
          </Button>
        ) : game?.has_bonus ? (
          <Button
            elType="outlined"
            className={classNames(styles.button, styles.button_big)}
            onClick={openBonus}
          >
            <Icons icon="settings" />
            <span>Сконфигурировать бонус</span>
          </Button>
        ) : null}
      </div>
      <div className={styles.winnings}>
        <WinningsList />
      </div>
      <div className={styles.description}>
        <div className={styles.description_title}>{game?.name}</div>
        <div className={styles.description_info}>
          {game &&
            game.data.texts?.find((item) => item.language.toLowerCase() === currentLanguage)?.value}
        </div>
      </div>
      <Footer />
      <AlertModal {...alertData} />
      <ModalZeroBalance close={doCloseModals} gameId={game?.id} />
    </div>
  );
};

export default Details;
