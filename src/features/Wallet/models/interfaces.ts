import { IBillingGroup } from '@/shared/models/interfaces/billingGroups';

export interface ISelectBillingGroup extends IBillingGroup {
  selected: boolean;
}
