import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTableIdentifier: null,
  selectedCompanyName: null,
  hdyhau: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    selectCompany: (state, action) => {
      state.selectedTableIdentifier = action.payload.tableIdentifier;
      state.selectedCompanyName = action.payload.companyName;
      state.hdyhau = action.payload.hdyhau;
    },
  },
});

export const { selectCompany } = companySlice.actions;
export default companySlice.reducer;
