import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTableIdentifier: null,
  selectedCompanyName: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    selectCompany: (state, action) => {
      state.selectedTableIdentifier = action.payload.tableIdentifier;
      state.selectedCompanyName = action.payload.companyName;
    },
  },
});

export const { selectCompany } = companySlice.actions;
export default companySlice.reducer;
