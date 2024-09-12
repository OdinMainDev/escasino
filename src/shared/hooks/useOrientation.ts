import { useEffect, useState } from 'react';

const useOrientation = (): { isPortrait: boolean; isMobile: boolean } => {
  const [isPortrait, setIsPortrait] = useState<boolean>(
    window.matchMedia('(orientation: portrait)').matches,
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Проверка на мобильное устройство
    const checkIfMobile = () => {
      const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    // Обработчик изменения ориентации
    const handleOrientationChange = (e: MediaQueryListEvent) => {
      setIsPortrait(e.matches);
    };

    const mediaQuery = window.matchMedia('(orientation: portrait)');
    mediaQuery.addEventListener('change', handleOrientationChange);

    // Проверка при монтировании компонента
    checkIfMobile();

    // Убираем слушателя при размонтировании компонента
    return () => mediaQuery.removeEventListener('change', handleOrientationChange);
  }, []);

  return { isPortrait, isMobile };
};
export default useOrientation;
