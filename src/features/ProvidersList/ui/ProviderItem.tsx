import { IProvider } from '@/shared/models/interfaces/providers';
import styles from './ProviderItem.module.scss';

const ProviderItem = (provider: IProvider) => {
  return <div className={styles.container}>{provider.url}</div>;
};

export default ProviderItem;
