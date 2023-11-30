import { LoginForm } from '@/features/AuthForm';
import { IModal } from '@/shared/models/interfaces/modal';
import { Modal } from '@/shared/ui/Modal';
import styles from './AuthFormModal.module.scss';

const AuthLoginModal = ({ isOpen, close }: IModal) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </Modal>
  );
};

export default AuthLoginModal;
