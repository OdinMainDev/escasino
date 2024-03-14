import { useAppSelector } from '@/store/hooks/redux';
import { useEffect, useState } from 'react';

import styles from './CategoriesList.module.scss';
import { TabItem } from '@/shared/components/TabItem';
import Loader from '@/shared/components/Loader';

interface IProps {
  selectedCategories: string[];
  selectCategory: (selectedCategory: string) => void;
}

const CategoriesList = ({ selectedCategories, selectCategory }: IProps) => {
  const { categories, loading } = useAppSelector((state) => state.gameCategoriesReducer);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    if (!loading) {
      setLoader(false);
    }
  }, [loading]);

  return (
    <div className={styles.container}>
      {loader || loading ? (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      ) : (
        categories?.map((item) => (
          <TabItem
            onClick={() => selectCategory(item.url)}
            selected={selectedCategories.includes(item.url)}
            key={item.url}
          >
            {item.data.texts.find((item) => item.language.toLocaleLowerCase() === 'ru')?.value}
          </TabItem>
        ))
      )}
    </div>
  );
};

export default CategoriesList;
