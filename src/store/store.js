import { configureStore } from '@reduxjs/toolkit';
import activeUserReducer from './activeUserSlice';
import registerUserReducer from './registerUserSlice';
import checkingAccountReducer from './checkingAccountSlice'

export const store = configureStore({
  reducer: {
    activeUser: activeUserReducer, 
    registerUser: registerUserReducer,
    createCheckingAccount: checkingAccountReducer
  },
})

