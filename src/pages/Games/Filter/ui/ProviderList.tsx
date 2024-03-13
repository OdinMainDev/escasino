import { memo, useEffect, useState } from 'react';
// import { getProvidersApi } from '../api/providersApi';

// import styles from './ProviderList.module.scss';
// import { IProvider } from '@/entities/interfaces/providers';
// import { TabBlock } from '@/entities/TabBlock';

interface IProps {
  selectedProviders: string[];
  selectProvider: (selectedCategory: string) => void;
}

const ProviderList = memo(({ selectedProviders, selectProvider }: IProps) => {
  return '';
  // const [providersList, setProvidersList] = useState<IProvider[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const getProviders = async () => {
  //     setLoading(true);
  //     const providers = await getProvidersApi();
  //     setLoading(false);
  //     setProvidersList(providers);
  //   };

  //   void getProviders();
  // }, []);

  // return (
  //   <div className={styles.container}>
  //     {loading
  //       ? Array(6)
  //           .fill(0)
  //           .map((item, index) => <TabBlock skeleton={true} key={index}></TabBlock>)
  //       : providersList.map((item) => (
  //           <TabBlock
  //             selected={selectedProviders.includes(item.url)}
  //             onClick={() => selectProvider(item.url)}
  //             key={item.url}
  //           >
  //             <div className={styles.provider}>
  //               <img src={item.data.image || ''} alt={item.url} className={styles.image} />
  //               <div className={styles.text}>{item.url}</div>
  //             </div>
  //             {/* TODO: надо сделать чтобы картинка была больше и над текстом */}
  //           </TabBlock>
  //         ))}
  //   </div>
  // );
});

export default ProviderList;
