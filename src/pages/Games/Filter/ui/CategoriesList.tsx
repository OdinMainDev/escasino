import { useAppSelector } from '@/store/hooks/redux';

import styles from './CategoriesList.module.scss';
import { TabItem } from '@/entities/TabItem';
import { useGamesFilters } from '@/app/providers/pages/GamesFilter';

interface IProps {
  selectCategory: (selectedCategory: string) => void;
}

const CategoriesList = ({ selectCategory }: IProps) => {
  const { categories, loading } = useAppSelector((state) => state.gameCategoriesReducer);
  const { getFilters } = useGamesFilters();

  return (
    <div className={styles.container}>
      {loading
        ? Array(5)
            .fill(0)
            .map((_, index) => <TabItem key={index} skeleton={true} />)
        : categories?.map((item) => (
            <TabItem
              onClick={() => selectCategory(item.url)}
              selected={getFilters().categories.includes(item.url)}
              key={item.url}
            >
              {item.data.texts.find((item) => item.language.toLocaleLowerCase() === 'ru')?.value}
            </TabItem>
          ))}
    </div>
  );
};

export default CategoriesList;
