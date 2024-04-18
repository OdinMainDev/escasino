import { IModal } from '@/shared/models/interfaces/modal';
import styles from '../AuthForm.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import AuthLoginForm from './Form';
import { useEffect, useState } from 'react';

interface IProps extends IModal {
  openRegistrationModal: () => void;
  openResetModal: () => void;
}

const AuthLoginModal = ({ close, openRegistrationModal, openResetModal }: IProps) => {
  const { modalName, isModalOpen } = useModal();
  const [isOpen, setIsOpen] = useState(!isModalOpen || modalName === 'login');
  useEffect(() => {
    setIsOpen(!isModalOpen || modalName === 'login');
  }, [isModalOpen]);
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <AuthLoginForm openRegistration={openRegistrationModal} openResetModal={openResetModal} />
      </div>
    </Modal>
  );
};

export default AuthLoginModal;
