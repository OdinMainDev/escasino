import { getWinningsList } from '../api/winnningsApi';
import WinningsItem from './WinningsItem';
import styles from './WinningsList.module.scss';

const WinningsList = () => {
  const winnings = getWinningsList();

  // TODO: сделать тут прокрутку ( карусельку )
  return (
    <div className={styles.container}>
      <div className={styles.title}>Последние выигрыши</div>
      <div className={styles.list}>
        {winnings.map((item, index) => (
          <WinningsItem {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default WinningsList;
