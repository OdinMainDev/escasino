import { IModal } from '@/shared/models/interfaces/modal';
import styles from '../Modals.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import Form from './Form';
import { useEffect, useState } from 'react';

const ProfileChangeEmailCompleteModal = ({ close }: IModal) => {
  const { modalName, isModalOpen } = useModal();
  const [isOpen, setIsOpen] = useState(isModalOpen && modalName == 'change-email-complete');
  useEffect(() => {
    setIsOpen(isModalOpen && modalName == 'change-email-complete');
  }, [isModalOpen, modalName]);

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <Form />
      </div>
    </Modal>
  );
};

export default ProfileChangeEmailCompleteModal;
