import React from "react";
import { Avatar, Button, Grid, Paper, TextField, FormControl, Typography } from "@mui/material";
import PasswordFields from "../registration/passowrdField";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../store/activeUserSlice";
import { useEffect } from "react";



export default function LoginForm() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const activeUser = useSelector(state => state.activeUser);
   const wrongCredentials = activeUser.wrongCredentials;
   const isLogged = activeUser.username;
   let error = false;
   let helperText = "";
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   useEffect(() => {
      if (isLogged) {
         navigate('/home');
      }
   }, [isLogged]);

   const handleLogin = () => {
      dispatch(loginUser({ username, password }));
   }

   if (wrongCredentials && password !== "" && username !== "") {
      helperText = "Wrong Credentials";
      error = true

   }
   else {
      error = false
      helperText = "";
   }

   return (
      <Grid className="wrapper" >
         <Paper elevation={20} className="loginPaperStyle">
            <Avatar className="fieldStyle" src='../assets/10491-logo-wallet.png' />
            <Typography className="formHeader" variant="h4" >
               Sign in
            </Typography>

            <FormControl className="formStyle" fullWidth variant="outlined">
               {/* <form className="formStyle"> */}

               <TextField
                  required
                  fullWidth
                  helperText={helperText}
                  error={error}
                  id="outlined-required"
                  label="Username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value.trim())} />
               <PasswordFields
                  error={error}
                  helperText={helperText}
                  placeholder={"Enter a password"}
                  labels={"Password"}
                  value={password}
                  onChange={value => setPassword(value)} />
               <Button
                  type="button"
                  variant="contained"
                  size="large"
                  id="submitButton"
                  onClick={handleLogin}
               >Sign in</Button>
            </FormControl>
            <Grid className="loginRegisterLinks">
               <Link className="loginRegisterLinks" to="/register">
                  <Typography variant="caption" display="block" >
                     You don't have an account? Click here to create one.
                  </Typography>
               </Link>
               <Link className="loginRegisterLinks" to="/">
                  <Typography variant="caption" display="block" >
                     Click here for more information
                  </Typography>
               </Link>
            </Grid>
         </Paper>
      </Grid>
   )
}
