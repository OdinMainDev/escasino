import '@/app/assets/styles/global.scss';
import './styles.scss';
import styles from '@/features/Profile/ui/ProfileForm/styles.module.scss';
import './preloader.scss';
import { Outlet } from 'react-router-dom';
import useOrientation from '@/shared/hooks/useOrientation';
import { usePathname } from '@/shared/helpers/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/shared/ui/Loader';
import { usePusherModelProvider } from '@/app/providers/PusherModalProvider';

const Layout = () => {
  const { isMobile, isPortrait } = useOrientation();
  const pathname = usePathname();
  const isGamePage = pathname.includes('/play/');

  const { isLoadedPusherProvider } = usePusherModelProvider(); 

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
      <div
        className="desktop-container"
        style={{ backgroundColor: '#' + import.meta.env.VITE_BACKGROUND_COLOR }}
      >
        <div className={'desktop-wrapper'}>

        {isLoadedPusherProvider ? (
          <div>
            <Outlet />
          </div>
        ) : (
          <div className={styles.loading}>
            <Loader />
          </div>
        )}

        </div>
      </div>
    </div>
  );
};

export default Layout;
