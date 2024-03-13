import classNames from 'classnames';
import { useState } from 'react';

import styles from './FooterSelect.module.scss';
import { usePreloader } from '@/app/providers/PreloaderProvider';
import { useAppSelector } from '@/store/hooks/redux';

const FooterSelect = () => {
  const { user, loading } = useAppSelector((state) => state.userReducer);
  const { hidePreloader } = usePreloader();
  const [openBalance, setIsOpenBalance] = useState<boolean>(false);
  if (!user || loading) {
    return null;
  }
  hidePreloader();
  return (
    <div
      className={classNames(styles.container, {
        [styles.active]: openBalance,
      })}
      onClick={() => setIsOpenBalance((prev) => !prev)}
    >
      <div className={styles.menu}>
        <div className={styles.menu_item}>
          <div className={styles.label}>Реальный счет</div>
          <div className={styles.menu_balace}>
            {user.balance.balance_real} {user.balance.currency}
          </div>
        </div>
        <div className={styles.menu_item}>
          <div className={styles.label}>Бонусный счет</div>
          <div className={styles.menu_balace}>
            {user.balance.balance_bonus} {user.balance.currency}
          </div>
        </div>
        <div className={styles.menu_item}>
          <div className={styles.label}>Вейджер</div>
          <div className={styles.menu_balace}>
            {user.balance.wager} {user.balance.currency}
          </div>
        </div>
      </div>

      <div className={styles.label}>Баланс</div>
      <div className={styles.balance}>
        {user.balance.wager} {user.balance.currency}
      </div>
      <div className={styles.arrow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="#000"
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="#A3A3A3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default FooterSelect;
