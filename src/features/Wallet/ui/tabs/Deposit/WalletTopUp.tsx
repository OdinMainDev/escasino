import Button from '@/shared/components/Button';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { TabItem } from '@/shared/components/TabItem';
import { TabBlock } from '@/shared/components/TabBlock';
import Input from '@/shared/components/Input';

const WalletTopUp = () => {
  const [paymentMethod, setPaymentMethod] = useState([
    {
      label: 'Банковские карты',
      value: 'bank',
      selected: false,
    },
    {
      label: 'Электронные кошельки',
      value: 'ele',
      selected: false,
    },
  ]);

  const selectPaymentMethod = (value: string) => {
    setPaymentMethod((prev) =>
      prev.map((item) => {
        if (item.value === value) {
          return {
            ...item,
            selected: true,
          };
        }
        return {
          ...item,
          selected: false,
        };
      }),
    );
  };

  return (
    <div className={styles.content}>
      <Button className={styles.button}>
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="#000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 5V21M11.5 5H7.96429C7.44332 5 6.9437 4.78929 6.57533 4.41421C6.20695 4.03914 6 3.53043 6 3C6 2.46957 6.20695 1.96086 6.57533 1.58579C6.9437 1.21071 7.44332 1 7.96429 1C10.7143 1 11.5 5 11.5 5ZM11.5 5H15.0357C15.5567 5 16.0563 4.78929 16.4247 4.41421C16.793 4.03914 17 3.53043 17 3C17 2.46957 16.793 1.96086 16.4247 1.58579C16.0563 1.21071 15.5567 1 15.0357 1C12.2857 1 11.5 5 11.5 5ZM19.5 10V17.8C19.5 18.9201 19.5 19.4802 19.282 19.908C19.0903 20.2843 18.7843 20.5903 18.408 20.782C17.9802 21 17.4201 21 16.3 21H6.7C5.57989 21 5.01984 21 4.59202 20.782C4.21569 20.5903 3.90973 20.2843 3.71799 19.908C3.5 19.4802 3.5 18.9201 3.5 17.8V10M1.5 6.6V8.4C1.5 8.96005 1.5 9.24008 1.60899 9.45399C1.70487 9.64215 1.85785 9.79513 2.04601 9.89101C2.25992 10 2.53995 10 3.1 10H19.9C20.4601 10 20.7401 10 20.954 9.89101C21.1422 9.79513 21.2951 9.64215 21.391 9.45399C21.5 9.24008 21.5 8.96005 21.5 8.4V6.6C21.5 6.03995 21.5 5.75992 21.391 5.54601C21.2951 5.35785 21.1422 5.20487 20.954 5.10899C20.7401 5 20.4601 5 19.9 5H3.1C2.53995 5 2.25992 5 2.04601 5.10899C1.85785 5.20487 1.70487 5.35785 1.60899 5.54601C1.5 5.75992 1.5 6.03995 1.5 6.6Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Играть с бонусом
      </Button>
      <div className={styles.block}>
        <div className={styles.title}>Способ оплаты</div>
        <div className={styles.slider}>
          {paymentMethod.map((item, index) => (
            <TabItem
              selected={item.selected}
              onClick={() => selectPaymentMethod(item.value)}
              key={index}
            >
              {item.label}
            </TabItem>
          ))}
        </div>
        <div className={styles.cards}>
          <TabBlock selected>
            <svg
              width="51"
              height="16"
              viewBox="0 0 51 16"
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_222_572)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M36.7235 0.659403C35.931 0.346017 34.674 0 33.1197 0C29.1519 0 26.3579 2.10895 26.3407 5.12412C26.3078 7.3487 28.3412 8.58429 29.8621 9.32603C31.4165 10.084 31.9449 10.5787 31.9449 11.2543C31.9291 12.2919 30.6888 12.7702 29.532 12.7702C27.9279 12.7702 27.0684 12.5236 25.7622 11.9463L25.2331 11.6989L24.6709 15.1757C25.6132 15.6036 27.3494 15.9834 29.1519 16C33.3678 16 36.1124 13.9237 36.145 10.7105C36.161 8.94739 35.0873 7.59639 32.7724 6.49242C31.3671 5.78374 30.5065 5.30589 30.5065 4.58078C30.523 3.9216 31.2344 3.24643 32.8207 3.24643C34.1269 3.21336 35.0866 3.52631 35.8136 3.83947L36.177 4.00394L36.7235 0.659403ZM22.1585 15.7692H18.1406L20.6537 0.280762H24.6714L22.1585 15.7692ZM47.0236 0.280273H43.9157C42.9573 0.280273 42.2292 0.560153 41.8157 1.56535L35.8477 15.7685H40.0635C40.0635 15.7685 40.7576 13.8568 40.9068 13.4451H46.0654C46.1808 13.9889 46.5448 15.7685 46.5448 15.7685H50.265L47.0236 0.280273ZM42.0637 10.2802C42.3946 9.39045 43.6678 5.9467 43.6678 5.9467C43.6611 5.96002 43.7133 5.8157 43.7911 5.6009L43.7914 5.6L43.7917 5.59916L43.7919 5.59868C43.9072 5.28 44.0782 4.80753 44.1965 4.46387L44.4773 5.79844C44.4773 5.79844 45.2381 9.50586 45.4034 10.2802H42.0637ZM14.7851 0.280792L10.8502 10.8424L10.4203 8.70092C10.4204 8.70097 10.4204 8.70101 10.4204 8.70105L9.0151 1.58274C8.78375 0.593521 8.07276 0.313423 7.19654 0.280792H0.732149L0.666016 0.593741C2.24258 0.995586 3.65268 1.57464 4.88823 2.29461L8.4694 15.7528H12.7182L19.0336 0.280792H14.7851Z"
                  fill="#121212"
                />
              </g>
              <defs>
                <clipPath id="clip0_222_572">
                  <rect width="51" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </TabBlock>
          <TabBlock>
            <svg
              width="56"
              height="16"
              viewBox="0 0 56 16"
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0899 0.0069873V0H20.0737V15.9999H15.0899V6.50475H14.6746L11.7674 15.9999H8.30638L5.39915 6.49776H5.19149H4.98383V15.9999H0V0H4.98383C4.98383 0 7.17117 -0.00698642 7.75262 2.09605C8.29253 4.05936 9.82921 9.50211 9.82921 9.50211H10.2445C10.2861 9.35538 11.7881 4.03141 12.3211 2.10304C12.9014 0.00425428 15.0742 0.00696767 15.0899 0.00698723L15.0899 0.0069873ZM31.1486 1.67684C31.8339 0.13275 33.2944 0 33.2944 0H38.0014V15.9999H33.0175V6.49776H32.6022L29.1412 14.323C28.4559 15.8601 26.9262 15.9999 26.9262 15.9999H22.2192V0H27.2031V9.50211H27.6184L31.1486 1.67684ZM40.2168 7.2666V16.0002H45.2006V10.8998H50.5998C52.9532 10.8998 54.9468 9.38362 55.6874 7.2666H40.2168ZM39.5176 0H50.5997C53.583 0 55.9988 2.43841 55.9988 5.44974C55.9988 5.83401 55.9642 6.20432 55.8881 6.56763H47.3463C46.6265 6.56763 45.9273 6.46982 45.2628 6.28816C42.3348 5.49166 40.0713 3.04626 39.5176 0Z"
                fill="#E1E1E1"
              />
            </svg>
          </TabBlock>
        </div>
      </div>
      <div className={styles.scroll}></div>
      <div className={classNames(styles.block, styles.block_line)}>
        <div className="mb-[16px]">
          <div className={styles.title}>Данные карты</div>
          <Input placeholder="Номер карты" />
        </div>
        <div className={styles.title}>Срок действия</div>
        <div className="flex gap-[16px]">
          <Input placeholder="Месяц" />
          <Input placeholder="Год" />
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.title}>Сумма депозита</div>
        <Input placeholder="Сумма" />
      </div>
      <Button className={styles.button}>Пополнить счет</Button>
    </div>
  );
};

export default WalletTopUp;
