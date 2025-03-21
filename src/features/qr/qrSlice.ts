import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QRState {
  value: string;
}

const initialState: QRState = {
  value: '',
};

export const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearValue: (state) => {
      state.value = '';
    },
  },
});

export const { setValue, clearValue } = qrSlice.actions;

export default qrSlice.reducer;
