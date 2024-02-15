'use client';

import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M19 12H5M5 12L12 19M5 12L12 5"
          stroke="white"
          strokeOpacity="0.87"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default GoBackButton;
