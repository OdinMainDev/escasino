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
