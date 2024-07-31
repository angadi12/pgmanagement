// src/lib/StaffSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Addcategory, GetAllcategory, GetStaffbyBranch } from '@/lib/API/Staff';

export const addCategory = createAsyncThunk(
  'staff/addCategory',
  async (data, thunkAPI) => {
    try {
      const result = await Addcategory(data);
      if (result.status) {
        return result;
      } else {
        return thunkAPI.rejectWithValue(result.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  'staff/fetchAllCategories',
  async (_, thunkAPI) => {
    try {
      const result = await GetAllcategory();
      if (result.status) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue(result.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchStaffByBranch = createAsyncThunk(
  'staff/fetchStaffByBranch',
  async (id, thunkAPI) => {
    try {
      const result = await GetStaffbyBranch(id);
      if (result.status) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue(result.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    categories: [],
    staffByBranch: [],
    status: 'idle',
    loading: false,
    loadingStaff: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.data);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStaffByBranch.pending, (state) => {
        state.loadingStaff = true;
        state.error = null;
      })
      .addCase(fetchStaffByBranch.fulfilled, (state, action) => {
        state.loadingStaff = false;
        state.staffByBranch = action.payload;
      })
      .addCase(fetchStaffByBranch.rejected, (state, action) => {
        state.loadingStaff = false;
        state.error = action.payload;
      });
  },
});

export default staffSlice.reducer;
