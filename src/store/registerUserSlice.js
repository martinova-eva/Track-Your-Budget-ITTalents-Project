import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'register',
  // Declare the type your function argument here:
  ({username, password}) => {
    return fetch(`https://itt-voting-api.herokuapp.com/users`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());   
  }
)
const initialState = {
  username: '',
  password: '',
  userLoading: false
}

export const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState,
  reducers: {
    changeUserData: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
        state.userLoading = false;
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.userLoading = false;
    })
    builder.addCase(registerUser.pending, (state, action) => {
      state.userLoading = true;
    })
  },
})

// Action creators are generated for each case reducer function
export const { changeUserData } = registerUserSlice.actions

export default registerUserSlice.reducer;