import styles from './WalletHistoryItem.module.scss';

const WalletHistoryItem = () => {
  return (
    <div className={styles.container}>
      <div className="flex justify-between mb-[16px]">
        <div className={styles.status}>В обработке</div>
        <div className={styles.cancel}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 7L7 17M7 7L17 17"
              stroke="white"
              strokeOpacity="0.87"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Отменить</span>
        </div>
      </div>
      <div className="flex justify-between mb-[16px]">
        <div className={styles.data}>
          <div className={styles.label}>Дата</div>
          <div className={styles.value}>05.12.2024, 22:56</div>
        </div>
        <div className={styles.data}>
          <div className={styles.label}>Сумма</div>
          <div className={styles.value}>10 000,00 RUB</div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className={styles.data}>
          <div className={styles.label}>Тип</div>
          <div className={styles.value}>Вывод средств</div>
        </div>
        <div className={styles.data}>
          <div className={styles.label}>Платежная система</div>
          <div className={styles.value}>Visa / Mastercard</div>
        </div>
      </div>
    </div>
  );
};

export default WalletHistoryItem;
