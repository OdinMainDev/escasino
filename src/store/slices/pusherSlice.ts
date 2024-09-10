import { typeOfPosherModal } from '@/entities/PusherModals';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IInitialPusherState {
  openPusherModals: typeOfPosherModal[];
}

const initialState: IInitialPusherState = {
  openPusherModals: [],
};

const pusherSlice = createSlice({
  name: 'pusher',
  initialState,
  reducers: {
    openPusherModal: (state: IInitialPusherState, action: PayloadAction<typeOfPosherModal>) => {
      state.openPusherModals.push(action.payload);
    },
    closePusherModal: (state: IInitialPusherState, action: PayloadAction<typeOfPosherModal>) => {
      const index = state.openPusherModals.indexOf(action.payload);
      if (index !== -1) {
        state.openPusherModals.splice(index, 1);
      }
    },
  },
});

export default pusherSlice.reducer;

export const { openPusherModal, closePusherModal } = pusherSlice.actions;
