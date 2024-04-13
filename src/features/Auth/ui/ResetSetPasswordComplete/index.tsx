import { IModal } from '@/shared/models/interfaces/modal';
import styles from '../AuthForm.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import AuthResetSetPasswordCompleteForm from './Form';

const AuthResetSetPasswordCompleteModal = ({ close }: IModal) => {
  const { modalName, isModalOpen } = useModal();
  const isOpen = !isModalOpen ? false : modalName == 'reset-set-password-complete';
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <AuthResetSetPasswordCompleteForm />
      </div>
    </Modal>
  );
};

export default AuthResetSetPasswordCompleteModal;
