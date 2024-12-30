import { IWinning } from '../models/interfaces';
import styles from './WinningsItem.module.scss';

const WinningsItem = (winning: IWinning) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{winning.username}</div>
      <div className={styles.prize}>
        {winning.win} {winning.currency}
      </div>
    </div>
  );
};

export default WinningsItem;
