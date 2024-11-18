import classNames from 'classnames';
import styles from './styles.module.scss';

interface IProps {
  progress: number;
  className?: string;
}
const ProgressBar = ({ progress, className }: IProps) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.line} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
