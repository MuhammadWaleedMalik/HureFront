// store.js
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from '../Slicers/JobSlice';
import eventReducer from '../Slicers/EventSlice';
// import clinicJobsReducer from '../Slicers/ClinicJobSlice';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    events: eventReducer,
    // clinicJobs: clinicJobsReducer,
  },
});