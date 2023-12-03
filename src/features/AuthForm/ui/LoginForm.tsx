import classNames from 'classnames';
import styles from './LoginForm.module.scss';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';

interface IProps {
  openRegistration: () => void;
}

const LoginForm = ({ openRegistration }: IProps) => {
  return (
    <form className={styles.container}>
      <div className={classNames('title', styles.title)}>Войти в личный кабинет</div>
      <Input placeholder="Электронная почта" type="email" className={styles.input} />
      <Input placeholder="Пароль" type="password" className={styles.input} />
      <Button className={styles.button} type="submit">
        Войти
      </Button>
      <div className={styles.label}>
        Нет личного кабинета? <span onClick={openRegistration}>Зарегистрироваться</span>
      </div>
    </form>
  );
};

export default LoginForm;
