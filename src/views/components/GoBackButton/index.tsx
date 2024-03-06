import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Icons from '../Icons';
import { usePathname } from '@/app/helpers/navigation';

interface IProps {
  className?: string;
}

const GoBackButton = ({ className }: IProps) => {
  const navigate = useNavigate();
  const pathname = usePathname();

  const goBack = () => {
    navigate(-1);
  };

  if (pathname == '/' || pathname == '') {
    return null;
  }

  return (
    <div onClick={goBack} className={classNames(className, 'cursor-pointer')}>
      <Icons icon="goback" />
    </div>
  );
};

export default GoBackButton;
