import { useEffect, useState } from 'react';

const useOrientation = (): { isPortrait: boolean; isMobile: boolean } => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    const handleOrientationChange = (e: MediaQueryListEvent) => {
      setIsPortrait(e.matches);
    };

    const mediaQuery = window.matchMedia('(orientation: portrait)');
    mediaQuery.addEventListener('change', handleOrientationChange);

    checkIfMobile();

    return () => mediaQuery.removeEventListener('change', handleOrientationChange);
  }, []);

  return { isPortrait, isMobile };
};
export default useOrientation;
