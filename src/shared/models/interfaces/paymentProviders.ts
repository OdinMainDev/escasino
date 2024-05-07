export interface IPaymentProvider {
  layout: IPaymentProviderLayout[];
  currency: string;
  conditions: IPaymentProviderConditions;
  meta: IPaymentProviderMeta;
  fees: IPaymentProviderFees;
  rules: IPaymentProviderRules;
  id: number;
  billing_groups: number[];
}

// TODO: проверить правильно ли сделал ( может быть такое ( как для коинремиттер по дефолту) что нет полей для заполнения)
// сейчас для коинремиттер добавил ради теста
export interface IPaymentProviderLayout {
  key: string | null;
  type: string | null;
  value: string | null;
}

export interface IPaymentProviderConditions {
  limit_minimum: number;
  limit_maximum: number;
}

export interface IPaymentProviderMeta {
  texts: Text[];
  image: string;
}

export interface IPaymentProviderText {
  language: string;
  key: string;
  value: string;
}

export interface IPaymentProviderFees {
  fixed: number;
  percent: number;
}

export interface IPaymentProviderRules {
  compensate_commission: boolean;
  without_bonus_wager: number;
}
