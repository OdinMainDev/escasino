import { Header } from '@/widgets/Header';
import styles from './styles.module.scss';
import { ProviderGames } from '@/widgets/ProviderGames';

const Games = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.games_table}>
        <ProviderGames />
      </div>
    </div>
  );
};

export default Games;
