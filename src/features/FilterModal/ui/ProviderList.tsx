import { memo } from 'react';
import styles from './ProviderList.module.scss';
import { useAppSelector } from '@/store/hooks/redux';
import { TabBlock } from '@/entities/TabBlock';

interface IProps {
  selectedProviders: string[];
  selectProvider: (selectedCategory: string) => void;
}

const ProviderList = memo(({ selectedProviders, selectProvider }: IProps) => {
  const { providers, loading } = useAppSelector((state) => state.gameProvidersReducer);
  return (
    <div className={styles.container}>
      {loading
        ? Array(6)
            .fill(0)
            .map((_, index) => <TabBlock skeleton={true} key={index} />)
        : providers?.map((item) => (
            <TabBlock
              selected={selectedProviders.includes(item.url)}
              onClick={() => selectProvider(item.url)}
              key={item.url}
              secondary={true}
            >
              <div className={styles.provider}>
                <img src={item.data.image || ''} alt={item.url} className={styles.image} />
                {/* <div className={styles.text}>{item.url}</div> */}
              </div>
            </TabBlock>
          ))}
    </div>
  );
});

export default ProviderList;
