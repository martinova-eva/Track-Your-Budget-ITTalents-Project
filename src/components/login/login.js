import React from "react";
import { Avatar, Button, Grid, Paper, TextField, FormControl} from "@mui/material";
import PasswordFields from "../registration/passowrdField";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import { loginUser } from "../../store/activeUserSlice";
import { userManager } from "../../server/userManager/userManager";
import {login} from "../../store/activeUserSlice";

export default function LoginForm() {
   //const user = useSelector(state => state.activeUser);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [username, setUsername] = useState(''); 
   const [password, setPassword] = useState(''); 

   const handleLogin = () => {
      if(userManager.loginUser(username, password)){
         dispatch(loginUser({ username, password }));
         dispatch(login({ username, password }));
         navigate('/home');
      }else{
         //message 
      }
      
  }

   return (
      <Grid className="wrapper" >
         <Paper elevation={20} className="loginPaperStyle">
            <Avatar className="fieldStyle" src='../assets/10491-logo-wallet.png'/>
            <h2>Sign in</h2>
            <FormControl  className="formStyle" fullWidth variant="outlined">
            {/* <form className="formStyle"> */}
            
               <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Username"
                  placeholder="Enter your username"
                  value={username} 
                  onChange={e => setUsername(e.target.value)} />
               <PasswordFields placeholder={"Enter a password"} labels={"Password"}
                  value={password} 
                  onChange={value => setPassword(value)} />
               <Button type="button" variant="contained" size="large" id="submitButton" onClick={handleLogin}>Sign in</Button>
            </FormControl>
            <Grid className="fieldStyle">
            <Link to="/register">You don't have an account? Click here to create one.</Link>
               <Link to="/"><p className="fieldStyle">You need more information?</p></Link>
            </Grid>
         </Paper>
      </Grid>
   )
}
