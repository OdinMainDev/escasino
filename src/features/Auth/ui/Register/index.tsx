import { IModal } from '@/entities/modal';
import styles from '../AuthForm.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/components/Modal';
import Form from './Form';

interface IProps extends IModal {
  openLoginModal: () => void;
}

const AuthRegisterModal = ({ close, openLoginModal }: IProps) => {
  const { modalName, isModalOpen } = useModal();
  const isOpen = !isModalOpen ? false : modalName == 'register';
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <Form openLoginModal={openLoginModal} />
      </div>
    </Modal>
  );
};

export default AuthRegisterModal;
