import styles from './Form.module.scss';
import Button from '@/shared/components/Button';
import { useModal } from '@/app/providers/ModalProvider';

const AuthResetSetPasswordComplete = () => {
  const { doOpenModal } = useModal();

  // TODO: исправить кнопку ( при нажатии делает сабмит, а надо чтобы на модалку кидал входа )
  return (
    <form className={styles.container}>
      <div>
        <div className={styles.title}>Новый пароль отправлен на электронную почту!</div>
        <Button className={styles.button} onClick={() => doOpenModal('login')}>
          Войти в личный кабинет
        </Button>
      </div>
    </form>
  );
};

export default AuthResetSetPasswordComplete;
