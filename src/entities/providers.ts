export interface IProvider {
  url: string;
  data: {
    image: string;
    texts: IProviderText[];
  };
}

export interface IProviderText {
  language: string;
  key: string;
  value: string;
}
