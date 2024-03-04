'use client';

import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import Icons from '../Icons';

interface IProps {
  className?: string;
}

const GoBackButton = ({ className }: IProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const goBack = () => {
    router.back();
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
