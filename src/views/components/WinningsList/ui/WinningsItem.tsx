import { IWinning } from '../models/interfaces';
import styles from './WinningsItem.module.scss';

const WinningsItem = (winning: IWinning) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{winning.title}</div>
      <div className={styles.prize}>{winning.prize} $</div>
    </div>
  );
};

export default WinningsItem;
