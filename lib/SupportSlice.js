// ticketSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetTicketsbyBranch,
  GetTicketsbyStatus,
  ResolveTicketapi,
} from "../lib/API/Support";

export const fetchTicketsByBranch = createAsyncThunk(
    "tickets/fetchByBranch",
    async (branchId, { rejectWithValue }) => {
      try {
        const response = await GetTicketsbyBranch(branchId);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const fetchTicketsByStatus = createAsyncThunk(
    "tickets/fetchByStatus",
    async (status, { rejectWithValue }) => {
      try {
        const response = await GetTicketsbyStatus(status);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const updateTicket = createAsyncThunk(
    "tickets/updateTicket",
    async ({ data, id }, { rejectWithValue }) => {
      try {
        const response = await ResolveTicketapi(data, id);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsByBranch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTicketsByBranch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tickets = action.payload;
      })
      .addCase(fetchTicketsByBranch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTicketsByStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTicketsByStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tickets = action.payload;
      })
      .addCase(fetchTicketsByStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTicket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tickets.findIndex(
          (ticket) => ticket._id === action.payload._id
        );
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ticketSlice.reducer;
