import { createSlice } from '@reduxjs/toolkit';
import { accountManager } from '../server/accountManager/accountManager';


const initialState = {

  owner: '',
  accountName: '',
  currency: '',
  accountStartAmount: '',
  transactions: [],
}



export const checkingAccountSlice = createSlice({
  name: 'createCheckingAccount',
  initialState,
  reducers: {
    create: (state, action) => {
      state.accountName = action.payload.accountName;
      state.currency = action.payload.currency;
      state.accountStartAmount = action.payload.accountStartAmount;
      if (state.accountName && state.currency && state.accountStartAmount) {
        accountManager.addAccount(state.owner, state.accountName, state.currency, state.accountStartAmount)
      }
    }
  },

})

// Action creators are generated for each case reducer function
export const { create } = checkingAccountSlice.actions

export default checkingAccountSlice.reducer