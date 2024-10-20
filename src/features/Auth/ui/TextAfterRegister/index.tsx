import { IModal } from '@/shared/models/interfaces/modal';
import styles from '../AuthForm.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import { useEffect, useState } from 'react';

const TextAfterRegisterdModal = ({ close }: IModal) => {
  const { modalName, isModalOpen } = useModal();

  const [isOpen, setIsOpen] = useState(isModalOpen && modalName == 'text-after-register');

  useEffect(() => {
    setIsOpen(isModalOpen && modalName == 'text-after-register');
  }, [isModalOpen, modalName]);

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea et natus, quidem corrupti
        deserunt in eveniet nihil vitae nostrum fugiat quis laudantium reiciendis! Quas temporibus
        quibusdam maxime, recusandae nihil dolorum.
      </div>
    </Modal>
  );
};

export default TextAfterRegisterdModal;
