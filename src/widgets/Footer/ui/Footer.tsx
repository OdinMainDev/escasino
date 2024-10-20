import classNames from 'classnames';
import { FooterAuthButtons, FooterAuthModal } from './Auth';
import styles from './Footer.module.scss';
import { CurrencyInfo } from '@/features/CurrencyInfo';
import { UserIcon, Wallet } from './Icons';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import Loader from '@/shared/ui/Loader';
import ChatIcon from '@/widgets/Header/ui/ChatIcon';
import useBrowserInfo from '@/shared/hooks/useBrowserInfo';
import TextAfterRegisterdModal from '@/features/Auth/ui/TextAfterRegister';
import { useModal } from '@/app/providers/ModalProvider';

type FooterProps = {
  isHidden?: boolean;
  isPhoneHorizontal?: boolean;
};

export const Footer = ({ isHidden, isPhoneHorizontal }: FooterProps) => {
  const { isAuth, loading } = useAuthProvider();
  const { doCloseModals } = useModal();
  const browserInfo = useBrowserInfo();
  const closeAll = () => {
    document.body.classList.remove('overflow-hidden');
    doCloseModals();
  };

  if (loading) {
    return footerLoading();
  }

  if (isHidden && isPhoneHorizontal) {
    return (
      <div
        className={classNames(styles.container, {
          [styles.isPhoneHorizontal]: isPhoneHorizontal,
        })}
      >
        <div className={styles.footer_container}>
          <div className={styles.footer}>
            <ChatIcon />
          </div>
        </div>
      </div>
    );
  }

  if (isHidden) {
    return (
      <>
        <FooterAuthModal />
      </>
    );
  }

  return (
    <div
      className={classNames(styles.container, {
        [styles.isPhoneHorizontal]: isPhoneHorizontal,
        [styles.isMobileSafari]: browserInfo.name === 'Safari' && isPhoneHorizontal,
      })}
    >
      <div className={styles.footer_container}>
        {isAuth ? (
          // Меню если авторизован
          <div className={styles.footer}>
            <TextAfterRegisterdModal close={closeAll} />
            {isPhoneHorizontal ? <ChatIcon /> : <CurrencyInfo />}
            <div className={styles.icons}>
              <UserIcon />
              <Wallet />
            </div>
          </div>
        ) : (
          // Меню если не авторизован
          <>
            <FooterAuthButtons />
            <FooterAuthModal />
          </>
        )}
      </div>
    </div>
  );
};

const footerLoading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <Loader />
      </div>
    </div>
  );
};
