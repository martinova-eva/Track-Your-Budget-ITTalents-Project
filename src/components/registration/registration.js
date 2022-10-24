import React from "react";
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import PasswordFields from "./passowrdField";
import { Link, useNavigate } from "react-router-dom";
import "./registration.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userManager } from "../../server/userManager/userManager";
import { registerUser as registerNewUser } from "../../store/registerUserSlice";

export default function RegistrationForm() {

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPass, setConfirmPass] = useState('');
   const user = useSelector(state => state.activeUser);

   let passDontMatch = false;
   let helperText = "";
   const navigate = useNavigate();
   const dispatch = useDispatch();

   if (password && confirmPass) {
      if (password.trim() !== confirmPass.trim()) {
         passDontMatch = true;
         helperText = "Passwords do not match";
      }
   }

   const handleRegister = () => {
      if (userManager.registerUser(username, password, confirmPass)) {
         dispatch(registerNewUser({ username, password }));
         navigate('/login');
         setUsername('');
         setPassword('');
         setConfirmPass('');
      }

      else {

         console.log('Error'); //покажи съобщение
      }
   }

   return (
      <Grid className="wrapper">
         <Paper elevation={20} className="registerPaperStyle">
            <Avatar className="fieldStyle" src='../assets/10491-logo-wallet.png' />
            <h2>Sign up</h2>

            <form className="formStyle">
               <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Name"
                  placeholder="Enter your name"
                  value={username}
                  onChange={e => setUsername(e.target.value.trim())}
               />

               <PasswordFields
                  helperText={helperText}

                  error={passDontMatch}
                  placeholder={"Enter a password"}
                  labels={"Password"}
                  value={password}
                  onChange={value => setPassword(value)}

               />

               <PasswordFields
                  helperText={helperText}
                  error={passDontMatch}
                  placeholder={"Confirm your password"}
                  labels={"Confirm"}
                  value={confirmPass}
                  onChange={value => setConfirmPass(value)}
               />
               <Button type="button" variant="contained" size="large" id="submitButton" onClick={handleRegister}>Sign up</Button>
            </form>

            <Grid className="loginRegisterLinks">

               <Link className="loginRegisterLinks" to="/login">
                  <Typography variant="caption" display="block" >
                     You already have an account? Login Here!
                  </Typography>
               </Link>

               <Link className="loginRegisterLinks"  to="/">
                  <Typography  variant="caption" display="block" >
                     Click here for more information
                  </Typography>
               </Link>
              
            </Grid>
         </Paper>
      </Grid>
   )
}
