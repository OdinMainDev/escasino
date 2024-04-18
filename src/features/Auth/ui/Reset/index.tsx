import { IModal } from '@/shared/models/interfaces/modal';
import styles from '../AuthForm.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import AuthResetForm from './Form';
import { useEffect, useState } from 'react';

interface IProps extends IModal {
  openLoginModal: () => void;
}

const AuthResetModal = ({ close, openLoginModal }: IProps) => {
  const { modalName, isModalOpen } = useModal();
  const [isOpen, setIsOpen] = useState(isModalOpen && modalName == 'reset');

  useEffect(() => {
    setIsOpen(isModalOpen && modalName === 'reset');
  }, [isModalOpen, modalName]);

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <AuthResetForm openLoginModal={openLoginModal} />
      </div>
    </Modal>
  );
};

export default AuthResetModal;
