import { IBillingGroup } from '@/shared/models/interfaces/billingGroups';
import axiosApi from '@/shared/lib/axios';

export const billingGroupsApi = () => {
  return '/api/v1/private/get/billing/groups';
};

export interface IResponseBillingGroups {
  billingGroups: IBillingGroup[] | null;
  status: number | null;
}

export const getBillingGroupsApi = async (): Promise<IResponseBillingGroups> => {
  const { data, status } = await axiosApi.get<{ data: IBillingGroup[] }>(billingGroupsApi());
  const resp: IResponseBillingGroups = {
    billingGroups: data.data,
    status: status,
  };
  return resp;
};
