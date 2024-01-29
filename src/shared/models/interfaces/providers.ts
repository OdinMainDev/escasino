export interface IProvider {
  url: string;
  data: IProviderData;
}

export interface IProviderData {
  texts: IProviderText[];
  image: string | null;
}

export interface IProviderText {
  language: string;
  key: string;
  value: string;
}
