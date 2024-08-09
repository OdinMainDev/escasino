import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import styles from './PusherModals.module.scss';
import Modal from '@/shared/ui/Modal';
import { closePusherModal } from '@/store/slices/pusherSlice';
import Button from '@/shared/ui/Button';
import lotteryIcon from '../icons/lottery.svg';
import classNames from 'classnames';

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
      <div className={styles.lottery}>
        <img src={lotteryIcon} className={classNames(styles.icon, 'mb-[24px]')} />
        <div className={classNames(styles.title, 'mb-[8px]')}>Это ещё не всё!</div>
        <div className={styles.subtitle}>У нас есть для вас подарок – лотерейный билет!</div>
        <Button className="w-[100%] mt-[32px]">Забрать билет</Button>
        <Button elType="outlined" className="w-[100%] mt-[16px]">
          Отмена
        </Button>
      </div>
    </Modal>
  );
};

export default Lottery;
