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

export interface IPaymentProviderLayout {
  name: string | null;
  type: string | null;
  className: string | null;
}

export interface IPaymentProviderConditions {
  limit_minimum: number;
  limit_maximum: number;
}

export interface IPaymentProviderMeta {
  texts: IPaymentProviderText[];
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
