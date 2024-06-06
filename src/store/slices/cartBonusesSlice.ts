// TODO: сделать сброс если не на странице платежа, бонуса, выбора игр для бонуса и тд
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartBonusTemplate } from '@/shared/models/interfaces/bonuses';

export interface IInitialCartBonuses {
  bonusesTemplates: ICartBonusTemplate[];
  minAmount: number;
  maxAmount: number;
  game_ids: number[];
}

const initialState: IInitialCartBonuses = {
  bonusesTemplates: [],
  minAmount: 0,
  maxAmount: 0,
  game_ids: [],
};

export const cartBonusesSlice = createSlice({
  name: 'cartBonuses',
  initialState: initialState,
  reducers: {
    addToCartBonuses(state, action: PayloadAction<ICartBonusTemplate>) {
      state.bonusesTemplates = [...state.bonusesTemplates, action.payload];
      const { maxAmount, minAmount } = state.bonusesTemplates.reduce(
        (acc, obj) => {
          if (obj.bonus_settings.min_amount > acc.maxAmount) {
            acc.minAmount = obj.bonus_settings.min_amount;
          }
          if (obj.bonus_settings.max_amount < acc.minAmount) {
            acc.maxAmount = obj.bonus_settings.max_amount;
          }
          return acc;
        },
        {
          minAmount: state.bonusesTemplates[0].bonus_settings.min_amount,
          maxAmount: state.bonusesTemplates[0].bonus_settings.max_amount,
        },
      );
      state.minAmount = minAmount;
      state.maxAmount = maxAmount;
    },
    deleteCartBonusesItem(state, action: PayloadAction<number>) {
      state.bonusesTemplates = state.bonusesTemplates.filter((item) => item.id !== action.payload);
    },
    setGameIds(state, action: PayloadAction<number[]>) {
      state.game_ids = action.payload;
    },
  },
});

export const { addToCartBonuses, deleteCartBonusesItem, setGameIds } = cartBonusesSlice.actions;
export default cartBonusesSlice.reducer;
