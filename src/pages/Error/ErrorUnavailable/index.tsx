import styles from './styles.module.scss';

const ErrorUnavailable = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Казино находится на ремонте</div>
    </div>
  );
};

export default ErrorUnavailable;
