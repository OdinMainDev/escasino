import axiosApi from '@/shared/lib/axios';
import { IResponseData } from '@/shared/models/interfaces/axios';
import { INoDepositBonus, INoDepositBonusReq } from '@/shared/models/interfaces/bonuses';

export const nodepositApi = () => {
  return '/api/v1/private/get/my/bonuses/nodeposit';
};

export const activeNoDepositBonusApi = () => {
  return '/api/v1/private/activate/my/nodeposit/bonus';
};

export const activeNoDepositBonus = async (req: INoDepositBonusReq) => {
  const { data, status } = await axiosApi.post<IResponseData<INoDepositBonus>>(
    activeNoDepositBonusApi(),
    req,
  );
  const resp: IResponseData<INoDepositBonus> = {
    data: data.data,
    status: status,
  };

  return resp;
};
export const getMyNoDepositBonuses = async () => {
  const { data, status } = await axiosApi.get<IResponseData<INoDepositBonus>>(nodepositApi());
  const resp: IResponseData<INoDepositBonus> = {
    data: data.data,
    status: status,
  };

  return resp;
};
