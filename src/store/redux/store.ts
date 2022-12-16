import { configureStore } from '@reduxjs/toolkit'
import { NotificationReducer } from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    notification: NotificationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
