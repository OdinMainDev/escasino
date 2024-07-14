import classNames from 'classnames';
import styles from './PageHeader.module.scss';
import GoBackButton from '@/shared/ui/GoBackButton';
import ChatIcon from './ChatIcon';

interface IProps {
  title?: string;
  isHover?: boolean;
  customBackPath?: string;
  fixed?: boolean;
}
const PageHeader = ({ title, isHover, customBackPath, fixed }: IProps) => {
  return (
    <div
      className={classNames(styles.header, {
        [styles.header_cover]: isHover,
        [styles.fixed]: fixed,
      })}
    >
      <GoBackButton customPath={customBackPath} />
      <div className={styles.title}>{title}</div>
      <ChatIcon />
    </div>
  );
};

export default PageHeader;
