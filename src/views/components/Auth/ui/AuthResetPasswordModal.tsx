import Modal from '@/shared/ui/Modal';
import styles from './AuthFormModal.module.scss';
import { IModal } from '@/shared/models/interfaces/modal';
import ResetPasswordForm from '@/features/AuthForm/ui/ResetPasswordForm';

interface IProps extends IModal {}

const AuthResetPasswordModal = ({ isOpen, close }: IProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <ResetPasswordForm />
      </div>
    </Modal>
  );
};

export default AuthResetPasswordModal;
