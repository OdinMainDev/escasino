'use client';

import { IProvider } from '@/shared/models/interfaces/providers';
import styles from './ProviderItem.module.scss';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';

const ProviderItem = (props: IProvider) => {
  const searchParams = useSearchParams();
  const provider = searchParams.get('provider');
  return (
    <span
      className={classNames(styles.container, {
        [styles.is_selected]: props.url === provider,
      })}
    >
      {props.url}
    </span>
  );
};

export default ProviderItem;
