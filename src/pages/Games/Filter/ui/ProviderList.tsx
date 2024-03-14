import { memo, useEffect, useState } from 'react';

import styles from './ProviderList.module.scss';
import { useAppSelector } from '@/store/hooks/redux';
import { TabBlock } from '@/shared/components/TabBlock';
import Loader from '@/shared/components/Loader';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';

interface IProps {
  selectProvider: (selectedCategory: string) => void;
}

const ProviderList = memo(({ selectProvider }: IProps) => {
  const { providers, loading } = useAppSelector((state) => state.gameProvidersReducer);
  const { getFilters } = useGamesFilters();
  const [loader, setLoader] = useState<boolean>(true);
  const [selectedProviders, setSelectedProviders] = useState<string[]>(getFilters().providers);

  useEffect(() => {
    if (!loading) {
      setLoader(false);
    }
  }, [loading, selectedProviders]);

  return (
    <div className={styles.container}>
      {loader || loading ? (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      ) : (
        providers?.map((item) => (
          <TabBlock
            selected={selectedProviders.includes(item.url)}
            onClick={() => {
              selectProvider(item.url);
              setSelectedProviders(getFilters().providers);
            }}
            key={item.url}
          >
            <div className={styles.provider}>
              <img src={item.data.image || ''} alt={item.url} className={styles.image} />
              <div className={styles.text}>{item.url}</div>
            </div>
          </TabBlock>
        ))
      )}
    </div>
  );
});

export default ProviderList;
