import { IModal } from '@/entities/modal';
import styles from '../AuthForm.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/components/Modal';
import AuthLoginForm from './Form';

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
        <AuthLoginForm openRegistration={openRegistrationModal} openResetModal={openResetModal} />
      </div>
    </Modal>
  );
};

export default AuthLoginModal;
