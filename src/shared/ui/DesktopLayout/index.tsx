import { ReactNode } from 'react';
import styles from './styles.module.scss';
interface IProps {
  children: ReactNode;
}
const DesktopLayout = ({ children }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default DesktopLayout;
