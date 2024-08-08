import { createSlice } from '@reduxjs/toolkit';
import { startOfMonth, subDays } from 'date-fns';

const initialState = {
  startDate: startOfMonth(new Date()),
  endDate: subDays(new Date(), 1),
};

const selectedDatesSlice = createSlice({
  name: 'selectedDates',
  initialState,
  reducers: {
    setSelectedDates: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
  },
});

export const { setSelectedDates } = selectedDatesSlice.actions;
export default selectedDatesSlice.reducer;
