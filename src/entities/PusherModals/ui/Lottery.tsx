import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import styles from './PusherModals.module.scss';
import Modal from '@/shared/ui/Modal';
import { closePusherModal } from '@/store/slices/pusherSlice';

const Lottery = () => {
  const key = 'lottery-ticket';
  const { openPusherModals } = useAppSelector((state) => state.pusherReducer);
  const dispatch = useAppDispatch();
  const isOpen = !!openPusherModals.find((item) => item === key);

  const closeModal = () => {
    dispatch(closePusherModal(key));
  };

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={styles.lottery}></div>
    </Modal>
  );
};

export default Lottery;
