import { usePreloader } from '@/app/providers/preloader';

function TermsPage() {
  const { hidePreloader } = usePreloader();
  hidePreloader();
  return <div>правила</div>;
}

export default TermsPage;
