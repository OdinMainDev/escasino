import Button from '@/shared/ui/Button';
import styles from './AuthFooter.module.scss';

const AuthFooter = () => {
  return (
    <div className={styles.container}>
      <Button elType="outlined" className={styles.button}>
        Войти
      </Button>
      <Button className={styles.button}>Регистрация</Button>
    </div>
  );
};

export default AuthFooter;
