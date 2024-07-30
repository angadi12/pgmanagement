// store/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  CalculatePaymentapi, 
  CreatPaymentapi, 
  GetPaymentbyBranch, 
  UpadtePaymentapi 
} from "../lib/API/Payment";

// Fetch payment by branch
export const fetchPaymentByBranch = createAsyncThunk(
  "Payment/fetchPaymentByBranch",
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await GetPaymentbyBranch(branchId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch payments");
    }
  }
);

// Create payment
export const createPayment = createAsyncThunk(
  "Payment/createPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await CreatPaymentapi(paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create payment");
    }
  }
);

// Update payment
export const updatePayment = createAsyncThunk(
  "Payment/updatePayment",
  async ({ paymentData, paymentId }, { rejectWithValue }) => {
    try {
      const response = await UpadtePaymentapi(paymentData, paymentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update payment");
    }
  }
);

// Calculate payment
export const calculatePayment = createAsyncThunk(
  "Payment/calculatePayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await CalculatePaymentapi(paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to calculate payment");
    }
  }
);

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentByBranch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaymentByBranch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Payments = action.payload;
      })
      .addCase(fetchPaymentByBranch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updatePayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.Payments.findIndex(payment => payment._id === action.payload._id);
        if (index !== -1) {
          state.Payments[index] = action.payload;
        }
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(calculatePayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(calculatePayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle the calculation result if needed
      })
      .addCase(calculatePayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
