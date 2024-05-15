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

export interface IPaymentTransaction {
  address: string;
  amount: string;
  convert_rate: string;
  currency: string;
  status: string;
}

export interface ICreateWithdrawtData {
  provider: number;
  fid: string;
  amount: number;
  to_address: string;
}
