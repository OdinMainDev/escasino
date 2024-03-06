import { usePreloader } from '@/app/providers/preloader';

const HomePage = () => {
  const { hidePreloader } = usePreloader();

  hidePreloader();
  return <div>главная</div>;
};

export default HomePage;
