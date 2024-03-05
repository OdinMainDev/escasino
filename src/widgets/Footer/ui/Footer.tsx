import { AuthFooter, AuthModal } from '@/widgets/Auth';
import styles from './Footer.module.scss';
import { useAppSelector } from '@/shared/hooks/redux';
import Select from './Select';
import { UserIcon, Wallet } from './Icons';
import Loader from '@/shared/ui/Loader';

const Footer = () => {
  const { isAuth, loading } = useAppSelector((state) => state.userReducer);
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
      {loading && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Footer;
