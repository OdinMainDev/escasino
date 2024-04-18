import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './styles.module.scss';

// import { GamesGrid } from '@/widgets/Games/ui/Grid';
import GameLayout from '@/shared/layouts/game';
import { getRealApi } from '@/app/api/play/getReal';
// import { useAuthProvider } from '@/app/providers/AuthProvider';
import { getGameApi } from '@/app/api/games/getGameById';
import { useRouter } from '@/shared/helpers/navigation';
import Loader from '@/shared/ui/Loader';
// import { isAppDebug } from '@/app/config/app';

export default function Real() {
  const [loading, setLoading] = useState(false);
  const [realUrl, setRealUrl] = useState<string>('');
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const { id } = useParams();
  const router = useRouter();
  useEffect(() => {
    const getReal = async () => {
      const isMobile = true;
      setLoading(true);
      const data = await getRealApi(Number(id), isMobile);
      setLoading(false);
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
        {loading ? (
          <div className={styles.not_found}>
            <Loader />
          </div>
        ) : (
          <div className={styles.game_frame}>{realUrl && <iframe src={realUrl} />}</div>
        )}
      </div>
    </GameLayout>
  );
}
