import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import selectedDatesReducer from './selectedDatesSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    company: companyReducer,
    selectedDates: selectedDatesReducer,
    theme: themeReducer,
  },
});

export default store;
