// Imports
import { configureStore } from '@reduxjs/toolkit'
import PageReducer from '@shared/redux/reducer'

// Definitions
const store = configureStore({
  reducer: {
      page:PageReducer
  },
})

export type StoreState = ReturnType<typeof store.getState>
export default store