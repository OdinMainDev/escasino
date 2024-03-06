import { ResetForm } from '../../AuthForm';
import { IModal } from '@/app/entities/modal';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/views/components/Modal';
import styles from './AuthFormModal.module.scss';

interface IProps extends IModal {
  openLoginModal: () => void;
}

const AuthResetPasswordModal = ({ close, openLoginModal }: IProps) => {
  const { modalName, isModalOpen } = useModal();
  const isOpen = !isModalOpen ? false : modalName == 'reset';
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <ResetForm openLoginModal={openLoginModal} />
      </div>
    </Modal>
  );
};

export default AuthResetPasswordModal;
