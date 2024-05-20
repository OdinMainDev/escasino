import Modal from '@/shared/ui/Modal';

import styles from './styles.module.scss';
import { IPaymentTransaction } from '@/features/Wallet/models/interfaces';
import QRCode from 'react-qr-code';
import Button from '@/shared/ui/Button';
import { useRef } from 'react';
import Loader from '@/shared/ui/Loader';

interface IProps {
  close: () => void;
  isOpen: boolean;
  payment?: IPaymentTransaction | null;
  loading: boolean;
  message?: string;
  type?: 'payment' | 'good' | 'bad';
}

const SuccessPaymentModal = ({
  isOpen,
  close,
  payment,
  loading,
  type = 'payment',
  message,
}: IProps) => {
  const svgRef = useRef<HTMLDivElement>(null);

  const copyTextToClipboard = async (text: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        alert('Текст скопирован в буфер обмена!');
      } catch (err) {
        alert('Не удалось скопировать текст');
      }
    } else {
      alert('Clipboard API не доступен в вашем браузере.');
    }
  };

  const generateModal = () => {
    if (type === 'bad') {
      return (
        <div className={styles.error_container}>
          <div className={styles.error}>{message}</div>
          <Button className={styles.button} onClick={close}>
            Закрыть
          </Button>
        </div>
      );
    }
    if (type === 'payment') {
      if (payment) {
        return (
          <>
            <div className={styles.title}>Данные платежа</div>
            <div className={styles.qr} ref={svgRef}>
              <QRCode size={130} value={payment.address} />
            </div>
            <div className={styles.info}>
              <div
                className={styles.info_block}
                onClick={() => void copyTextToClipboard(payment.amount)}
              >
                <div className="w-[100%] flex-1">
                  <div className={styles.subtitle}>Сумма</div>
                  <div className={styles.value}>{payment.amount}</div>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 3H14.6C16.8402 3 17.9603 3 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C21 6.03969 21 7.15979 21 9.4V16.5M6.2 21H14.3C15.4201 21 15.9802 21 16.408 20.782C16.7843 20.5903 17.0903 20.2843 17.282 19.908C17.5 19.4802 17.5 18.9201 17.5 17.8V9.7C17.5 8.57989 17.5 8.01984 17.282 7.59202C17.0903 7.21569 16.7843 6.90973 16.408 6.71799C15.9802 6.5 15.4201 6.5 14.3 6.5H6.2C5.0799 6.5 4.51984 6.5 4.09202 6.71799C3.71569 6.90973 3.40973 7.21569 3.21799 7.59202C3 8.01984 3 8.57989 3 9.7V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21Z"
                    stroke="var(--secondary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className={styles.info_block}
                onClick={() => void copyTextToClipboard(payment.address)}
              >
                <div className="w-[100%] flex-1">
                  <div className={styles.subtitle}>Адрес для пополнения</div>
                  <div className={styles.value}>{payment.address}</div>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 3H14.6C16.8402 3 17.9603 3 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C21 6.03969 21 7.15979 21 9.4V16.5M6.2 21H14.3C15.4201 21 15.9802 21 16.408 20.782C16.7843 20.5903 17.0903 20.2843 17.282 19.908C17.5 19.4802 17.5 18.9201 17.5 17.8V9.7C17.5 8.57989 17.5 8.01984 17.282 7.59202C17.0903 7.21569 16.7843 6.90973 16.408 6.71799C15.9802 6.5 15.4201 6.5 14.3 6.5H6.2C5.0799 6.5 4.51984 6.5 4.09202 6.71799C3.71569 6.90973 3.40973 7.21569 3.21799 7.59202C3 8.01984 3 8.57989 3 9.7V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21Z"
                    stroke="var(--secondary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <Button onClick={close}>Закрыть</Button>
            <div className={styles.footer}>Когда средства поступят вы получите уведомление</div>
          </>
        );
      }
      return null;
    }
    if (type === 'good') {
      return (
        <div className={styles.good_container}>
          <div className={styles.good_info}>
            <svg
              width="55"
              height="55"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.999 20.1713V22.0113C41.9966 26.3242 40.6 30.5207 38.0177 33.975C35.4354 37.4293 31.8056 39.9563 27.6697 41.1791C23.5339 42.402 19.1135 42.2551 15.068 40.7605C11.0224 39.2659 7.56833 36.5035 5.22094 32.8855C2.87356 29.2674 1.75861 24.9875 2.04238 20.684C2.32615 16.3805 3.99344 12.284 6.79558 9.00547C9.59773 5.72696 13.3846 3.44209 17.5914 2.49162C21.7982 1.54114 26.1996 1.976 30.139 3.73133M41.999 5.99988L21.999 26.0199L15.999 20.0199"
                stroke="var(--secondary)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.good_message}>{message}</span>
          </div>
          <Button onClick={close}>Закрыть</Button>
        </div>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        {generateModal()}
        {loading && (
          <div className={styles.loader}>
            <div className="w-[100%] h-[100%] flex flex-col items-center justify-center gap-[10px]">
              <div className="w-[55px] h-[55px]">
                <Loader />
              </div>
              <div className={styles.loader_title}>Обработка платежа...</div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SuccessPaymentModal;
