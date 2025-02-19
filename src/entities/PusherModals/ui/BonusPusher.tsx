import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import styles from './PusherModals.module.scss';
import Modal from '@/shared/ui/Modal';
import { closePusherModal } from '@/store/slices/pusherSlice';
import Button from '@/shared/ui/Button';
import bonusAddedIcon from '../icons/lottery.svg';
import classNames from 'classnames';
import { useRouter } from '@/shared/helpers/navigation';
import { typeOfPosherModal } from './PusherModals';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BonusPusher = () => {
  const { t } = useTranslation();
  const keys: typeOfPosherModal[] = [
    'bonus_receive',
    'bonus_expire',
    'bonus_cancel',
    'bonus_scratch_receive',
    'bonus_scratch_complete',
    'bonus_complete',
    'do_update_active_bonuses',
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
          return t('bonuseAddedToYou');
        case 'bonus_expire':
          return t('bounsLifeTimeExpired');
        case 'bonus_cancel':
          return t('yourBonusCanceled');
        case 'bonus_complete':
          return t('yourBonusEnded');
        case 'bonus_scratch_receive':
          return t('yourBonusScratchAdded');
        case 'bonus_scratch_complete':
          return t('yourBonusScratchEnded');
      }
    }
    return;
  };

  const getTitle = () => {
    if (filtredModalsKeys.length > 0) {
      switch (filtredModalsKeys[filtredModalsKeys.length - 1]) {
        case 'bonus_receive':
          return t('congratulations');
        case 'bonus_expire':
          return t('bonusExpire');
        case 'bonus_cancel':
          return t('bonusCanceled');
        case 'bonus_complete':
          return t('bonusEnded');
        case 'bonus_scratch_receive':
          return t('bonusScratchGained');
        case 'bonus_scratch_complete':
          return t('bonusScratchEnded');
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
        <div className={styles.buttons}>
          <Button className="w-[100%] mt-[32px]" onClick={navigateToBonuses}>
            {t('goToBonuses')}
          </Button>
          <Button elType="outlined" className="w-[100%] mt-[16px]" onClick={closeModal}>
            {t('continue')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BonusPusher;
