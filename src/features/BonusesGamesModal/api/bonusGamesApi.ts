import axiosApi from '@/shared/lib/axios';
import { IResponseData } from '@/shared/models/interfaces/axios';
import { IGame } from '@/shared/models/interfaces/game';

export const bonusGamesApi = (bonusId?: number): string => {
  if (Number(bonusId) > 0) {
    return `/api/v1/private/get/games/bonus/${bonusId}`;
  }
  return '/api/v1/private/get/games/bonuses/';
};

export const noDepositBonusGames = () => {
  return '/api/v1/private/get/games/bonuses/nodeposit';
};

export const getBonusGames = async (
  page?: number,
  bonusId?: number,
  isNoDeposit?: boolean,
): Promise<IResponseData<IGame[]>> => {
  const { data, status } = await axiosApi.get<{ data: IGame[] }>(
    !isNoDeposit ? bonusGamesApi(bonusId) : noDepositBonusGames(),
    {
      params: {
        page,
      },
    },
  );
  const resp: IResponseData<IGame[]> = {
    data: data.data,
    status: status,
  };

  return resp;
};
