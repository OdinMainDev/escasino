import Icons from '@/shared/ui/Icons';
import styles from './styles.module.scss';
import barrier from './traffic-barrier.svg';

const ErrorUnavailable = () => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Icons icon="alert" />
      </div>
      <div className={styles.subtitle}>Мы скоро вернемся!</div>
      <div className={styles.title}>Казино находится на ремонте</div>
      <img src={barrier} alt="barrier" className={styles.barrier} />
    </div>
  );
};

export default ErrorUnavailable;
