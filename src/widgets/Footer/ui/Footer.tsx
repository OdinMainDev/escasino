import classNames from 'classnames';
import { FooterAuthButtons, FooterAuthModal } from './Auth';
import styles from './Footer.module.scss';
import { CurrencyInfo } from '@/features/CurrencyInfo';
import { UserIcon, Wallet } from './Icons';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import Loader from '@/shared/ui/Loader';
import ChatIcon from '@/widgets/Header/ui/ChatIcon';

type FooterProps = {
  isHidden?: boolean;
  isPhoneHorizontal?: boolean;
};

export const Footer = ({ isHidden, isPhoneHorizontal }: FooterProps) => {
  const { isAuth, loading } = useAuthProvider();
  if (loading) {
    return footerLoading();
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
      })}
    >
      <div className={styles.footer_container}>
        {isAuth ? (
          // Меню если авторизован
          <div className={styles.footer}>
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
