import axiosApi from '@/shared/lib/axios';
import {
  BonusStatusesType,
  IBonus,
  IBonusTemplate,
  ISetActiveBonus,
} from '@/shared/models/interfaces/bonuses';

export const bonusTemplatesApi = (): string => {
  return '/api/v1/private/get/bonus/templates';
};

export const myBonusesApi = (): string => {
  return '/api/v1/private/get/my/bonuses';
};

export const setMyActiveBonusApi = (): string => {
  return '/api/v1/private/set/my/active/bonus';
};

export const setMyActiveBonusCancelApi = (): string => {
  return '/api/v1/private/set/my/active/bonus/cancel';
};

export interface IResponseBonuses {
  status: number | null;
  bonuses: IBonus[];
}

export interface IResponseBonusesTemplate {
  status: number | null;
  bonusesTemplates: IBonusTemplate[];
}

export const getBonusTemplatesApi = async (
  is_no_deposit?: boolean,
): Promise<IResponseBonusesTemplate> => {
  const { data, status } = await axiosApi.get<{ data: IBonusTemplate[] }>(bonusTemplatesApi(), {
    params: {
      is_no_deposit,
    },
  });
  const resp: IResponseBonusesTemplate = {
    bonusesTemplates: data.data,
    status: status,
  };

  return resp;
};

export const getMyBonusesApi = async (
  completed?: boolean,
  page?: number,
  bonusStatus?: BonusStatusesType,
): Promise<IResponseBonuses> => {
  const { data, status } = await axiosApi.get<{ data: IBonus[] }>(myBonusesApi(), {
    params: {
      completed,
      page,
      status: bonusStatus,
    },
  });
  const resp: IResponseBonuses = {
    bonuses: data.data,
    status: status,
  };

  return resp;
};

export const postSetMyActiveBonusApi = (body: ISetActiveBonus) => {
  return axiosApi.post(setMyActiveBonusApi(), body);
};

export const postSetMyActiveBonusCancelApi = (body: unknown) => {
  return axiosApi.post(setMyActiveBonusCancelApi(), body);
};
