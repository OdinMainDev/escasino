import classNames from 'classnames';
import { usePathname, useRouter } from '@/shared/helpers/navigation';
import Icons from '@/shared/ui/Icons';
import { useNavigate } from 'react-router-dom';
import { useCurrentLanguage } from '@/app/providers/LangProvider';

interface IProps {
  className?: string;
  customPath?: string | undefined;
}

const GoBackButton = ({ className, customPath }: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const navigation = useNavigate();
  const currentLanguage = useCurrentLanguage();

  const goBack = () => {
    if (customPath) {
      navigation('/' + currentLanguage + customPath, { replace: true });
      return;
    }
    router.goBack();
  };

  if (pathname == '/') {
    return null;
  }

  return (
    <div onClick={goBack} className={classNames(className, 'cursor-pointer')}>
      <Icons icon="goback" />
    </div>
  );
};

export default GoBackButton;
