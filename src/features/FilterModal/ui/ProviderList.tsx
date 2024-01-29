import { memo, useEffect, useState } from 'react';
import { getProvidersApi } from '../api/providersApi';

import styles from './ProviderList.module.scss';
import { IProvider } from '@/shared/models/interfaces/providers';
import classNames from 'classnames';
// import Image from 'next/image';

interface IProps {
  selectedProviders: string[];
  selectProvider: (selectedCategory: string) => void;
}

const ProviderList = memo(({ selectedProviders, selectProvider }: IProps) => {
  const [providersList, setProvidersList] = useState<IProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProviders = async () => {
      setLoading(true);
      const providers = await getProvidersApi();
      setLoading(false);
      setProvidersList(providers);
    };

    void getProviders();
  }, []);

  return (
    <div className={styles.container}>
      {loading
        ? Array(6)
            .fill(0)
            .map((item, index) => <div className={styles.skeleton} key={index}></div>)
        : providersList.map((item) => (
            <div
              onClick={() => selectProvider(item.url)}
              className={classNames(styles.provider, {
                [styles.selected]: selectedProviders.includes(item.url),
              })}
              key={item.url}
            >
              {/* <Image src={item.data.image || ''} alt={item.url} width={25} height={65} /> */}
              <div className={styles.text}>{item.url}</div>
            </div>
          ))}
    </div>
  );
});

export default ProviderList;
