// store/tenantSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Creattennatmapi, GettennatbyBranch,GetfloorbyBranch,Getsingletennatbyid } from '../lib/API/Tennat'; 

export const fetchFloorsByBranch = createAsyncThunk(
  "tenants/fetchFloorsByBranch",
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await GetfloorbyBranch(branchId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch floors");
    }
  }
);

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


  export const fetchSingleTenant = createAsyncThunk(
    "tenants/fetchSingleTenant",
    async ({tenantId }, { rejectWithValue }) => {
      try {
        const response = await Getsingletennatbyid(tenantId);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch tenant");
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
    floors: [],
    floorStatus: 'idle',
    status: 'idle',
    error: null,
    singleTenant:[],
    singleTenantStatus: 'idle',
    singleTenantError: null,
    selectedTenantId: null,


  },
  reducers: {
    setSelectedTenantId: (state, action) => {
      state.selectedTenantId = action.payload;
    },
  },
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
      })
      .addCase(fetchFloorsByBranch.pending, (state) => {
        state.floorStatus = 'loading';
      })
      .addCase(fetchFloorsByBranch.fulfilled, (state, action) => {
        state.floorStatus = 'succeeded';
        state.floors = action.payload; 
      })
      .addCase(fetchFloorsByBranch.rejected, (state, action) => {
        state.floorStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSingleTenant.pending, (state) => {
        state.singleTenantStatus = 'loading';
      })
      .addCase(fetchSingleTenant.fulfilled, (state, action) => {
        state.singleTenantStatus = 'succeeded';
        state.singleTenant = action.payload;
      })
      .addCase(fetchSingleTenant.rejected, (state, action) => {
        state.singleTenantStatus = 'failed';
        state.singleTenantError = action.error.message;
      });
  },
});

export const { setSelectedTenantId } = tenantSlice.actions; 


export default tenantSlice.reducer;
