import { IModal } from '@/shared/models/interfaces/modal';
import styles from './ModalZerobalance.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import Button from '@/shared/ui/Button';
import { useRouter } from '@/shared/helpers/navigation';
import { useTranslation } from 'react-i18next';

interface IProps extends IModal {
  gameId?: number;
}

const ModalZeroBalance = ({ close, gameId }: IProps) => {
  const { t } = useTranslation();
  const { modalName, isModalOpen } = useModal();
  const isOpen = !isModalOpen ? false : modalName == 'play-real-zero-balance';
  const router = useRouter();
  const openGame = () => {
    if (close) {
      void close();
    }
    router.push('/play/real/' + gameId?.toString());
  };
  const openDeposit = () => {
    if (close) {
      void close();
    }
    router.push('/wallet/deposit');
  };
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <div className={styles.container}>
          <div>
            <div className={styles.title}>{t('balanceEmpty')}</div>
            <div className={styles.buttons_container}>
              <Button elType="outlined" className={styles.button} onClick={openGame}>
                {t('toGame')}
              </Button>
              <Button className={styles.button} onClick={openDeposit}>
                {t('topUpBalance')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalZeroBalance;
