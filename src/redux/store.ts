import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users/usersSlice'
import paginationReducer from './pagination/paginationSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    pagination: paginationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
