import { FooterAuthButtons, FooterAuthModal } from './Auth';
import styles from './Footer.module.scss';
import FooterSelect from './FooterSelect';
import { UserIcon, Wallet } from './Icons';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import Loader from '@/shared/components/Loader';

type FooterProps = {
  isHidden?: boolean;
};

export const Footer = ({ isHidden }: FooterProps) => {
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
    <div className={styles.container}>
      <div className={styles.footer}>
        {isAuth ? (
          // Меню если авторизован
          <div className={styles.footer}>
            <FooterSelect />
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
