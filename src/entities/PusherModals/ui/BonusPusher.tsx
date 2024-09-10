import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import styles from './PusherModals.module.scss';
import Modal from '@/shared/ui/Modal';
import { closePusherModal } from '@/store/slices/pusherSlice';
import Button from '@/shared/ui/Button';
import bonusAddedIcon from '../icons/add_bonus.svg';
import classNames from 'classnames';
import { useRouter } from '@/shared/helpers/navigation';
import { typeOfPosherModal } from './PusherModals';
import { useEffect, useState } from 'react';

const BonusPusher = () => {
  const keys: typeOfPosherModal[] = [
    'bonus_receive',
    'bonus_expire',
    'bonus_cancel',
    'bonus_scratch_receive',
    'bonus_scratch_complete',
    'bonus_complete',
  ];
  const { openPusherModals } = useAppSelector((state) => state.pusherReducer);
  const filtredModalsKeys = openPusherModals.filter((item) => keys.includes(item));
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(!!openPusherModals.find((item) => keys.includes(item)));
  }, [openPusherModals]);

  const closeModal = () => {
    setIsOpen(false);
    if (filtredModalsKeys.length > 0) {
      setTimeout(() => {
        dispatch(closePusherModal(filtredModalsKeys[filtredModalsKeys.length - 1]));
      }, 200);
    }
  };

  const navigateToBonuses = () => {
    router.push('/bonus/list');
    closeModal();
  };

  const geSubtitle = () => {
    if (filtredModalsKeys.length > 0) {
      switch (filtredModalsKeys[filtredModalsKeys.length - 1]) {
        case 'bonus_receive':
          return 'Вам был добавлен бонус!!!';
        case 'bonus_expire':
          return 'Время жизни бонуса закончилось!';
        case 'bonus_cancel':
          return 'Ваш бонус был отменен!';
        case 'bonus_complete':
          return 'Ваш бонус завершен!';
        case 'bonus_scratch_receive':
          return 'Вам был добавлен бонус скретч карты!';
        case 'bonus_scratch_complete':
          return 'Ваш бонус скретч был завершен!';
      }
    }
    return;
  };

  const getTitle = () => {
    if (filtredModalsKeys.length > 0) {
      switch (filtredModalsKeys[filtredModalsKeys.length - 1]) {
        case 'bonus_receive':
          return 'Поздравляeм!';
        case 'bonus_expire':
          return 'Бонус истек!';
        case 'bonus_cancel':
          return 'Бонус отменен!';
        case 'bonus_complete':
          return 'Бонус завершен!';
        case 'bonus_scratch_receive':
          return 'Бонус скретч карты получен!';
        case 'bonus_scratch_complete':
          return 'Бонус скретч завершен!';
      }
    }
    return;
  };

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={styles.lottery}>
        <img src={bonusAddedIcon} className={classNames(styles.icon, 'mb-[24px]')} />
        <div className={classNames(styles.title, 'mb-[8px]')}>{getTitle()}</div>
        <div className={styles.subtitle}>{geSubtitle()}</div>
        <Button className="w-[100%] mt-[32px]" onClick={navigateToBonuses}>
          Перейти к бонусам
        </Button>
        <Button elType="outlined" className="w-[100%] mt-[16px]" onClick={closeModal}>
          Продолжить
        </Button>
      </div>
    </Modal>
  );
};

export default BonusPusher;
