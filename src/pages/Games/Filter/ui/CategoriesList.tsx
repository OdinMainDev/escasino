import { useAppSelector } from '@/store/hooks/redux';
import { useEffect, useState } from 'react';

import styles from './CategoriesList.module.scss';
import { TabItem } from '@/entities/TabItem';
import Loader from '@/shared/ui/Loader';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';

interface IProps {
  selectCategory: (selectedCategory: string) => void;
}

const CategoriesList = ({ selectCategory }: IProps) => {
  const { categories, loading } = useAppSelector((state) => state.gameCategoriesReducer);
  const { getFilters } = useGamesFilters();
  const [loader, setLoader] = useState<boolean>(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(getFilters().categories);

  useEffect(() => {
    if (!loading) {
      setLoader(false);
    }
  }, [loading, selectedCategories]);

  return (
    <div className={styles.container}>
      {loader || loading ? (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      ) : (
        categories?.map((item) => (
          <TabItem
            onClick={() => {
              selectCategory(item.url);
              setSelectedCategories(getFilters().categories);
            }}
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
