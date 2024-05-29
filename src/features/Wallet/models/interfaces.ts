import { IBillingGroup } from '@/shared/models/interfaces/billingGroups';

export interface ISelectBillingGroup extends IBillingGroup {
  selected: boolean;
}

export interface IProviderLayout {
  [key: string]: string;
}

export interface ICreatePaymentData {
  provider: number;
  fid: string;
  amount: number;
}

export interface IPaymentTransactionFirst {
  requisites: string;
  amount: string;
  convert_rate: string;
  currency: string;
  status: string;
}

export interface IPaymentTransactionSecond {
  amount: string;
  currency: string;
  status: string;
  url: string;
}

export interface IPaymentTransactionAcl {
  acs_url: string;
  amount: string;
  currency: string;
  form_data: string;
  status: string;
}
export type IPaymentTransaction =
  | IPaymentTransactionFirst
  | IPaymentTransactionSecond
  | IPaymentTransactionAcl;

export interface ICreateWithdrawtData {
  provider: number;
  fid: string;
  amount: number;
  to_address: string;
}

export interface IPaymentTransactionError {
  success: boolean;
}

export interface IHistoryItem {
  provider_id: number;
  currency: string;
  hash: string;
  status: number;
  amount: number;
  total_amount: number;
  formatted_amount: number;
  formatted_total_amount: number;
  created_at: number;
  updated_at: number;
  completed_at: number;
}

export interface IFilterHistory {
  label: string;
  value: string;
}

export interface IValidateData {
  amount: number;
  max: number;
  min: number;
  layout: IProviderLayout;
}
