import { IBonus, IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import axios from 'axios';
import Cookies from 'js-cookie';

export const bonusTemplatesApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/bonus/templates`;
};

export const myBonusesApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/bonuses`;
};

export const setMyActiveBonusApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/set/my/bonus`;
};

export const setMyActiveBonusCancelApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/set/my/bonus/cancel`;
};

export interface IResponseBonuses {
  status: number | null;
  bonuses: IBonus[];
}

export interface IResponseBonusesTemplate {
  status: number | null;
  bonusesTemplates: IBonusTemplate[];
}

export const getBonusTemplatesApi = async (): Promise<IResponseBonusesTemplate> => {
  const { data, status } = await axios.get<{ data: IBonusTemplate[] }>(bonusTemplatesApi(), {
    headers: {
      Authorization: `Bearer: ${Cookies.get('atoken')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseBonusesTemplate = {
    bonusesTemplates: data.data,
    status: status,
  };

  return resp;
};

export const getMyBonusesApi = async (): Promise<IResponseBonuses> => {
  const { data, status } = await axios.get<{ data: IBonus[] }>(myBonusesApi(), {
    headers: {
      Authorization: `Bearer: ${Cookies.get('atoken')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseBonuses = {
    bonuses: data.data,
    status: status,
  };

  return resp;
};

export const postSetMyActiveBonusApi = () => {
  return axios.get(setMyActiveBonusApi(), {
    headers: {
      Authorization: `Bearer: ${Cookies.get('atoken')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
};

export const postSetMyActiveBonusCancelApi = () => {
  return axios.get(setMyActiveBonusCancelApi(), {
    headers: {
      Authorization: `Bearer: ${Cookies.get('atoken')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
};
