import { ReactElement } from 'react';
import styles from './Modal.module.scss';

interface IProps {
  isOpen: boolean;
  close: () => void;
  children: ReactElement;
}

const Modal = ({ isOpen, close, children }: IProps) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
