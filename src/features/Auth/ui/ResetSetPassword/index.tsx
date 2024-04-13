import { IModal } from '@/shared/models/interfaces/modal';
import styles from '../AuthForm.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import AuthResetSetPasswordForm from './Form';

const AuthResetSetPasswordModal = ({ close }: IModal) => {
  const { modalName, isModalOpen } = useModal();
  const isOpen = !isModalOpen
    ? false
    : modalName == 'reset-confirm-email' || modalName == 'reset-confirm-phone';
  const isPhone = modalName == 'reset-confirm-phone';
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <AuthResetSetPasswordForm isPhone={isPhone} />
      </div>
    </Modal>
  );
};

export default AuthResetSetPasswordModal;
