import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';

const initialState = {
    username: '',
    password: '',
    sessionId: '',
    userLoading: false
  }

export const loginUser = createAsyncThunk(
  'activeUser/login',
  // Declare the type your function argument here:
  ({username, password}) => {
    return fetch(`https://itt-voting-api.herokuapp.com/login`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      const activeUser = JSON.parse(localStorage.getItem('activeUser'));
      activeUser.sessionId = data.sessionId;
      localStorage.setItem('activeUser', JSON.stringify(activeUser));
      const allUsers = JSON.parse(localStorage.getItem('users'));
      allUsers.map(u => {
        if(u.username === activeUser.username){
          u.sessionId = data.sessionId;
        }
      })
      localStorage.setItem('users', JSON.stringify(allUsers))
    });   
  }
)
export const logoutUser = createAsyncThunk(
  'activeUser/logout',
  // Declare the type your function argument here:
  ({sessionId}) => {
    return fetch(`https://itt-voting-api.herokuapp.com/logout`, {
      method: 'POST',
      body: JSON.stringify({sessionId}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());   
  }
)

export const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    }, 
    logout: (state) => {
        state.username = initialState.username;
        state.password = initialState.password;
        //state.sessionId = initialState.sessionId;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {    
        state.sessionId = payload.sessionId;
        state.userLoading = false;
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.userLoading = false;
    })
    builder.addCase(loginUser.pending, (state, action) => {
      state.userLoading = true;
    })
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {    
    })
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = activeUserSlice.actions

export default activeUserSlice.reducer