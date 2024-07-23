import { configureStore } from '@reduxjs/toolkit'
import branchSlice from './BranchSlice'
import adminSlice  from './AdminSlice'

export const store = configureStore({
    reducer: {
        branches: branchSlice,
        admins: adminSlice ,
      },
})