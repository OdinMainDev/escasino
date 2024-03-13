import { useEffect, useState } from 'react';
// import { getCategoriesApi } from '../api/categoriesApi';
// import { ICategory } from '@/entities/interfaces/categories';

// import styles from './CategoriesList.module.scss';
// import { TabItem } from '@/entities/TabItem';

interface IProps {
  selectedCategories: string[];
  selectCategory: (selectedCategory: string) => void;
}

const CategoriesList = ({ selectedCategories, selectCategory }: IProps) => {
  return '';
  // const [categories, setCategories] = useState<ICategory[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   const getCategories = async () => {
  //     setLoading(true);
  //     const categories = await getCategoriesApi();
  //     setLoading(false);
  //     setCategories(categories);
  //   };

  //   void getCategories();
  // }, []);

  // return (
  //   <div className={styles.container}>
  //     {loading
  //       ? Array(8)
  //           .fill(0)
  //           .map((item, index) => <TabItem skeleton={true} key={index}></TabItem>)
  //       : categories.map((item) => (
  //           <TabItem
  //             onClick={() => selectCategory(item.url)}
  //             selected={selectedCategories.includes(item.url)}
  //             key={item.url}
  //           >
  //             {item.data.texts.find((item) => item.language.toLocaleLowerCase() === 'ru')?.value}
  //           </TabItem>
  //         ))}
  //   </div>
  // );
};

export default CategoriesList;
