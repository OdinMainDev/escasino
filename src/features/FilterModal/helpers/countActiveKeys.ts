import { IFilter } from '@/shared/models/interfaces/filter';

export function countActiveKeys(obj: IFilter): number {
  let count = 0;

  if (obj.categories.length > 0) {
    count++;
  }

  if (obj.providers.length > 0) {
    count++;
  }
  if (obj.is_game_avail_for_bonus === true) {
    count++;
  }

  return count;
}
