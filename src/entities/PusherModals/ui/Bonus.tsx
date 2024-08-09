import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import styles from './PusherModals.module.scss';
import Modal from '@/shared/ui/Modal';
import { closePusherModal } from '@/store/slices/pusherSlice';
import bonusIcon from '../icons/bonus.svg';
import classNames from 'classnames';
import Button from '@/shared/ui/Button';

const Replenish = () => {
  const key = 'get-bonus';
  const { openPusherModals } = useAppSelector((state) => state.pusherReducer);
  const dispatch = useAppDispatch();
  const isOpen = !!openPusherModals.find((item) => item === key);

  const closeModal = () => {
    dispatch(closePusherModal(key));
  };

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={styles.bonus}>
        <div className="flex flex-col items-center justify-center flex-1">
          <img src={bonusIcon} className={classNames(styles.replenish_icon, 'mb-[24px]')} />
          <div className={classNames(styles.title, 'mb-[8px]')}>Поздравляем!</div>
          <div className={styles.subtitle}>Общий бонус составил</div>
          <div className={styles.value}>1 290 RUB</div>
        </div>
        <div className={styles.descr}>
          Для вывода выигрыша вам необходимо сделать минимальный депозит и отыграть общий вейджер
          х40.
        </div>
        <Button className="w-[100%] mt-[40px]">Пополнить баланс</Button>
        <Button elType="outlined" className="w-[100%] mt-[16px]">
          Отмена
        </Button>
      </div>
    </Modal>
  );
};

export default Replenish;
