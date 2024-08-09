import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import styles from './PusherModals.module.scss';
import Modal from '@/shared/ui/Modal';
import { closePusherModal } from '@/store/slices/pusherSlice';
import replanishIcon from '../icons/replenish.svg';
import Button from '@/shared/ui/Button';
import classNames from 'classnames';

const Replenish = () => {
  const key = 'success-replenish';
  const { openPusherModals } = useAppSelector((state) => state.pusherReducer);
  const dispatch = useAppDispatch();
  const isOpen = !!openPusherModals.find((item) => item === key);

  const closeModal = () => {
    dispatch(closePusherModal(key));
  };
  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={styles.replenish}>
        <img src={replanishIcon} className={classNames(styles.icon, 'mb-[24px]')} />
        <div className={classNames(styles.title, 'mb-[8px]')}>Счет успешно пополнен.</div>
        <div className={styles.subtitle}>Желаем вам приятной игры!</div>
        <Button className="w-[100%] mt-[32px]">Вернуться к игре</Button>
      </div>
    </Modal>
  );
};

export default Replenish;
