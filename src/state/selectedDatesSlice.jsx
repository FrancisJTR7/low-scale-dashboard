import { createSlice } from '@reduxjs/toolkit';
import { startOfMonth, subDays, format } from 'date-fns';

const initialState = {
  startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
  endDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
};

const selectedDatesSlice = createSlice({
  name: 'selectedDates',
  initialState,
  reducers: {
    setSelectedDates: (state, action) => {
      state.startDate = format(action.payload.startDate, 'yyyy-MM-dd');
      state.endDate = format(action.payload.endDate, 'yyyy-MM-dd');
    },
  },
});

export const { setSelectedDates } = selectedDatesSlice.actions;
export default selectedDatesSlice.reducer;
