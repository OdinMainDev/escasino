import classNames from 'classnames';
import { useState } from 'react';

import styles from './CurrencyInfo.module.scss';
import { useAppSelector } from '@/store/hooks/redux';
import useBrowserInfo from '@/shared/hooks/useBrowserInfo';
import { useTranslation } from 'react-i18next';
import { ProgressBar } from '@/entities/ProgressBar';

const CurrencyInfo = ({ isPhoneHorizontal }: { isPhoneHorizontal?: boolean }) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.userReducer);
  const [openBalance, setIsOpenBalance] = useState<boolean>(false);
  const browserInfo = useBrowserInfo();
  let currentWagerPercent = user
    ? Number(
        (
          ((user.balance.wager_total.formatted -
            (user.balance.wager_bonus.formatted + user.balance.wager_payment.formatted)) /
            user.balance.wager_total.formatted) *
          100
        ).toFixed(0),
      )
    : 0;
  currentWagerPercent = Number(currentWagerPercent) > 0 ? currentWagerPercent : 1;
  return (
    <div
      className={classNames(styles.container, {
        [styles.active]: openBalance,
        [styles.isPhoneHorizontal]: isPhoneHorizontal,
        [styles.isMobileSafari]: browserInfo.name === 'Safari' && isPhoneHorizontal,
      })}
      onClick={() => setIsOpenBalance((prev) => !prev)}
    >
      <div className={styles.menu}>
        <div className={styles.menu_item}>
          <div className={styles.label}>{t('realAccount')}</div>
          <div className={styles.menu_balace}>
            {user?.balance.formatted_balance_real || 0} {user?.balance.currency}
          </div>
        </div>
        <div className={styles.menu_item}>
          <div className={styles.label}>{t('bonusAccount')}</div>
          <div className={styles.menu_balace}>
            {user?.balance.formatted_balance_bonus || 0} {user?.balance.currency}
          </div>
        </div>
        <div className={styles.menu_item}>
          <div className={styles.label}>{t('wagerBonus')}</div>
          <div className={styles.menu_balace}>
            {user?.balance.wager_bonus.formatted || 0} {user?.balance.currency}
          </div>
        </div>
        <div className={styles.menu_item}>
          <div className={styles.label}>{t('wagerPayment')}</div>
          <div className={styles.menu_balace}>
            {user?.balance.wager_payment.formatted || 0} {user?.balance.currency}
          </div>
        </div>
        <div className={styles.menu_item}>
          <div className={styles.label}>
            {t('wager')}{' '}
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2" r="2" fill="#71717A" />
            </svg>
            {currentWagerPercent}%
          </div>
          <div className={styles.menu_balace}>
            {Number(user?.balance.wager_bonus.formatted) +
              Number(user?.balance.wager_payment.formatted) || 0}{' '}
            {user?.balance.currency}/{user?.balance.wager_total.formatted || 0}{' '}
            {user?.balance.currency}
          </div>
          <ProgressBar className="h-[2px] mt-[8px]" progress={currentWagerPercent} />
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

      <div className={styles.label}>{t('balance')}</div>
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
