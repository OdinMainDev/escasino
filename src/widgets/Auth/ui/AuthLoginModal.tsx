import { LoginForm } from '@/features/AuthForm';
import { IModal } from '@/shared/models/interfaces/modal';
import { Modal } from '@/shared/ui/Modal';
import styles from './AuthFormModal.module.scss';

interface IProps extends IModal {
  openRegistrationModal: () => void;
}

const AuthLoginModal = ({ isOpen, close, openRegistrationModal }: IProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <LoginForm openRegistration={openRegistrationModal} />
      </div>
    </Modal>
  );
};

export default AuthLoginModal;
