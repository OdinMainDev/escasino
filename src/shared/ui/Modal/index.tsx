import { IModal } from '@/shared/models/interfaces/modal';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const Modal = ({ isOpen, close, children, reRendering = true }: IModal) => {
  const [shouldRenderChildren, setShouldRenderChildren] = useState(isOpen);
  useEffect(() => {
    if (isOpen) {
      setShouldRenderChildren(true);
    } else {
      const timer = setTimeout(() => setShouldRenderChildren(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
        {close ? (
          <div className={styles.close} onClick={close}>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="var(--secondary-close)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : (
          <div></div>
        )}
        {reRendering ? shouldRenderChildren && children : children}
      </div>
    </div>
  );
};

export default Modal;
