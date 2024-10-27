import { ReactNode } from 'react';

import styles from './styles.module.scss';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { PageHeader } from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import useOrientation from '@/shared/hooks/useOrientation';
import classNames from 'classnames';
import { usePathname } from '@/shared/helpers/navigation';

interface IProps {
  children: ReactNode;
  gameTitle?: string;
  customBackPath?: string;
}

const GameLayout = ({ children, gameTitle, customBackPath }: IProps) => {
  const { isAuth } = useAuthProvider();
  const pathname = usePathname();
  const { isMobile, isPortrait } = useOrientation();
  const isGamePage = pathname.includes('/play/');

  const isPhoneHorizontal = isMobile && !isPortrait && isGamePage;
  return (
    <div
      className={classNames(styles.container, {
        [styles.isPhoneHorizontal]: isPhoneHorizontal,
      })}
    >
      <PageHeader
        customBackPath={customBackPath}
        title={gameTitle}
        isPhoneHorizontal={isPhoneHorizontal}
      />
      {children}
      <Footer isHidden={!isAuth} isPhoneHorizontal={isPhoneHorizontal} />
    </div>
  );
};

export default GameLayout;
