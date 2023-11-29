import classNames from 'classnames';
import styles from './LoginForm.module.scss';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <div className={classNames('title', styles.title)}>Регистрация нового игрока</div>
      <div className={styles.input_conatiner}>
        <Input placeholder="Электронная почта" type="email" className={styles.input} />
        <div className={styles.input_description}>
          Адрес электронной почты будет использован как логин для входа в личный кабинет
        </div>
      </div>
      <Button>Зарегистрироваться</Button>
    </div>
  );
};

export default LoginForm;
