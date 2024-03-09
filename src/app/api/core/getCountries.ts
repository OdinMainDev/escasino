import axios from 'axios';

export const countriesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/countries`;
};

export interface IResponseCountries {
  countries: string[];
  status: number | null;
}

export const getCountriesApi = async (): Promise<IResponseCountries> => {
  const { data, status } = await axios.get<{ data: string[] }>(countriesApi(), {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseCountries = {
    countries: data.data,
    status: status,
  };
  return resp;
};
