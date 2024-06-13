import classNames from 'classnames';
import styles from './PageHeader.module.scss';
import Icons from '@/shared/ui/Icons';
import GoBackButton from '@/shared/ui/GoBackButton';

interface IProps {
  title?: string;
  isHover?: boolean;
  customBackPath?: string;
}
const PageHeader = ({ title, isHover, customBackPath }: IProps) => {
  return (
    <div
      className={classNames(styles.header, {
        [styles.header_cover]: isHover,
      })}
    >
      <GoBackButton customPath={customBackPath} />
      <div className={styles.title}>{title}</div>
      <Icons icon="chat" />
    </div>
  );
};

export default PageHeader;
