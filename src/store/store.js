import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './Auth/authSlice'
import { journalSlice } from './Journal/journalSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
})