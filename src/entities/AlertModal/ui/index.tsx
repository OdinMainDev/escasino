import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import Button from '@/shared/ui/Button';
import { IAlert } from '../models';

const AlertModal = ({ close, title, text, buttons = [] }: IAlert) => {
  const { modalName, isModalOpen } = useModal();
  const [isOpen, setIsOpen] = useState(isModalOpen && modalName == 'alert');

  useEffect(() => {
    setIsOpen(isModalOpen && modalName === 'alert');
  }, [isModalOpen, modalName]);

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
        <div className={styles.buttons}>
          {buttons.map((item, index) => (
            <Button type="button" elType={item.type} onClick={item.onClick} key={index}>
              {item.text}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
