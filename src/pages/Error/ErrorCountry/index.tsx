import lock from './lock.svg';
import styles from './styles.module.scss';

const ErrorCountry = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Простите</div>
      <div className={styles.subtitle}>Страна с которой вы зашли не доступна в нашем казино</div>
      <div className={styles.subtitle}>( запрет страны )</div>
      <img src={lock} className={styles.lock} alt="lock" />
    </div>
  );
};

export default ErrorCountry;
