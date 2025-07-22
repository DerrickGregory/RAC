

import { configureStore  } from '@reduxjs/toolkit'


import drivers from './features/driver/driverSlice'



const store = configureStore({
  reducer: {
  
    drivers
  },
  devTools: process.env.NODE_ENV !== 'production',
})
export default store