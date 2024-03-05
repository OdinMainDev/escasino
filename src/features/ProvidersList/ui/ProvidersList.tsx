import { DraggableScroll } from '@/entities/DraggableScroll';
import { getProvidersApi } from '../api/providersApi';
import ProviderItem from './ProviderItem';

import styles from './ProvidersList.module.scss';
import { Link } from 'react-router-dom';
const ProvidersList = async () => {
  const providers = await getProvidersApi();
  return (
    <DraggableScroll className={styles.container}>
      {providers.map((item, index) => (
        <Link to={`/games?provider=${item.url}`} className={styles.provider} key={index}>
          <ProviderItem {...item} />
        </Link>
      ))}
    </DraggableScroll>
  );
};

export default ProvidersList;
