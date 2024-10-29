import axiosApi from '@/shared/lib/axios';

export const countriesApi = () => {
  return '/api/v1/public/get/countries';
};

export interface IResponseCountries {
  countries: string[];
  status: number | null;
}

export const getCountriesApi = async (): Promise<IResponseCountries> => {
  const { data, status } = await axiosApi.get<{ data: string[] }>(countriesApi());
  const resp: IResponseCountries = {
    countries: data.data,
    status: status,
  };
  return resp;
};
