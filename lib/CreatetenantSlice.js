import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 'Availability',
  selectedRoomId: null,
  personalDetails: {},
  roomAndDuration: {}
};

const createTenantSlice = createSlice({
  name: 'createTenant',
  initialState,
  reducers: {
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    setSelectedRoomId(state, action) {
      state.selectedRoomId = action.payload;
    },
    setPersonalDetails(state, action) {
      state.personalDetails = action.payload;
    },
    setRoomAndDuration(state, action) {
      state.roomAndDuration = action.payload;
    }
  }
});

export const {
  setCurrentStep,
  setSelectedRoomId,
  setPersonalDetails,
  setRoomAndDuration
} = createTenantSlice.actions;

export default createTenantSlice.reducer;