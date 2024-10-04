import { IResponseData } from '@/shared/models/interfaces/axios';
import { INoDepositBonus, INoDepositBonusReq } from '@/shared/models/interfaces/bonuses';
import axios from 'axios';
import Cookies from 'js-cookie';

export const nodepositApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/bonuses/nodeposit`;
};

export const activeNoDepositBonusApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/activate/my/nodeposit/bonus`;
};

export const activeNoDepositBonus = async (req: INoDepositBonusReq) => {
  const { data, status } = await axios.post<IResponseData<INoDepositBonus>>(
    activeNoDepositBonusApi(),
    req,
    {
      headers: {
        Authorization: `Bearer: ${Cookies.get('atoken')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    },
  );
  const resp: IResponseData<INoDepositBonus> = {
    data: data.data,
    status: status,
  };

  return resp;
};
export const getMyNoDepositBonuses = async () => {
  const { data, status } = await axios.get<IResponseData<INoDepositBonus>>(nodepositApi(), {
    headers: {
      Authorization: `Bearer: ${Cookies.get('atoken')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseData<INoDepositBonus> = {
    data: data.data,
    status: status,
  };

  return resp;
};
