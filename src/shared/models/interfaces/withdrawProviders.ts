export interface IWithdrawProvider {
  layout: IWithdrawProviderLayout[];
  currency: string;
  conditions: IWithdrawProviderConditions;
  meta: IWithdrawProviderMeta;
  fees: IWithdrawProviderFees;
  rules: IWithdrawProviderRules;
  id: number;
  billing_groups: number[];
}

export interface IWithdrawProviderLayout {
  name: string;
  type: string | null;
  className: string | null;
}

export interface IWithdrawProviderConditions {
  limit_minimum: number;
  limit_maximum: number;
}

export interface IWithdrawProviderMeta {
  texts: IWithdrawProviderText[];
  image: string;
}

export interface IWithdrawProviderText {
  language: string;
  key: string;
  value: string;
}

export interface IWithdrawProviderFees {
  fixed: number;
  percent: number;
}

export interface IWithdrawProviderRules {}
