import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './styles.module.scss';
import Icons from '@/shared/ui/Icons';

const Terms = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton />
        <div className="title">Правила и условия</div>
        <Icons icon="chat" />
      </div>
      <div className={styles.subtitle}>Последнее обновление: 02.08.2023</div>
    </div>
  );
};

export default Terms;
