import styles from './BonusesGames.module.scss';
import { Game } from '@/entities/Game';
import { useRouter } from '@/shared/helpers/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IGame } from '@/shared/models/interfaces/game';
import { getGamesAllApi } from '@/app/api/games/getGamesAll';
import { PageHeader } from '@/widgets/Header';
import { useTranslation } from 'react-i18next';
const BonusesGames = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [bonusesGames, setBonusesGames] = useState<IGame[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getAllGames = async () => {
      const allGames = await getGamesAllApi();
      const games_ids = searchParams.getAll('game_ids[]');
      if (allGames.games && games_ids.length > 0) {
        const gamesIds = games_ids.map((item) => Number(item));
        setBonusesGames(allGames.games.filter((item) => gamesIds.includes(item.id)));
      }
    };
    void getAllGames();
  }, [searchParams]);
  return (
    <div className={styles.container}>
      <PageHeader title={t('bonusGames')} />
      <div className={styles.games}>
        {bonusesGames.map((item) => (
          <Game
            game={item}
            key={item.id}
            onClick={() => {
              router.push(`/bonus/${item.id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BonusesGames;
