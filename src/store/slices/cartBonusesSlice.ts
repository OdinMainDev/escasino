import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartBonusTemplate } from '@/shared/models/interfaces/bonuses';

export interface IInitialCartBonuses {
  bonusesTemplates: ICartBonusTemplate[];
  depositAmount: number | string;
}

const initialState: IInitialCartBonuses = {
  bonusesTemplates: [],
  depositAmount: '',
};

export const cartBonusesSlice = createSlice({
  name: 'cartBonuses',
  initialState: initialState,
  reducers: {
    addToCartBonuses(state, action: PayloadAction<ICartBonusTemplate>) {
      state.bonusesTemplates = [...state.bonusesTemplates, action.payload];
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
