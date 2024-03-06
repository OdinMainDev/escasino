import { RegistrationForm } from '@/features/AuthForm';
import { IModal } from '@/shared/models/interfaces/modal';
import Modal from '@/shared/ui/Modal';
import styles from './AuthFormModal.module.scss';

interface IProps extends IModal {
  openLoginModal: () => void;
}

const AuthRegistrationModal = ({ isOpen, close, openLoginModal }: IProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <RegistrationForm openLogin={openLoginModal} />
      </div>
    </Modal>
  );
};

export default AuthRegistrationModal;
