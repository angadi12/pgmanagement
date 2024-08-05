// store/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetnotificationbyBranch } from "../lib/API/Notification";

export const fetchNotificationByBranch = createAsyncThunk(
  "Notification/fetchNotificationByBranch",
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await GetnotificationbyBranch(branchId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch payments");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationByBranch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotificationByBranch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(fetchNotificationByBranch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
