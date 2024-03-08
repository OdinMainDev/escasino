import styles from './AuthFormModal.module.scss';
import { IModal } from '@/app/entities/modal';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/views/components/Modal';
import { RegistrationForm } from '../../AuthForm';

interface IProps extends IModal {
  openLoginModal: () => void;
}

const AuthRegistrationModal = ({ close, openLoginModal }: IProps) => {
  const { modalName, isModalOpen } = useModal();
  const isOpen = !isModalOpen ? false : modalName == 'register';

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <RegistrationForm openLoginModal={openLoginModal} />
      </div>
    </Modal>
  );
};

export default AuthRegistrationModal;
