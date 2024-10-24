import { IModal } from '@/shared/models/interfaces/modal';
import styles from '../AuthForm.module.scss';
import stylesText from './styles.module.scss';
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
        <p className={stylesText.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea et natus, quidem corrupti
          deserunt in eveniet nihil vitae nostrum fugiat quis laudantium reiciendis! Quas temporibus
          quibusdam maxime, recusandae nihil dolorum.
        </p>
      </div>
    </Modal>
  );
};

export default TextAfterRegisterdModal;
