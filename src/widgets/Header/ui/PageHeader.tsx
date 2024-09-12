import classNames from 'classnames';
import styles from './PageHeader.module.scss';
import GoBackButton from '@/shared/ui/GoBackButton';
import ChatIcon from './ChatIcon';
import { CurrencyInfo } from '@/features/CurrencyInfo';

interface IProps {
  title?: string;
  isHover?: boolean;
  customBackPath?: string;
  fixed?: boolean;
  isPhoneHorizontal?: boolean;
}
const PageHeader = ({ title, isHover, customBackPath, fixed, isPhoneHorizontal }: IProps) => {
  return (
    <div
      className={classNames(styles.header, {
        [styles.header_cover]: isHover,
        [styles.fixed]: fixed,
        [styles.isPhoneHorizontal]: isPhoneHorizontal,
      })}
    >
      <GoBackButton customPath={customBackPath} />
      {!isPhoneHorizontal && <div className={styles.title}>{title}</div>}

      {isPhoneHorizontal ? <CurrencyInfo isPhoneHorizontal={isPhoneHorizontal} /> : <ChatIcon />}
    </div>
  );
};

export default PageHeader;
