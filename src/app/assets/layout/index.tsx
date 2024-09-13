import '@/app/assets/styles/global.scss';
import './styles.scss';
import './preloader.scss';
import { Outlet } from 'react-router-dom';
import useOrientation from '@/shared/hooks/useOrientation';
import { usePathname } from '@/shared/helpers/navigation';
import { useEffect } from 'react';

const Layout = () => {
  const { isMobile, isPortrait } = useOrientation();
  const pathname = usePathname();
  const isGamePage = pathname.includes('/play/');

  useEffect(() => {
    const body = document.documentElement;
    if (isGamePage && isMobile && !isPortrait) {
      body.style.setProperty('--desktop-max-width', 'none');
    }
  }, [isGamePage, isMobile, isPortrait]);

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);

  return (
    <div>
      {/* <div className="device">
        <div className="device__a">
          <div className="device__a-1"></div>
          <div className="device__a-2"></div>
        </div>
        <div className="device__b"></div>
        <div className="device__c"></div>
        <div className="device__d"></div>
        <div className="device__e"></div>
        <div className="device__f"></div>
        <div className="device__g"></div>
      </div> */}
      <div className="desktop-container">
        <div className={'desktop-wrapper'}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
