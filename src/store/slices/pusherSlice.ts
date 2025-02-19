import { typeOfPosherModal } from '@/entities/PusherModals';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalData {
  type: typeOfPosherModal;
  data?: any;  
}

export interface IInitialPusherState {
  openPusherModals: ModalData[];
}

const initialState: IInitialPusherState = {
  openPusherModals: [],
};

const pusherSlice = createSlice({
  name: 'pusher',
  initialState,
  reducers: {
    openPusherModal: (
      state: IInitialPusherState,
      action: PayloadAction<typeOfPosherModal | ModalData> 
    ) => {
      const modalData: ModalData =
        typeof action.payload === 'string'
          ? { type: action.payload }
          : action.payload;

      state.openPusherModals.push(modalData);
    },
    closePusherModalByType: (
      state: IInitialPusherState,
      action: PayloadAction<typeOfPosherModal>
    ) => {
      const index = state.openPusherModals.findIndex(
        (modal) => modal.type === action.type
      );
      if (index !== -1) {
        state.openPusherModals.splice(index, 1);
      }
    },

    closePusherModal: (
      state: IInitialPusherState,
      action: PayloadAction<ModalData>
    ) => {
      const index = state.openPusherModals.findIndex(
        (modal) => modal.type === action.type
      );
      if (index !== -1) {
        state.openPusherModals.splice(index, 1);
      }
    },
  },
});

export default pusherSlice.reducer;

export const { openPusherModal, closePusherModal, closePusherModalByType } = pusherSlice.actions;
