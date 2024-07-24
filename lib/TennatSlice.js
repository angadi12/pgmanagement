// store/tenantSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Creattennatmapi, GettennatbyBranch } from '../lib/API/Tennat'; 



export const createTenant = createAsyncThunk(
    "rooms/createTenant",
    async (tennatData, { rejectWithValue }) => {
      try {
        const response = await Creattennatmapi(tennatData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message || "Failed to create room");
      }
    }
  );



export const fetchTenantsByBranch = createAsyncThunk(
    "tenants/fetchTenantsByBranch",
    async (branchId, { rejectWithValue }) => {
      try {
        const response = await GettennatbyBranch(branchId);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch rooms");
      }
    }
  );


const tenantSlice = createSlice({
  name: 'tenants',
  initialState: {
    tenants: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTenant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTenant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tenants.push(action.payload); // Assuming API returns the created tenant
      })
      .addCase(createTenant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTenantsByBranch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTenantsByBranch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tenants = action.payload; // Assuming API returns a list of tenants
      })
      .addCase(fetchTenantsByBranch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tenantSlice.reducer;
