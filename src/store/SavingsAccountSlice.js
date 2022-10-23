import { createSlice } from '@reduxjs/toolkit';
import { accountManager } from '../server/accountManager/accountManager';


const initialState = {
  ownerId: '',
  accountName: '',
  currency: '',
  accountStartAmount: '',
  target: '',
  percentage:'',
  icon:'',
  transactions: [],
}



export const savingsAccountSlice = createSlice({
  name: 'savingsAccount',
  initialState,
  reducers: {
    createSavingsAccount: (state, action) => {
      state.accountName = action.payload.accountName;
      state.currency = action.payload.currency;
      state.accountStartAmount = action.payload.accountStartAmount;
      state.target = action.payload.target;
      state.percentage = action.payload.percentage;
      state.icon = action.payload.icon;
      if (state.accountName && state.currency && state.accountStartAmount && state.accountStartAmount && state.percentage) {
        accountManager.createSavingsAccount(
          state.ownerId, state.accountName, state.currency, state.accountStartAmount, state.target , state.percentage, state.icon)
      }
    }
  },

})

// Action creators are generated for each case reducer function
export const { createSavingsAccount } = savingsAccountSlice.actions

export default savingsAccountSlice.reducer