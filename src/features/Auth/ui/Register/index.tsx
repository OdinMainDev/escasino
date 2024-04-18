import { IModal } from '@/shared/models/interfaces/modal';
import styles from '../AuthForm.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import Form from './Form';
import { useEffect, useState } from 'react';

interface IProps extends IModal {
  openLoginModal: () => void;
}

const AuthRegisterModal = ({ close, openLoginModal }: IProps) => {
  const { modalName, isModalOpen } = useModal();
  const [isOpen, setIsOpen] = useState(isModalOpen && modalName == 'register');

  useEffect(() => {
    setIsOpen(isModalOpen && modalName === 'register');
  }, [isModalOpen, modalName]);

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <Form openLoginModal={openLoginModal} />
      </div>
    </Modal>
  );
};

export default AuthRegisterModal;
