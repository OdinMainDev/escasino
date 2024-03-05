import { ReactNode } from 'react';
import './styles.scss';
interface IProps {
  children: ReactNode;
}
const DesktopLayout = ({ children }: IProps) => {
  return (
    <div className="desktop-container">
      <div className="desktop-wrapper">{children}</div>
    </div>
  );
};

export default DesktopLayout;
