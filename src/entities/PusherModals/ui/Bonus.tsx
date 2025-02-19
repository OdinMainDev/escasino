import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import styles from './PusherModals.module.scss';
import Modal from '@/shared/ui/Modal';
import { closePusherModal } from '@/store/slices/pusherSlice';
import bonusIcon from '../icons/bonus.svg';
import classNames from 'classnames';
import Button from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';

const Bonus = () => {
  const { t } = useTranslation();
  const key = 'get-bonus';
  const { openPusherModals } = useAppSelector((state) => state.pusherReducer);
  const dispatch = useAppDispatch();
  const isOpen = !!openPusherModals.find((item) => item.type === key);
  const closeModal = () => {
    dispatch(closePusherModal(key));
  };

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={styles.bonus}>
        <div className="flex flex-col items-center justify-center flex-1">
          <img src={bonusIcon} className={classNames(styles.replenish_icon, 'mb-[24px]')} />
          <div className={classNames(styles.title, 'mb-[8px]')}>{t('congratulations')}</div>
          <div className={styles.subtitle}>{t('totalBonusAmount')}</div>
          <div className={styles.value}>1 290 RUB</div>
        </div>
        <div className={styles.descr}>{t('toWidthdrawMinDepositAndWager40')}</div>
        <Button className="w-[100%] mt-[40px]">{t('topUpBalance')}</Button>
        <Button elType="outlined" className="w-[100%] mt-[16px]">
          {t('cancel')}
        </Button>
      </div>
    </Modal>
  );
};

export default Bonus;
