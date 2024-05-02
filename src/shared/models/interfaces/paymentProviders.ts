export interface IPaymentProvider {
  data: {
    image: string;
    texts: IPaymentProviderText[];
  };
}

export interface IPaymentProviderText {
  language: string;
  key: string;
  value: string;
}
