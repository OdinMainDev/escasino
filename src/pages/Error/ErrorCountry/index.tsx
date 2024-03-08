import { usePreloader } from '@/app/providers/PreloaderProvider';

const ErrorCountry = () => {
  const { hidePreloader } = usePreloader();
  hidePreloader();
  return 'Страна с которой вы зашли не доступна в нашем казино ( запрет страны ) ';
};

export default ErrorCountry;
