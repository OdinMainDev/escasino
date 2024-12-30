import { IWinning } from '../models/interfaces';
import axiosApi from '@/shared/lib/axios';

export const getWinningsList = async (game_id: number): Promise<IWinning[]> => {
  try {
    const { data } = await axiosApi.get<{ data: IWinning[] }>(
      `/api/v1/public/get/game/${game_id}/last_wins`,
    );
    return data.data;
  } catch (e) {
    return [];
  }
};
