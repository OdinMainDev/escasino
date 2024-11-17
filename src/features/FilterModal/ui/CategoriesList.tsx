import { useAppSelector } from '@/store/hooks/redux';

import styles from './CategoriesList.module.scss';
import { TabItem } from '@/entities/TabItem';
import { useCurrentLanguage } from '@/app/providers/LangProvider';

interface IProps {
  selectedCategories: string[];
  selectCategory: (selectedCategory: string) => void;
}

const CategoriesList = ({ selectedCategories, selectCategory }: IProps) => {
  const { categories, loading } = useAppSelector((state) => state.gameCategoriesReducer);
  const currentLanguage = useCurrentLanguage();

  return (
    <div className={styles.container}>
      {loading
        ? Array(5)
            .fill(0)
            .map((_, index) => <TabItem key={index} skeleton={true} />)
        : categories?.map((item) => (
            <TabItem
              onClick={() => selectCategory(item.url)}
              selected={selectedCategories.includes(item.url)}
              key={item.url}
            >
              {
                item.data.texts.find(
                  (item) => item.language.toLocaleLowerCase() === currentLanguage,
                )?.value
              }
            </TabItem>
          ))}
    </div>
  );
};

export default CategoriesList;
