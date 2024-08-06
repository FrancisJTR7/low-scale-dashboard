import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './companySlice'; // Update the path as needed

const store = configureStore({
  reducer: {
    company: companyReducer,
    // other reducers can go here
  },
});

export default store;
