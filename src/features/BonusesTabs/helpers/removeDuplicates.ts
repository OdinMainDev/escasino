import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';

export const removeDuplicatesByBet = (data: IBonusTemplate[]): IBonusTemplate[] => {
  const map = new Map<number, IBonusTemplate>();

  data.forEach((item) => {
    const existingItem = map.get(item.configurator.bet_amount);
    if (!existingItem || item.wager > existingItem.wager) {
      map.set(item.configurator.bet_amount, item);
    }
  });

  return Array.from(map.values()).sort(
    (a, b) => a.configurator.bet_amount - b.configurator.bet_amount,
  );
};

export const removeDuplicatesBySpinsCount = (data: IBonusTemplate[]): IBonusTemplate[] => {
  const map = new Map<number, IBonusTemplate>();

  data.forEach((item) => {
    const existingItem = map.get(item.spins_count);
    if (!existingItem || item.wager > existingItem.wager) {
      map.set(item.spins_count, item);
    }
  });

  return Array.from(map.values()).sort((a, b) => a.spins_count - b.spins_count);
};
