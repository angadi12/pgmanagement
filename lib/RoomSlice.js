import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Createroomapi, GetRoomsbyBranch } from "../lib/API/Room";

export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (roomData, { rejectWithValue }) => {
    try {
      const response = await Createroomapi(roomData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create room");
    }
  }
);

export const fetchRoomsByBranch = createAsyncThunk(
  "rooms/fetchRoomsByBranch",
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await GetRoomsbyBranch(branchId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch rooms");
    }
  }
);

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms.push(action.payload);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchRoomsByBranch.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRoomsByBranch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRoomsByBranch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default roomSlice.reducer;
