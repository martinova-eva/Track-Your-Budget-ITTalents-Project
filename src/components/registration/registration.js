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
   const user = useSelector(state => state.registerUser);
   const usernameTaken = user.usernameTaken;
  

   let passDontMatch = false;
   let userNameTakenError = false;
   let helperText = "Password must be at least 6 letters";
   let helperTextUsername = "Username must be 3-16 letters";
   const navigate = useNavigate();
   const dispatch = useDispatch();


      ///^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%]).{6,16}$/
const regex = '^[A-Za-z0-9]{3,16}$';
const regexPass = '^[A-Za-z0-9]{6,16}$' ;
 const validUsername = username.match(regex);
 const validPassword = password.match(regexPass);


   if (password && confirmPass) {
      if (password !== confirmPass) {
         passDontMatch = true;
         helperText = "Passwords do not match";
      }
   }
   if(usernameTaken){
      userNameTakenError = true;
      helperTextUsername = "This username is taken";
   }
  

   if(!validUsername){
      userNameTakenError = true;
   }
 
   if(!validPassword){
      passDontMatch = true;
   }
 

   const handleRegister = () => {
      if(validUsername && validPassword){
         dispatch(registerNewUser({ username, password }));
        // navigate('/login');
         setUsername('');
         setPassword('');
         setConfirmPass('');
      }
      if(!usernameTaken){
          navigate('/login');
      }
   }

 

   return (
      <Grid className="wrapper">
         <Paper elevation={20} className="registerPaperStyle">
            <Avatar className="fieldStyle" src='../assets/10491-logo-wallet.png' />
            <Typography className="formHeader"  variant="h4" >
            Sign up
                  </Typography>
            <form className="formStyle">
               <TextField
                  required
                  error={userNameTakenError}
                  helperText={ helperTextUsername}
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
