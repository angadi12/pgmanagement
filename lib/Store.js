import { configureStore } from '@reduxjs/toolkit'
import branchSlice from './BranchSlice'
import adminSlice  from './AdminSlice'
import roomSlice from './RoomSlice'
import tenantSlice from "./TennatSlice"
import createTenantSlice from "./CreatetenantSlice"
import paymentSlice from "./PaymentSlice"
import expenseSlice from './ExpenseSlice'
import StaffSlice from './StaffSlice'

export const store = configureStore({
    reducer: {
        branches: branchSlice,
        admins: adminSlice ,
        rooms:roomSlice,
        tenants:tenantSlice,
        createTenant:createTenantSlice,
        payments:paymentSlice,
        expenses:expenseSlice,
        staff:StaffSlice


      },
})