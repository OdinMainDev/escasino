import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { usePathname } from '@/shared/helpers/navigation';
import Icons from '@/shared/ui/Icons';

interface IProps {
  className?: string;
  customPath?: string | undefined;
}

const GoBackButton = ({ className, customPath }: IProps) => {
  const navigate = useNavigate();
  const pathname = usePathname();

  const goBack = () => {
    if (customPath) {
      navigate(customPath);
      return;
    }
    navigate(-1);
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
