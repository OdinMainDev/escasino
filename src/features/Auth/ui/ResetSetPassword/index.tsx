import { IModal } from '@/shared/models/interfaces/modal';
import styles from '../AuthForm.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import AuthResetSetPasswordForm from './Form';
import { useEffect, useState } from 'react';

const AuthResetSetPasswordModal = ({ close }: IModal) => {
  const { modalName, isModalOpen } = useModal();
  const isPhone = modalName == 'reset-confirm-phone';
  const [isOpen, setIsOpen] = useState(
    isModalOpen && (modalName == 'reset-confirm-email' || modalName == 'reset-confirm-phone'),
  );

  useEffect(() => {
    setIsOpen(
      isModalOpen && (modalName == 'reset-confirm-email' || modalName == 'reset-confirm-phone'),
    );
  }, [isModalOpen, modalName]);

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <AuthResetSetPasswordForm isPhone={isPhone} />
      </div>
    </Modal>
  );
};

export default AuthResetSetPasswordModal;
