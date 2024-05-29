import Modal from '@/shared/ui/Modal';

import styles from './styles.module.scss';
import {
  IPaymentData,
  IPaymentTransaction,
  IPaymentTransactionFirst,
  IPaymentTransactionRequisites,
  IProviderLayout,
} from '@/features/Wallet/models/interfaces';
import QRCode from 'react-qr-code';
import Button from '@/shared/ui/Button';
import { useEffect, useRef, useState } from 'react';
import Loader from '@/shared/ui/Loader';

import successIcon from '../../images/success.svg';
import { getTransactionType } from '../../helpers/payment';
import classNames from 'classnames';
import {
  IPaymentProvider,
  IPaymentProviderLayout,
} from '@/shared/models/interfaces/paymentProviders';
import { useAppSelector } from '@/store/hooks/redux';
interface IProps {
  close: () => void;
  isOpen: boolean;
  transaction?: IPaymentTransaction | null;
  loading: boolean;
  message?: string;
  selectedProvider?: IPaymentProvider | null;
  isError?: boolean;
  paymentData?: IPaymentData | null;
  amount?: number;
  layout?: IProviderLayout;
  selectedLayout?: IPaymentProviderLayout[] | null;
}

interface IUrlPageProps {
  url: string;
  closeModal: () => void;
}

const UrlPage = ({ url, closeModal }: IUrlPageProps) => {
  useEffect(() => {
    setTimeout(() => {
      window.open(url, '_blank');
      closeModal();
    }, 3000);
  }, [closeModal, url]);

  return (
    <div className={styles.loader}>
      <div className="w-[100%] h-[100%] flex flex-col items-center justify-center gap-[10px]">
        <div className="w-[55px] h-[55px]">
          <Loader />
        </div>
        <div className={styles.loader_title}>Идет переадресация...</div>
      </div>
    </div>
  );
};

interface IAutoSubmitFormProps {
  url: string;
  layout: IProviderLayout;
  selectedLayout: IPaymentProviderLayout[];
  amount: number;
}

const AutoSubmitForm = ({ url, layout, selectedLayout, amount }: IAutoSubmitFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <>
      <form method="POST" action={url} ref={formRef} style={{ display: 'none' }}>
        {selectedLayout.map((item, index) => (
          <input name={item.name} key={index} value={layout[item.name]} readOnly />
        ))}
        <input name="amount" value={amount} readOnly />
      </form>
    </>
  );
};
const SuccessPaymentModal = ({
  isOpen,
  close,
  transaction,
  loading,
  message,
  isError,
  layout,
  selectedLayout,
  amount = 0,
  selectedProvider,
  paymentData,
}: IProps) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const { staticSettings } = useAppSelector((state) => state.staticSettingsReducer);
  const [timer, setTimer] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
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

  useEffect(() => {
    if (paymentData && staticSettings) {
      intervalRef.current = window.setInterval(() => {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const expirationTime = paymentData.created_at + staticSettings.finances.payments_life_time;
        const remainingTime = expirationTime - currentTimeInSeconds;

        if (remainingTime <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setTimer(0);
        } else {
          setTimer(remainingTime);
        }
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [paymentData, staticSettings]);

  function formatSecondsToTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const generateModal = () => {
    if (transaction) {
      if (getTransactionType(transaction) === 'first') {
        const item = transaction as IPaymentTransactionFirst;

        return (
          <div className={styles.card}>
            <div className={styles.card_title}>Оплата заказа</div>
            <div className={styles.card_subtitle}>
              Переводите {item.amount} {item.currency} на номер карты из формы ниже
            </div>
            <div className={styles.qr} ref={svgRef}>
              <QRCode size={130} value={item.address} />
            </div>
            <div className={styles.card_block}>
              <div className="flex items-center justify-between mb-[24px]">
                {selectedProvider && (
                  <img className={styles.card_logo} src={selectedProvider.meta.image} />
                )}
              </div>
              <div
                className={styles.card_item}
                onClick={() => void copyTextToClipboard(item.address)}
              >
                <div className="flex items-center justify-between">
                  <div className="w-[100%]">
                    <div className={styles.card_label}>Адрес</div>
                    <div className={styles.card_value}>{item.address}</div>
                  </div>
                  <div>
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
              </div>
              <div
                className={styles.card_item}
                onClick={() => void copyTextToClipboard(item.amount.toString())}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={styles.card_label}>Сумма</div>
                    <div className={styles.card_value}>
                      {item.amount} {item.currency}
                    </div>
                  </div>
                  <div>
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
              </div>
            </div>
            {staticSettings && (
              <div className={styles.card_subtitle}>Время оплаты: {formatSecondsToTime(timer)}</div>
            )}
            {paymentData && (
              <div
                className={classNames(
                  styles.card_subtitle,
                  'inline-block w-[100%] text-ellipsis	overflow-hidden whitespace-nowrap',
                )}
              >
                ID: {paymentData.hash}
              </div>
            )}
            <Button className="w-[100%] uppercase" onClick={close}>
              Я оплатил
            </Button>
            <div className={styles.footer}>Когда средства поступят вы получите уведомление</div>
          </div>
        );
      }

      if (getTransactionType(transaction) === 'second' && 'url' in transaction) {
        return <UrlPage url={transaction.url} closeModal={close} />;
      }

      if (getTransactionType(transaction) === 'requisites') {
        const item = transaction as IPaymentTransactionRequisites;
        return (
          <div className={styles.card}>
            <div className={styles.card_title}>Оплата заказа</div>
            <div className={styles.card_subtitle}>
              Переводите {item.amount} {item.currency} на номер карты из формы ниже
            </div>
            <div className={styles.card_block}>
              <div className="flex items-center justify-between mb-[24px]">
                {item.image ? (
                  <img className={styles.card_logo} src={item.image} />
                ) : selectedProvider ? (
                  <img className={styles.card_logo} src={selectedProvider.meta.image} />
                ) : null}
                <svg
                  width="26"
                  height="22"
                  viewBox="0 0 26 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.875 3.62494C0.875 1.96809 2.21815 0.624939 3.875 0.624939H23.0001C24.6569 0.624939 26.0001 1.96808 26.0001 3.62494V18.375C26.0001 20.0319 24.6569 21.375 23.0001 21.375H3.875C2.21815 21.375 0.875 20.0319 0.875 18.375V3.62494ZM3.875 2.62494C3.32272 2.62494 2.875 3.07265 2.875 3.62494V4.99996H7.50002C7.76524 4.99996 8.01959 5.10531 8.20713 5.29285L10.7066 7.79236C11.0984 7.60486 11.5371 7.49985 12.0003 7.49985H12.4375V2.62494H3.875ZM14.4375 2.62494V7.49985H14.8754C15.3263 7.49985 15.754 7.59933 16.1377 7.77754L18.6744 5.28645C18.8614 5.10283 19.113 4.99996 19.3751 4.99996H24.0001V3.62494C24.0001 3.07266 23.5524 2.62494 23.0001 2.62494H14.4375ZM24.0001 6.99996H19.784L17.5682 9.17586C17.6944 9.43208 17.7851 9.70892 17.8339 9.99997H24.0001V6.99996ZM24.0001 12H17.8339C17.787 12.2795 17.7014 12.5459 17.5829 12.7936L19.7893 15H24.0001V12ZM24.0001 17H19.3751C19.1099 17 18.8555 16.8946 18.668 16.7071L16.1685 14.2076C15.7769 14.395 15.3384 14.4999 14.8754 14.4999H14.4375V19.375H23.0001C23.5524 19.375 24.0001 18.9273 24.0001 18.375V17ZM12.4375 19.375V14.4999H12.0003C11.5371 14.4999 11.0985 14.3949 10.7068 14.2074L8.20713 16.7071C8.01959 16.8946 7.76524 17 7.50002 17H2.875V18.375C2.875 18.9273 3.32272 19.375 3.875 19.375H12.4375ZM2.875 15H7.08581L9.29265 12.7931C9.17422 12.5456 9.08873 12.2794 9.04185 12H2.875V15ZM2.875 9.99997H9.04181C9.08867 9.72057 9.17415 9.45426 9.29258 9.20673L7.08581 6.99996H2.875V9.99997ZM12.0003 9.49985C11.4481 9.49985 11.0003 9.94757 11.0003 10.4999V11.4999C11.0003 12.0522 11.4481 12.4999 12.0003 12.4999H14.8754C15.4277 12.4999 15.8754 12.0522 15.8754 11.4999V10.4999C15.8754 9.94757 15.4277 9.49985 14.8754 9.49985H12.0003Z"
                    fill="var(--secondary)"
                  />
                </svg>
              </div>
              <div
                className={styles.card_item}
                onClick={() => void copyTextToClipboard(item.requisites)}
              >
                <div className="flex items-center justify-between">
                  <div className="w-[100%]">
                    <div className={styles.card_label}>Номер карты</div>
                    <div className={styles.card_value}>{item.requisites}</div>
                  </div>
                  <div>
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
              </div>
              <div
                className={styles.card_item}
                onClick={() => void copyTextToClipboard(item.amount.toString())}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={styles.card_label}>Сумма</div>
                    <div className={styles.card_value}>
                      {item.amount} {item.currency}
                    </div>
                  </div>
                  <div>
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
              </div>
            </div>
            {staticSettings && (
              <div className={styles.card_subtitle}>Время оплаты: {formatSecondsToTime(timer)}</div>
            )}
            {paymentData && <div className={styles.card_subtitle}>ID: {paymentData.hash}</div>}
            <Button className="w-[100%] uppercase" onClick={close}>
              Я оплатил
            </Button>
            <div className={styles.footer}>Инструкция как оплатить</div>
          </div>
        );
      }

      if (getTransactionType(transaction) === 'paymentAccepted') {
        return (
          <div className={styles.good_container}>
            <div className={styles.good_info}>
              <img alt="success" src={successIcon} className={styles.success_image} />
              <span className={classNames(styles.good_message, 'text-center')}>
                Оплата произведена, ожидаем ответа от мерчанта
              </span>
            </div>
            <Button onClick={close}>Закрыть</Button>
          </div>
        );
      }

      if (
        getTransactionType(transaction) === 'acs_url' &&
        'acs_url' in transaction &&
        layout &&
        selectedLayout
      ) {
        return (
          <AutoSubmitForm
            amount={amount}
            url={transaction.acs_url}
            layout={layout}
            selectedLayout={selectedLayout}
          />
        );
      }

      if (getTransactionType(transaction) === 'success') {
        return (
          <div className={styles.good_container}>
            <div className={styles.good_info}>
              <img alt="success" src={successIcon} className={styles.success_image} />
              <span className={styles.good_message}>{message}</span>
              <span className={styles.good_message_sub}>Желаем вам приятной игры!</span>
            </div>
            <Button onClick={close}>Вернуться к игре</Button>
          </div>
        );
      }

      return null;
    }
    return (
      <div className={styles.good_container}>
        <div className={styles.good_info}>
          <img alt="success" src={successIcon} className={styles.success_image} />
          <span className={styles.good_message}>{message}</span>
          <span className={styles.good_message_sub}>Желаем вам приятной игры!</span>
        </div>
        <Button onClick={close}>Вернуться к игре</Button>
      </div>
    );
  };

  if (isError) {
    return (
      <Modal isOpen={isOpen} close={close}>
        <div className={styles.container}>
          <div className={styles.error_container}>
            <div className={styles.error}>{message}</div>
            <Button className={styles.button} onClick={close}>
              Закрыть
            </Button>
          </div>
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
  }

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}>
            <div className="w-[100%] h-[100%] flex flex-col items-center justify-center gap-[10px]">
              <div className="w-[55px] h-[55px]">
                <Loader />
              </div>
              <div className={styles.loader_title}>Обработка платежа...</div>
            </div>
          </div>
        ) : (
          generateModal()
        )}
      </div>
    </Modal>
  );
};

export default SuccessPaymentModal;
