/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './styles.module.scss';

import { usePreloader } from '@/app/providers/PreloaderProvider';
// import { GamesGrid } from '@/widgets/Games/ui/Grid';
import GameLayout from '@/shared/ui/game';
import { getDemoApi } from '@/app/api/play/getDemo';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { getGameApi } from '@/app/api/games/getGameById';
import { useRouter } from '@/shared/helpers/navigation';
// import { isAppDebug } from '@/app/config/app';

export default function Demo() {
  const [demoUrl, setDemoUrl] = useState<string>('');
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const { id } = useParams();
  const { hidePreloader } = usePreloader();
  const { isAuth } = useAuthProvider();
  const router = useRouter();

  useEffect(() => {
    const getDemo = async () => {
      const isMobile = true;
      const data = await getDemoApi(Number(id), isAuth, isMobile);
      if (data.status > 200) {
        router.push('/');
        return;
      }
      setDemoUrl(data.url);
      hidePreloader();
    };

    const getHeader = async () => {
      const data = await getGameApi(Number(id));
      setHeaderTitle(data.game?.name ?? '');
      hidePreloader();
    };

    void getDemo();
    void getHeader();
  }, []);

  return (
    <GameLayout gameTitle={headerTitle}>
      <div className={styles.games_table}>
        {!demoUrl || demoUrl == '' ? (
          <div className={styles.not_found}>
            TODO: Идет загрузка игры тут прелоадер или что то такое
          </div>
        ) : (
          <div className={styles.game_frame}>
            <iframe src={demoUrl} />
          </div>
        )}
      </div>
    </GameLayout>
  );
}
