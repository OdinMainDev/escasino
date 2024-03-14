/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { IGame } from '@/entities/game';
import { usePreloader } from '@/app/providers/PreloaderProvider';
import { getGameApi } from '@/app/api/games/getGameById';
import GoBackButton from '@/shared/components/GoBackButton';
import Icons from '@/shared/components/Icons';
import Button from '@/shared/components/Button';
import { WinningsList } from '@/widgets/WinningsList';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { useRouter } from '@/shared/helpers/navigation';
import { useModal } from '@/app/providers/ModalProvider';
import Footer from '@/widgets/Footer';
import { useAppSelector } from '@/store/hooks/redux';
import ModalZeroBalance from './ui/ModalZeroBalance';

const Details = () => {
  const [game, setGame] = useState<IGame | null>(null);
  const { id } = useParams();
  const { hidePreloader } = usePreloader();
  const { isAuth } = useAuthProvider();
  const router = useRouter();
  const { doOpenModal, doCloseModals } = useModal();
  const { user } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    const getGameById = async () => {
      const data = await getGameApi(Number(id));
      setGame(data?.game);
      hidePreloader();
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

  // TODO: виннер лист слайдер
  // TODO: исправить изображение ( размер не тот, сделать железобетонно чтобы размер контейнера не зависил от размера изображения )
  // TODO: а само изображение background-size: cover;
  // TODO: исправить как текст показывается ( заголовок и описание игры ( у дизайна отступы больше, да и как будто бы шрифты не подтянулись ) )
  // TODO: сделать в общем все красиво как по дизайну для блека изначально а дальше уже то что ниже пишу
  // так же тут на футер идет педдинг или что это

  // TODO: сделать второй вариант шапки, где картинка задний фон на 100% ширины и адекватно высоту подобрать, шапка на нее накладывается
  // и в том же месте находится, но как она будет подсвечиваться хз ( то есть она без бг )
  // низ картинки должен уходить в затемнение или засветление ( в белый если белая тема в темный если темная ) она должна тоже из конфига переключаться
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton />
        <div className={styles.provider_name}>{game?.game_provider}</div>
        <Icons icon="chat" />
      </div>
      <div className={styles.image_container}>
        {game?.image ? (
          <img src={game.image} alt={game.name} className={styles.image} />
        ) : (
          <img src={PlaceholderImage} alt={game?.name} className={styles.image} />
        )}
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
