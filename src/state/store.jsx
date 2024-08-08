import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import selectedDatesReducer from './selectedDatesSlice';

const store = configureStore({
  reducer: {
    company: companyReducer,
    selectedDates: selectedDatesReducer,
  },
});

export default store;
