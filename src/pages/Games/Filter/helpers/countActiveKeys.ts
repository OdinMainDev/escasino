import { IFilter } from '@/entities/interfaces/filter';

export function countActiveKeys(obj: IFilter): number {
  let count = 0;

  if (obj.categories.length > 0) {
    count += obj.categories.length;
  }

  if (obj.providers.length > 0) {
    count += obj.providers.length;
  }
  if (obj.is_game_avail_for_bonus === true) {
    count++;
  }

  return count;
}
