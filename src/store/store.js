import { configureStore } from '@reduxjs/toolkit';
import activeUserReducer from './activeUserSlice';
import registerUserReducer from './registerUserSlice';

export const store = configureStore({
  reducer: {
    activeUser: activeUserReducer, 
    registerUser: registerUserReducer,
  },
})

