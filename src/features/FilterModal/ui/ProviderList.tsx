import { memo, useEffect, useState } from 'react';
import { getProvidersApi } from '../api/providersApi';

import styles from './ProviderList.module.scss';
import { IProvider } from '@/shared/models/interfaces/providers';
import { TabBlock } from '@/entities/TabBlock';

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
            .map((item, index) => <TabBlock skeleton={true} key={index}></TabBlock>)
        : providersList.map((item) => (
            <TabBlock
              selected={selectedProviders.includes(item.url)}
              onClick={() => selectProvider(item.url)}
              key={item.url}
            >
              {/* TODO: надо сделать чтобы картинка была больше и над текстом */}
              <img src={item.data.image || ''} alt={item.url} width={25} height={65} />
              <div className={styles.text}>{item.url}</div>
            </TabBlock>
          ))}
    </div>
  );
});

export default ProviderList;
