import { createSlice } from '@reduxjs/toolkit';
import { accountManager } from '../server/accountManager/accountManager';


const initialState = {
  owner: '',
  accountName: '',
  currency: '',
  accountStartAmount: '',
  transactions: [],
  accountCreated: false,
}

export const checkingAccountSlice = createSlice({
  name: 'createCheckingAccount',
  initialState,
  reducers: {
    create: (state, action) => {
      state.owner = action.payload.owner;
      state.accountName = action.payload.accountName;
      state.currency = action.payload.currency;
      state.accountStartAmount = action.payload.accountStartAmount;
      if (state.accountName && state.currency && state.accountStartAmount) {
        accountManager.addAccount(state.owner, state.accountName, state.currency, state.accountStartAmount);
        state.accountCreated = true;
      }
    },
    udateAccountCreationStatus: (state) => {
      state.accountCreated = false;
    }

  },
})

export const { create, udateAccountCreationStatus } = checkingAccountSlice.actions

export default checkingAccountSlice.reducer
