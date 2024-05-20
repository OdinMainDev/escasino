import axios from 'axios';
import { IBillingGroup } from '@/shared/models/interfaces/billingGroups';
import Cookies from 'js-cookie';

export const billingGroupsApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/billing/groups`;
};

export interface IResponseBillingGroups {
  billingGroups: IBillingGroup[] | null;
  status: number | null;
}

export const getBillingGroupsApi = async (): Promise<IResponseBillingGroups> => {
  const { data, status } = await axios.get<{ data: IBillingGroup[] }>(billingGroupsApi(), {
    headers: {
      Authorization: `Bearer: ${Cookies.get('atoken')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseBillingGroups = {
    billingGroups: data.data,
    status: status,
  };
  return resp;
};
