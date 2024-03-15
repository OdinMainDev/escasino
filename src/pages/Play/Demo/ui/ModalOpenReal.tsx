import { IModal } from '@/entities/modal';
import styles from './ModalOpenReal.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/components/Modal';
import Button from '@/shared/components/Button';
import { useRouter } from '@/shared/helpers/navigation';
import { useAuthProvider } from '@/app/providers/AuthProvider';

interface IProps extends IModal {
  gameId: number;
}

const ModalOpenReal = ({ close, gameId }: IProps) => {
  const { modalName, isModalOpen, doOpenModal } = useModal();
  const { isAuth } = useAuthProvider();
  const isOpen = !isModalOpen ? false : modalName == 'play-demo-open-real';
  const router = useRouter();
  const openGame = () => {
    if (!isAuth) {
      void doOpenModal('login');
      return;
    }
    router.push('/play/real/' + gameId?.toString());
  };
  return (
    <Modal isOpen={isOpen}>
      <div className={styles.container}>
        <div className={styles.container}>
          <div>
            <div className={styles.title}>Не заебался от демо игр?</div>
            <div className={styles.buttons_container}>
              <Button elType="outlined" className={styles.button} onClick={close}>
                Вернутся
              </Button>
              <Button className={styles.button} onClick={openGame}>
                В реал
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalOpenReal;
