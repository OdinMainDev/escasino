import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import styles from './PusherModals.module.scss';
import Modal from '@/shared/ui/Modal';
import { closePusherModal } from '@/store/slices/pusherSlice';
import Button from '@/shared/ui/Button';
import bonusAddedIcon from '../icons/lottery.svg';
import bonusScratchCompleteIcon from '../icons/bonusScratchComplete.svg';
import classNames from 'classnames';
import { useRouter } from '@/shared/helpers/navigation';
import { typeOfPosherModal } from './PusherModals';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IPusherArgs {
  bonus: number;
}

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
  const filtredModalsKeys = openPusherModals.filter((item) => keys.includes(item.type));
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(!!openPusherModals.find((item) => keys.includes(item.type)));
  }, [openPusherModals]);

  const closeModal = () => {
    setIsOpen(false);
    if (filtredModalsKeys.length > 0) {
      setTimeout(() => {
        dispatch(closePusherModal(filtredModalsKeys[filtredModalsKeys.length - 1]));
      }, 200);
    }
  };

  const openBonusGame = () => {
    closeModal();
    if (!filtredModalsKeys.length) {
      return;
    }
    const args = filtredModalsKeys[filtredModalsKeys.length - 1].data as IPusherArgs;

    if (!args) {
      return;
    }

    const bonusGame = args.bonus;
    router.push(`/play/real/${bonusGame}`);
  };

  const navigateToBonuses = () => {
    router.push('/bonus/list');
    closeModal();
  };

  const modalType =
    filtredModalsKeys.length > 0 ? filtredModalsKeys[filtredModalsKeys.length - 1].type : null;

  interface ModalClasses {
    icon: string;
    title: string;
    subtitle: string;
    modal: string;
    buttons: string;
  }

  interface ModalConfig {
    title: string;
    subtitle: string;
    icon: string;
    classes: ModalClasses;
    buttons: {
      primary: string;
      secondary: string;
    };
  }

  const modalConfig: { [key in typeOfPosherModal]?: ModalConfig } = {
    bonus_receive: {
      title: t('congratulations'),
      subtitle: t('bonuseAddedToYou'),
      icon: bonusAddedIcon,
      classes: {
        icon: styles.icon,
        title: styles.title,
        subtitle: styles.subtitle,
        modal: styles.lottery,
        buttons: styles.buttons,
      },
      buttons: {
        primary: t('continue'),
        secondary: t('goToBonuses'),
      },
    },
    bonus_expire: {
      title: t('bonusExpire'),
      subtitle: t('bounsLifeTimeExpired'),
      icon: bonusAddedIcon,
      classes: {
        icon: styles.icon,
        title: styles.title,
        subtitle: styles.subtitle,
        modal: styles.lottery,
        buttons: styles.buttons,
      },
      buttons: {
        primary: t('continue'),
        secondary: t('goToBonuses'),
      },
    },
    bonus_cancel: {
      title: t('bonusCanceled'),
      subtitle: t('yourBonusCanceled'),
      icon: bonusAddedIcon,
      classes: {
        icon: styles.icon,
        title: styles.title,
        subtitle: styles.subtitle,
        modal: styles.lottery,
        buttons: styles.buttons,
      },
      buttons: {
        primary: t('continue'),
        secondary: t('goToBonuses'),
      },
    },
    bonus_complete: {
      title: t('bonusEnded'),
      subtitle: t('yourBonusEnded'),
      icon: bonusAddedIcon,
      classes: {
        icon: styles.icon,
        title: styles.title,
        subtitle: styles.subtitle,
        modal: styles.lottery,
        buttons: styles.buttons,
      },
      buttons: {
        primary: t('continue'),
        secondary: t('goToBonuses'),
      },
    },
    bonus_scratch_receive: {
      title: t('bonusScratchGained'),
      subtitle: t('yourBonusScratchAdded'),
      icon: bonusAddedIcon,
      classes: {
        icon: styles.scratchReceiveIcon,
        title: styles.title,
        subtitle: styles.subtitle,
        modal: styles.lottery,
        buttons: styles.buttons,
      },
      buttons: {
        primary: t('continue'),
        secondary: t('goToBonuses'),
      },
    },
    bonus_scratch_complete: {
      title: t('bonusScratchEnded'),
      subtitle: t('yourBonusScratchEnded'),
      icon: bonusScratchCompleteIcon,
      classes: {
        icon: styles.scratchCompleteIcon,
        title: styles.title,
        subtitle: styles.subtitle,
        modal: styles.bonus,
        buttons: styles.bon_buttons,
      },
      buttons: {
        primary: t('continue'),
        secondary: t('goToBonuses'),
      },
    },
  };

  // default config
  const currentConfig: ModalConfig =
    modalType && modalConfig[modalType]
      ? modalConfig[modalType]!
      : {
          title: '',
          subtitle: '',
          icon: bonusAddedIcon,
          classes: {
            icon: styles.icon,
            title: styles.title,
            subtitle: styles.subtitle,
            modal: styles.lottery,
            buttons: styles.buttons,
          },
          buttons: {
            primary: t('continue'),
            secondary: t('goToBonuses'),
          },
        };

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={currentConfig.classes.modal}>
        <img
          src={currentConfig.icon}
          className={classNames(currentConfig.classes.icon, 'mb-[24px]')}
          alt="modal icon"
        />
        <div className={classNames(currentConfig.classes.title, 'mb-[8px]')}>
          {currentConfig.title}
        </div>
        <div className={currentConfig.classes.subtitle}>{currentConfig.subtitle}</div>
        <div className={currentConfig.classes.buttons}>
          <Button elType="outlined" className="w-[100%] mt-[32px]" onClick={openBonusGame}>
            {currentConfig.buttons.primary}
          </Button>
          <Button className="w-[100%] mt-[32px]" onClick={navigateToBonuses}>
            {currentConfig.buttons.secondary}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BonusPusher;
