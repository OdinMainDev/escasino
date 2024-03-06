import styles from './Footer.module.scss';
import Select from './Select';
import { UserIcon, Wallet } from './Icons';
import { useIsAuth } from '@/app/repositories/auth';
import { AuthFooter, AuthModal } from '@/views/components/Auth';

const Footer = () => {
  const { isAuth, loading } = useIsAuth();
  if (loading) {
    return null;
  }

  return (
    <div className={styles.container}>
      {isAuth ? (
        <div className={styles.footer}>
          <Select />
          <div className={styles.icons}>
            <UserIcon />
            <Wallet />
          </div>
        </div>
      ) : (
        <>
          <AuthFooter />
          <AuthModal />
        </>
      )}
    </div>
  );
};

export default Footer;
