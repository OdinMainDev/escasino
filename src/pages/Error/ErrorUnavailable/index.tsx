import { usePreloader } from '@/app/providers/PreloaderProvider';

const ErrorUnavailable = () => {
  const { hidePreloader } = usePreloader();
  hidePreloader();
  return 'Казино находится на ремонте';
};

export default ErrorUnavailable;
