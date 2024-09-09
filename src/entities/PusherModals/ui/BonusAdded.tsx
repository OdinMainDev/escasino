import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import styles from './PusherModals.module.scss';
import Modal from '@/shared/ui/Modal';
import { closePusherModal } from '@/store/slices/pusherSlice';
import Button from '@/shared/ui/Button';
import bonusAddedIcon from '../icons/add_bonus.svg';
import classNames from 'classnames';
import { useRouter } from '@/shared/helpers/navigation';

const BonusAdded = () => {
  const key = 'bonus-added';
  const { openPusherModals } = useAppSelector((state) => state.pusherReducer);
  const dispatch = useAppDispatch();
  const isOpen = !!openPusherModals.find((item) => item === key);
  const router = useRouter();

  const closeModal = () => {
    dispatch(closePusherModal(key));
  };

  const navigateToBonuses = () => {
    router.push('/bonus/list');
    dispatch(closePusherModal(key));
  };

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={styles.lottery}>
        <img src={bonusAddedIcon} className={classNames(styles.icon, 'mb-[24px]')} />
        <div className={classNames(styles.title, 'mb-[8px]')}>Поздравляeм!</div>
        <div className={styles.subtitle}>Вам был добавлен бонус!</div>
        <Button className="w-[100%] mt-[32px]" onClick={navigateToBonuses}>
          Перейти к бонусам
        </Button>
        <Button elType="outlined" className="w-[100%] mt-[16px]">
          Отмена
        </Button>
      </div>
    </Modal>
  );
};

export default BonusAdded;
