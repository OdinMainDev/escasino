import Modal from '@/shared/ui/Modal';

import styles from './styles.module.scss';
import { IPaymentTransaction, IProviderLayout } from '@/features/Wallet/models/interfaces';
import QRCode from 'react-qr-code';
import Button from '@/shared/ui/Button';
import { useEffect, useRef } from 'react';
import Loader from '@/shared/ui/Loader';

import successIcon from '../../images/success.svg';
import { getTransactionType } from '../../helpers/payment';
import classNames from 'classnames';
import { IPaymentProviderLayout } from '@/shared/models/interfaces/paymentProviders';
interface IProps {
  close: () => void;
  isOpen: boolean;
  transaction?: IPaymentTransaction | null;
  loading: boolean;
  message?: string;
  isError?: boolean;
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
}

const AutoSubmitForm = ({ url, layout, selectedLayout }: IAutoSubmitFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <>
      <div className={styles.good_container}>
        <div className={styles.good_info}>
          <img alt="success" src={successIcon} className={styles.success_image} />
          <span className={styles.good_message}>Данные отправлены</span>
          <span className={styles.good_message_sub}>Желаем вам приятной игры!</span>
        </div>
        <Button onClick={close}>Вернуться к игре</Button>
      </div>
      <form method="POST" action={url} ref={formRef}>
        {selectedLayout.map((item, index) => (
          <input name={item.name} key={index} value={layout[item.name]} />
        ))}
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
    if (transaction) {
      if (getTransactionType(transaction) === 'first' && 'address' in transaction) {
        return (
          <>
            <div className={styles.title}>Данные платежа</div>
            <div className={styles.qr} ref={svgRef}>
              <QRCode size={130} value={transaction.address} />
            </div>
            <div className={styles.info}>
              <div
                className={styles.info_block}
                onClick={() => void copyTextToClipboard(transaction.amount)}
              >
                <div className="w-[100%] flex-1">
                  <div className={styles.subtitle}>Сумма</div>
                  <div className={styles.value}>{transaction.amount}</div>
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
                onClick={() => void copyTextToClipboard(transaction.address)}
              >
                <div className="w-[100%] flex-1">
                  <div className={styles.subtitle}>Адрес для пополнения</div>
                  <div className={styles.value}>{transaction.address}</div>
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

      if (getTransactionType(transaction) === 'second' && 'url' in transaction) {
        return <UrlPage url={transaction.url} closeModal={close} />;
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
