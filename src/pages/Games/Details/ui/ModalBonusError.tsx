import { IModal } from '@/shared/models/interfaces/modal';
import Modal from '@/shared/ui/Modal';

import styles from './ModalBonusError.module.scss';

interface IProps extends IModal {}
const ModalBonusError = ({ isOpen, close }: IProps) => {
  return (
    <Modal isOpen={!!isOpen} close={close}>
      <div className={styles.container}></div>
    </Modal>
  );
};

export default ModalBonusError;
