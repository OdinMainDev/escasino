import styles from './AuthFormModal.module.scss';
import { IModal } from '@/app/entities/modal';
import { useModal } from '@/app/providers/ModalProvider';
import { LoginForm } from '@/views/components/AuthForm';
import Modal from '@/views/components/Modal';

interface IProps extends IModal {
  openRegistrationModal: () => void;
  openResetModal: () => void;
}

const AuthLoginModal = ({ close, openRegistrationModal, openResetModal }: IProps) => {
  const { modalName, isModalOpen } = useModal();
  const isOpen = !isModalOpen ? false : modalName == 'login';
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <LoginForm openRegistration={openRegistrationModal} openResetModal={openResetModal} />
      </div>
    </Modal>
  );
};

export default AuthLoginModal;
