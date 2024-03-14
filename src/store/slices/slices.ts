export interface ISlice {
  loading: boolean;
  hasError: boolean;
  isFinished: boolean;
}

export const ParentPending = (state: ISlice) => {
  if (!state.isFinished) {
    state.loading = true;
  }
};

export const ParentFilled = (state: ISlice) => {
  state.loading = false;
  state.isFinished = true;
};

export const ParentRejected = (state: ISlice) => {
  state.loading = false;
  state.hasError = true;
  state.isFinished = true;
};
