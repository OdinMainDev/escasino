import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartBonusTemplate } from '@/shared/models/interfaces/bonuses';

export interface IInitialCartBonuses {
  bonusesTemplates: ICartBonusTemplate[];
  depositAmount: number | string;
  minAmount: number;
  maxAmount: number;
}

const initialState: IInitialCartBonuses = {
  bonusesTemplates: [],
  depositAmount: '',
  minAmount: 0,
  maxAmount: 0,
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
    setDepositAmount(state, action: PayloadAction<number | string>) {
      state.depositAmount = action.payload;
    },
  },
});

export const { addToCartBonuses, deleteCartBonusesItem, setDepositAmount } =
  cartBonusesSlice.actions;
export default cartBonusesSlice.reducer;
