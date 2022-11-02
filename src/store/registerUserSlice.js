import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  userLoading: false,
  usernameTaken: false,

}


export const registerUser = createAsyncThunk(
  'register',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch(`https://itt-voting-api.herokuapp.com/users`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (!response.ok) {
        return thunkAPI.rejectWithValue('This username already exist')
      } else{
        return data;
      }
    } catch (error) {

      return thunkAPI.rejectWithValue('This username already exist')
    }
  }
)



export const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState,
  reducers: {
    changeUsernameStatus: (state,action) => {
      state.usernameTaken = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.usernameTaken = false;    
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.userLoading = false;
      state.usernameTaken = true;    
    })
    builder.addCase(registerUser.pending, (state, action) => {
      state.userLoading = true;
      state.usernameTaken = false;  
    })
  },
})


export const { changeUsernameStatus } = registerUserSlice.actions

export default registerUserSlice.reducer;