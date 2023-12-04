import { DraggableScroll } from '@/entities/DraggableScroll';
import { getProvidersApi } from '../api/providersApi';
import ProviderItem from './ProviderItem';

import styles from './ProvidersList.module.scss';

const ProvidersList = async () => {
  const providers = await getProvidersApi();
  return (
    <DraggableScroll className={styles.container}>
      {providers.map((item, index) => (
        <div className={styles.provider} key={index}>
          <ProviderItem {...item} />
        </div>
      ))}
    </DraggableScroll>
  );
};

export default ProvidersList;
