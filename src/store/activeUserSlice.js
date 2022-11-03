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
      if (!response.ok) {
        return thunkAPI.rejectWithValue('wrong credentials')
      } else {
        userManager.setActiveLocal(username, data.sessionId)
        return { ...data, username }
      }
    } catch (error) {

      return thunkAPI.rejectWithValue('wrong credentials')
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
      const response = await fetch(`https://itt-voting-api.herokuapp.com/logout`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response
      if (!data.ok){
        return thunkAPI.rejectWithValue('wrong credentials')
      } 
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('wrong credentials')
    }
  }
)


export const activeUserSlice = createSlice({

  name: 'activeUser',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.sessionId = payload.sessionId;
      state.username = payload.username;
      state.wrongCredentials = false;
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.wrongCredentials = true;

    })
    builder.addCase(loginUser.pending, (state, action) => {
      state.wrongCredentials = false;
    })
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.sessionId = ''
      state.username = ''
     

    })
    builder.addCase(logOutUser.rejected, (state, action) => {


    })
    builder.addCase(logOutUser.pending, (state, action) => {

    })
  },
})

// Action creators are generated for each case reducer function
export const { } = activeUserSlice.actions

export default activeUserSlice.reducer