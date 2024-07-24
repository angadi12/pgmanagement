import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Createadminapi,
  GetAdminbybranch,
  GetAdminbyid,
} from "../lib/API/Admin";

// Define the async thunk for fetching admins
export const fetchAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await GetAdminbybranch(branchId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch admins");
    }
  }
);
// Define the async thunk for creating an admin
export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (adminData, { dispatch }) => {
    try {
      const response = await Createadminapi(adminData);
      dispatch(fetchAdmins());
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Failed to create admin");
    }
  }
);

export const fetchAdminById = createAsyncThunk(
  "admins/fetchAdminById",
  async (adminId, { rejectWithValue }) => {
    try {
      const response = await GetAdminbyid(adminId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState: {
    admins: [],
    selectedAdminid: null,
    selectedAdmin: null,
    filterQuery: '',
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setAdminId: (state, action) => {
      state.selectedAdminid = action.payload;
    },
    clearSelectedAdmin: (state) => {
      state.selectedAdminid = null;
    },
    setFilterQuery(state, action) {
      state.filterQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(createAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAdmin.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAdminById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedAdmin = action.payload;
      })
      .addCase(fetchAdminById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
      
  },
});

export const { setAdminId, clearSelectedAdmin ,setFilterQuery } = adminSlice.actions;


export default adminSlice.reducer;
