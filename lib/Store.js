import { configureStore } from '@reduxjs/toolkit'
import branchSlice from './BranchSlice'
import adminSlice  from './AdminSlice'
import roomSlice from './RoomSlice'
import tenantSlice from "./TennatSlice"

export const store = configureStore({
    reducer: {
        branches: branchSlice,
        admins: adminSlice ,
        rooms:roomSlice,
        tenants:tenantSlice
      },
})