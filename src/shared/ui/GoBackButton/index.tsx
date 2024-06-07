import classNames from 'classnames';
import { usePathname, useRouter } from '@/shared/helpers/navigation';
import Icons from '@/shared/ui/Icons';

interface IProps {
  className?: string;
  customPath?: string | undefined;
}

const GoBackButton = ({ className, customPath }: IProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const goBack = () => {
    if (customPath) {
      router.push(customPath);
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
