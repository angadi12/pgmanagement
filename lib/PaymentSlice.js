// store/tenantSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPaymentByBranch = createAsyncThunk(
  "Payment/fetchPaymentByBranch",
  async (branchId, { rejectWithValue }) => {
    try {
    //   const response = await GetfloorbyBranch(branchId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch floors");
    }
  }
);

export const createPayment = createAsyncThunk(
    "Payment/createPayment",
    async (tennatData, { rejectWithValue }) => {
      try {
        // const response = await Creattennatmapi(tennatData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message || "Failed to create room");
      }
    }
  );


  export const fetchSinglePayment = createAsyncThunk(
    "Payment/fetchSinglePayment",
    async ({tenantId }, { rejectWithValue }) => {
      try {
        // const response = await Getsingletennatbyid(tenantId);
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
        // const response = await GettennatbyBranch(branchId);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch rooms");
      }
    }
  );


const paymentSlice = createSlice({
  name: 'Payment',
  initialState: {
    Payments: [],
    


  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
     
  },
});



export default paymentSlice.reducer;
