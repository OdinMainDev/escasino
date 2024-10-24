import Modal from '@/shared/ui/Modal';
import styles from './ConfirmModal.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Button from '@/shared/ui/Button';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  close: () => void;
}

const ModalContent = (props: { modalName: string }) => {
  const { t } = useTranslation();
  const [activeIcon, setActiveIcon] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setActiveIcon(true);
    }, 200);
  }, []);
  const generateText = (modalName: string): string | null => {
    switch (modalName) {
      case 'reset-send-complete':
        return t('newPasswordSendMail');
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <svg
          className={classNames({
            [styles.active]: activeIcon,
          })}
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M43.9999 22.1724V24.0124C43.9974 28.3253 42.6009 32.5218 40.0185 35.9761C37.4362 39.4304 33.8064 41.9574 29.6706 43.1802C25.5347 44.4031 21.1144 44.2562 17.0688 42.7616C13.0232 41.267 9.56919 38.5046 7.2218 34.8866C4.87441 31.2685 3.75946 26.9886 4.04323 22.6851C4.327 18.3816 5.99429 14.2851 8.79644 11.0066C11.5986 7.72806 15.3854 5.44319 19.5923 4.49272C23.7991 3.54224 28.2004 3.9771 32.1399 5.73243M43.9999 8.00098L23.9999 28.021L17.9999 22.021"
            stroke="var(--secondary)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.icon_elem}
          />
        </svg>
      </div>
      <div className={styles.text}>{generateText(props.modalName)}</div>
      <Button>{t('enterPersonalOffice')}</Button>
    </div>
  );
};

const ConfirmModal = ({ close }: IProps) => {
  const { modalName, isModalOpen } = useModal();
  const isOpen = isModalOpen && modalName === 'reset-send-complete';

  return (
    <Modal isOpen={isOpen} close={close}>
      <ModalContent modalName={modalName} />
    </Modal>
  );
};

export default ConfirmModal;
