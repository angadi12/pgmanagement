import { createSlice } from "@reduxjs/toolkit";

const branchSlice = createSlice({
  name: "branches",
  initialState: {
    branches: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    setBranches(state, action) {
      state.branches = action.payload;
      state.status = 'succeeded';
    },
    setBranchError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const { setBranches, setBranchError } = branchSlice.actions;

export default branchSlice.reducer;
