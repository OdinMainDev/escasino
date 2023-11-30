import classNames from 'classnames';
import styles from './LoginForm.module.scss';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <div className={classNames('title', styles.title)}>Войти в личный кабинет</div>
      <Input placeholder="Электронная почта" type="email" className={styles.input} />
      <Input placeholder="Пароль" type="email" className={styles.input} />
      <Button>Войти</Button>
    </div>
  );
};

export default LoginForm;
