import { configureStore } from '@reduxjs/toolkit'
import branchSlice from './BranchSlice'

export const store = configureStore({
    reducer: {
        branch: branchSlice,
      },
})