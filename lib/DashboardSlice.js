import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Getdashboarddata, Getdashboarearningddata ,GetdashboarExpenseddata} from '../lib/API/Dashboard'; 

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await Getdashboarddata();
      return data; 
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
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchDashboardExpense = createAsyncThunk(
  'dashboard/fetchDashboardExpense',
  async (_, { rejectWithValue }) => {
    try {
      const data = await GetdashboarExpenseddata();
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: [], 
    earnings: [], 
    expense: [], 
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
      })
      .addCase(fetchDashboardExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expense = action.payload; 
      })
      .addCase(fetchDashboardExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default dashboardSlice.reducer;
