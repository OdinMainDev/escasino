import { Header } from '@/widgets/Header';
import styles from './styles.module.scss';
import { GamesList } from '@/widgets/GamesList';

const Games = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.games_table}>
        <GamesList />
      </div>
    </div>
  );
};

export default Games;
