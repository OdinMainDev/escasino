import { useTranslation } from 'react-i18next';
import { getWinningsList } from '../api/winnningsApi';
import { settings } from '../settings';
import WinningsItem from './WinningsItem';
import styles from './WinningsList.module.scss';
import Slider from 'react-slick';

const WinningsList = () => {
  const { t } = useTranslation();
  const winnings = getWinningsList();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('lastWins')}</div>
      <Slider className={styles.list} {...settings}>
        {winnings.map((item, index) => (
          <div className={styles.item} key={index}>
            <WinningsItem {...item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WinningsList;
