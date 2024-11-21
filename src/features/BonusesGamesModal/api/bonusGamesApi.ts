import axiosApi from '@/shared/lib/axios';
import { IResponseData } from '@/shared/models/interfaces/axios';
import { IGame } from '@/shared/models/interfaces/game';

export const bonusGamesApi = (bonusId?: number): string => {
  if (Number(bonusId) > 0) {
    return `/api/v1/public/get/games/bonus/${bonusId}`;
  }
  return '/api/v1/public/get/games/bonuses/';
};

export const getBonusGames = async (
  page?: number,
  bonusId?: number,
): Promise<IResponseData<IGame[]>> => {
  const { data, status } = await axiosApi.get<{ data: IGame[] }>(bonusGamesApi(bonusId), {
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
