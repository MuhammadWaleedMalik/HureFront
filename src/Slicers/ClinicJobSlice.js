// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   jobs: [],
//   loading: false,
//   error: null
// };

// export const fetchJobs = createAsyncThunk(
//   'jobs/fetchJobs',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:4000/api/job/get', {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to fetch jobs');
//       }
      
//       const data = await response.json();
//       return data.data;
      
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// const jobsSlice = createSlice({
//   name: 'jobs',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchJobs.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchJobs.fulfilled, (state, action) => {
//         state.loading = false;  // Fixed typo from 'loading' to 'loading'
//         state.jobs = action.payload?.map(job => ({
//           id: job._id,
//           title: job.title,
//           department: job.organization,
//           description: job.description,
//           type: job.jobType,
//           salary: job.salaryRange,
//           location: job.location,
//           createdAt: job.postedAt,
//           status: 'open'
//         })) || [];
//       })
//       .addCase(fetchJobs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const selectAllJobs = (state) => state.jobs.jobs;
// export const selectJobsLoading = (state) => state.jobs.loading;
// export const selectJobsError = (state) => state.jobs.error;

// export default jobsSlice.reducer;