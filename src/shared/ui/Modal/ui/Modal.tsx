import { IModal } from '@/shared/models/interfaces/modal';
import styles from './Modal.module.scss';
import classNames from 'classnames';

const Modal = ({ isOpen, close, children }: IModal) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget && close) {
      close();
    }
  };
  return (
    <div
      className={classNames(styles.overlay, {
        [styles.isOpen]: isOpen,
      })}
      onClick={handleBackdropClick}
    >
      <div
        className={classNames(styles.content, {
          [styles.isOpen]: isOpen,
        })}
      >
        <div className={styles.close} onClick={close}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
