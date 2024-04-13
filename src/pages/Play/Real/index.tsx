/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './styles.module.scss';

// import { GamesGrid } from '@/widgets/Games/ui/Grid';
import GameLayout from '@/shared/layouts/game';
import { getRealApi } from '@/app/api/play/getReal';
// import { useAuthProvider } from '@/app/providers/AuthProvider';
import { getGameApi } from '@/app/api/games/getGameById';
import { useRouter } from '@/shared/helpers/navigation';
// import { isAppDebug } from '@/app/config/app';

export default function Real() {
  const [realUrl, setRealUrl] = useState<string>('');
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const getReal = async () => {
      const isMobile = true;
      const data = await getRealApi(Number(id), isMobile);
      if (data.status > 200) {
        router.push('/');
        return;
      }
      setRealUrl(data.url);
    };

    const getHeader = async () => {
      const data = await getGameApi(Number(id));
      setHeaderTitle(data.game?.name ?? '');
    };

    void getReal();
    void getHeader();
  }, []);

  return (
    <GameLayout gameTitle={headerTitle}>
      <div className={styles.games_table}>
        {!realUrl || realUrl == '' ? (
          <div className={styles.not_found}>
            TODO: Идет загрузка игры тут прелоадер или что то такое
          </div>
        ) : (
          <div className={styles.game_frame}>
            <iframe src={realUrl} />
          </div>
        )}
      </div>
    </GameLayout>
  );
}
