import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Getdashboarddata, Getdashboarearningddata } from '../lib/API/Dashboard'; 

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await Getdashboarddata();
      return data; // Expecting an array of data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDashboardEarnings = createAsyncThunk(
  'dashboard/fetchDashboardEarnings',
  async (_, { rejectWithValue }) => {
    try {
      const data = await Getdashboarearningddata();
      return data; // Expecting an array of earnings
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: [], // Initialize as an empty array
    earnings: [], // Initialize as an empty array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Set the array data
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDashboardEarnings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardEarnings.fulfilled, (state, action) => {
        state.loading = false;
        state.earnings = action.payload; // Set the array earnings
      })
      .addCase(fetchDashboardEarnings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
