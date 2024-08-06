import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTableIdentifier: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    selectCompany: (state, action) => {
      state.selectedTableIdentifier = action.payload;
    },
  },
});

export const { selectCompany } = companySlice.actions;
export default companySlice.reducer;
