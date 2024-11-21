import axiosApi from '@/shared/lib/axios';
import { IResponseData } from '@/shared/models/interfaces/axios';
import { IGame } from '@/shared/models/interfaces/game';

export const bonusGamesApi = (): string => {
  return '/api/v1/private/get/games/bonuses/';
};

export const getBonusGames = async (page?: number): Promise<IResponseData<IGame[]>> => {
  const { data, status } = await axiosApi.get<{ data: IGame[] }>(bonusGamesApi(), {
    params: {
      page,
    },
  });
  const resp: IResponseData<IGame[]> = {
    data: data.data,
    status: status,
  };

  return resp;
};
