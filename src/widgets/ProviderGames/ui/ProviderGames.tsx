'use client';

import { GamesTable } from '@/features/GamesTable';
import { getGamesApi } from '@/shared/api/gamesApi';
import { getProviderGames } from '@/shared/api/providersApi';
import { IGame } from '@/shared/models/interfaces/games';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './ProviderGames.module.scss';

const ProviderGames = () => {
  const searchParams = useSearchParams();
  const provider = searchParams.get('provider');
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      if (provider) {
        setGames(await getProviderGames(provider));
      } else {
        setGames(await getGamesApi({ limit: 'all' }));
      }
      setLoading(false);
    };

    void getGames();
  }, [provider]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.roulette_wheel}></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GamesTable games={games} />
    </div>
  );
};

export default ProviderGames;
