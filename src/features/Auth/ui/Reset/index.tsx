import { IModal } from '@/entities/modal';
import styles from '../AuthForm.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/components/Modal';
import AuthResetForm from './Form';

interface IProps extends IModal {
  openLoginModal: () => void;
}

const AuthResetModal = ({ close, openLoginModal }: IProps) => {
  const { modalName, isModalOpen } = useModal();
  const isOpen = !isModalOpen ? false : modalName == 'reset';
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <AuthResetForm openLoginModal={openLoginModal} />
      </div>
    </Modal>
  );
};

export default AuthResetModal;
