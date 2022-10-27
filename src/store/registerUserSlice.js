import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  userLoading: false,
  usernameTaken: false,

}

// export const registerUser = createAsyncThunk(
//   'register',
//   ({username, password}, thunkAPi) => {
//     return fetch(`https://itt-voting-api.herokuapp.com/users`, {
//       method: 'POST',
//       body: JSON.stringify({username, password}),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then(res => res.json())
//     .catch((error)=>{
// return thunkAPi.rejectWithValue(error.response.message)
//     })

//   }
// )


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
    changeUserData: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log("yes")
        state.userLoading = false;
        state.usernameTaken = false;
      
        
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log("x")
      state.userLoading = false;
      state.usernameTaken = true;
      
    })
    builder.addCase(registerUser.pending, (state, action) => {
      state.userLoading = true;
      state.usernameTaken = false;
      
    })
  },
})

// Action creators are generated for each case reducer function
export const { changeUserData } = registerUserSlice.actions

export default registerUserSlice.reducer;