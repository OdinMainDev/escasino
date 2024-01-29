import { useEffect, useState } from 'react';
import { getCategoriesApi } from '../api/categoriesApi';
import { ICategory } from '@/shared/models/interfaces/categories';

import styles from './CategoriesList.module.scss';
import classNames from 'classnames';

interface IProps {
  selectedCategories: string[];
  selectCategory: (selectedCategory: string) => void;
}

const CategoriesList = ({ selectedCategories, selectCategory }: IProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await getCategoriesApi();
      setLoading(false);
      setCategories(categories);
    };

    void getCategories();
  }, []);

  return (
    <div className={styles.container}>
      {loading
        ? Array(8)
            .fill(0)
            .map((item, index) => <div className={styles.skeleton} key={index}></div>)
        : categories.map((item) => (
            <div
              onClick={() => selectCategory(item.url)}
              className={classNames(styles.category, {
                [styles.selected]: selectedCategories.includes(item.url),
              })}
              key={item.url}
            >
              {item.data.texts.find((item) => item.language.toLocaleLowerCase() === 'ru')?.value}
            </div>
          ))}
    </div>
  );
};

export default CategoriesList;
