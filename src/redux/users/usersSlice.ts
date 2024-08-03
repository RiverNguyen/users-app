import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUsersApi } from './usesApi'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number) => {
    const users = await fetchUsersApi(page)
    return users
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.loading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message ?? null
        state.loading = false
      })
  },
})

export default usersSlice.reducer
