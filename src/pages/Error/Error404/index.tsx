import { usePreloader } from '@/app/providers/PreloaderProvider';

const Error404 = () => {
  const { hidePreloader } = usePreloader();
  hidePreloader();
  return 'ОШИБКА 404';
};

export default Error404;
