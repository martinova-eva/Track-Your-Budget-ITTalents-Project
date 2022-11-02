import { createSlice } from '@reduxjs/toolkit';
import { accountManager } from '../server/accountManager/accountManager';


const initialState = {
  owner: '',
  accountName: '',
  currency: '',
  accountStartAmount: '',
  target: '',
  percentage:'',
  icon:'',
  transactions: [],
  accountCreated: false,
}


export const savingsAccountSlice = createSlice({
  name: 'savingsAccount',
  initialState,
  reducers: {
    createSavingsAccount: (state, action) => {
      state.owner = action.payload.owner;
      state.accountName = action.payload.accountName;
      state.currency = action.payload.currency;
      state.accountStartAmount = action.payload.accountStartAmount;
      state.target = action.payload.target;
      state.percentage = action.payload.percentage;
      state.icon = action.payload.icon;
      if (state.accountName && state.currency && state.accountStartAmount>0 && state.percentage>0 && state.percentage<100) {
        accountManager.createSavingsAccount(
          state.owner, state.accountName, state.currency,  state.target , state.accountStartAmount, state.percentage, state.icon)
      }
    }
  },

})

// Action creators are generated for each case reducer function
export const { createSavingsAccount } = savingsAccountSlice.actions

export default savingsAccountSlice.reducer