import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userManager } from '../server/userManager/userManager';

const activeUser = JSON.parse(localStorage.getItem('activeUser'));

const initialState = {
  username: activeUser?.username,
  sessionId: activeUser?.sessionId,
  wrongCredentials: false,
}

export const loginUser = createAsyncThunk(
  'activeUser/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch(`https://itt-voting-api.herokuapp.com/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      console.log('data', data)
      if (!response.ok) {
        return thunkAPI.rejectWithValue('GRESHNI KREDENCII')
      } else {
        // thunkAPI.dispatch(login({username}))
        userManager.setActiveLocal(username, data.sessionId)
        return { ...data, username }
      }
    } catch (error) {

      return thunkAPI.rejectWithValue('GRESHNO')
    }
  }
)
export const logOutUser = createAsyncThunk(
  'activeUser/logout',
  async (sessionId, thunkAPI) => {
    let body = {
      "id": `${sessionId}`
    }
    try {
      console.log(JSON.stringify(sessionId));
      const response = await fetch(`https://itt-voting-api.herokuapp.com/logout`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response
        console.log('data', data)

      if (!data.ok){
        return thunkAPI.rejectWithValue('wrong credentials')
      } 
    } catch (error) {
      return thunkAPI.rejectWithValue('wrong credentials')
    }
  }
)


export const activeUserSlice = createSlice({

  name: 'activeUser',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('login', action)
      //state.username = action.payload.username;
    },
    logout: (state) => {
      state.username = initialState.username;
      state.password = initialState.password;
      //state.sessionId = initialState.sessionId;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      console.log('TUK SYM!', payload);
      state.sessionId = payload.sessionId;
      state.username = payload.username;
      state.wrongCredentials = false;
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log('qiwueiqw')
      state.wrongCredentials = true;
      console.log(state.wrongCredentials)
    })
    builder.addCase(loginUser.pending, (state, action) => {
      state.wrongCredentials = false;
    })
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      console.log('successful exit')

    })
    builder.addCase(logOutUser.rejected, (state, action) => {
      console.log('cant exit')

    })
    builder.addCase(logOutUser.pending, (state, action) => {

    })
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = activeUserSlice.actions

export default activeUserSlice.reducer