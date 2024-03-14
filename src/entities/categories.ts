export interface ICategory {
  url: string;
  data: {
    image: string;
    texts: ICategoryText[];
  };
}

export interface ICategoryText {
  language: string;
  key: string;
  value: string;
}