import { RegistrationForm } from '@/features/AuthForm';
import { IModal } from '@/shared/models/interfaces/modal';
import { Modal } from '@/shared/ui/Modal';
import styles from './AuthFormModal.module.scss';

const AuthRegistrationModal = ({ isOpen, close }: IModal) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <RegistrationForm />
      </div>
    </Modal>
  );
};

export default AuthRegistrationModal;
