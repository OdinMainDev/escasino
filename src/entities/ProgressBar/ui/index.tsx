import styles from './styles.module.scss';

interface IProps {
  progress: number;
}
const ProgressBar = ({ progress }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.line} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
