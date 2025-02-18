/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from '../styles.module.scss';

// import { GamesGrid } from '@/widgets/Games/ui/Grid';
import GameLayout from '@/shared/layouts/game';
import { getDemoApi } from '@/app/api/play/getDemo';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { getGameApi } from '@/app/api/games/getGameById';
import { useRouter } from '@/shared/helpers/navigation';
import { isAppDebug } from '@/app/config/app';
import Loader from '@/shared/ui/Loader';
import ModalOpenReal from './ui/ModalOpenReal';
import { useModal } from '@/app/providers/ModalProvider';
import classNames from 'classnames';
import useOrientation from '@/shared/hooks/useOrientation';

export default function Demo() {
  const [demoUrl, setDemoUrl] = useState<string>('');
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const { id } = useParams();
  const { doOpenModal, doCloseModals } = useModal();
  const { isAuth } = useAuthProvider();
  const router = useRouter();
  const { isMobile, isPortrait } = useOrientation();

  useEffect(() => {

    const getDemo = async () => {
      const isMobile = true;
      const data = await getDemoApi(Number(id), isAuth, isMobile);
      if (isAppDebug) {
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        await sleep(5000);
      }
      if (data.status > 200) {
        router.push('/');
        return;
      }
      setDemoUrl(data.url);
    };

    const getHeader = async () => {
      const data = await getGameApi(Number(id));
      setHeaderTitle(data.game?.name ?? '');
    };

    setTimeout(
      () => {
        doOpenModal('alert');
      },
      isAppDebug ? 5000 : 5000,
    );

    void getDemo();
    void getHeader();
  }, []);

  return (
    <GameLayout gameTitle={headerTitle}>
      <>
        <div
          className={classNames(styles.games_table, {
            [styles.isPhoneHorizontal]: isMobile && !isPortrait,
            [styles.isPhone]: isMobile && isPortrait,
          })}
        >
          {!demoUrl || demoUrl == '' ? (
            <div className={styles.not_found}>
              <Loader />
            </div>
          ) : (
            <div className={styles.game_frame}>
              <iframe src={demoUrl} />
            </div>
          )}
        </div>
        <ModalOpenReal close={doCloseModals} gameId={parseInt(id ?? '0')} />
      </>
    </GameLayout>
  );
}
