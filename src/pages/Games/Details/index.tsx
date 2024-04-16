import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { IGame } from '@/shared/models/interfaces/game';
import { getGameApi } from '@/app/api/games/getGameById';
import GoBackButton from '@/shared/ui/GoBackButton';
import Icons from '@/shared/ui/Icons';
import Button from '@/shared/ui/Button';
import { WinningsList } from '@/widgets/WinningsList';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { useRouter } from '@/shared/helpers/navigation';
import { useModal } from '@/app/providers/ModalProvider';
import Footer from '@/widgets/Footer';
import { useAppSelector } from '@/store/hooks/redux';
import ModalZeroBalance from './ui/ModalZeroBalance';
import { gamesHeaderTypeCover } from '@/app/config/app';

const Details = () => {
  const [game, setGame] = useState<IGame | null>(null);
  const { id } = useParams();
  const { isAuth } = useAuthProvider();
  const router = useRouter();
  const { doOpenModal, doCloseModals } = useModal();
  const { user } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    const getGameById = async () => {
      const data = await getGameApi(Number(id));
      setGame(data?.game);
    };

    void getGameById();
  }, []);

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

  // TODOSELF: *для себя* сделать лоадер и дописать потом когда будет админка игры

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <div
          className={classNames(styles.header, {
            [styles.header_cover]: gamesHeaderTypeCover,
          })}
        >
          <GoBackButton />
          <div className={styles.provider_name}>{game?.game_provider}</div>
          <Icons icon="chat" />
        </div>
        <div
          className={classNames(styles.image_container, {
            [styles.cover]: gamesHeaderTypeCover,
          })}
        >
          {game?.image ? (
            <img
              src={game.image}
              alt={game.name}
              className={classNames(styles.image, {
                [styles.cover]: gamesHeaderTypeCover,
              })}
            />
          ) : (
            <img
              src={PlaceholderImage}
              alt={game?.name}
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
        {!game?.has_freerounds ? (
          ''
        ) : (
          <Button elType="outlined" className={classNames(styles.button, styles.button_big)}>
            <Icons icon="settings" />
            <span>Сконфигурировать бонус</span>
          </Button>
        )}
      </div>
      <div className={styles.winnings}>
        <WinningsList />
      </div>
      <div className={styles.description}>
        <div className={styles.description_title}>Monster Blox</div>
        <div className={styles.description_info}>
          Heroes gather at the old tavern where the bounty for hunting them down are on display and
          for the taken. The rewards are grand for the bravest warriors, those who can take down the
          biggest ones.
        </div>
      </div>
      <Footer isHidden={!isAuth} />
      <ModalZeroBalance close={doCloseModals} gameId={game?.id} />
    </div>
  );
};

export default Details;
