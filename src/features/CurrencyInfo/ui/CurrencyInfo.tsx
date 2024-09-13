import classNames from 'classnames';
import { useState } from 'react';

import styles from './CurrencyInfo.module.scss';
import { useAppSelector } from '@/store/hooks/redux';

const CurrencyInfo = ({ isPhoneHorizontal }: { isPhoneHorizontal?: boolean }) => {
  const { user } = useAppSelector((state) => state.userReducer);
  const [openBalance, setIsOpenBalance] = useState<boolean>(false);
  return (
    <div
      className={classNames(styles.container, {
        [styles.active]: openBalance,
        [styles.isPhoneHorizontal]: isPhoneHorizontal,
      })}
      onClick={() => setIsOpenBalance((prev) => !prev)}
    >
      <div className={styles.menu}>
        <div className={styles.menu_item}>
          <div className={styles.label}>Реальный счет</div>
          <div className={styles.menu_balace}>
            {user?.balance.formatted_balance_real || 0} {user?.balance.currency}
          </div>
        </div>
        <div className={styles.menu_item}>
          <div className={styles.label}>Бонусный счет</div>
          <div className={styles.menu_balace}>
            {user?.balance.formatted_balance_bonus || 0} {user?.balance.currency}
          </div>
        </div>
        <div className={styles.menu_item}>
          <div className={styles.label}>Вейджер</div>
          <div className={styles.menu_balace}>
            {user?.balance.formatted_wager || 0} {user?.balance.currency}
          </div>
        </div>
        <div className={styles.menu_arrow}>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="var(--secondary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className={styles.label}>Баланс</div>
      <div className={styles.balance}>
        {(user?.balance.formatted_balance_real || 0) + (user?.balance.formatted_balance_bonus || 0)}{' '}
        {user?.balance.currency}
      </div>
      <div className={styles.arrow}>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="var(--secondary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default CurrencyInfo;
