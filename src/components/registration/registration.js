import React from "react";
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import PasswordFields from "./passowrdField";
import { Link, useNavigate } from "react-router-dom";
import "./registration.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser as registerNewUser, changeUsernameStatus } from "../../store/registerUserSlice";
import { Home } from "@mui/icons-material";



export default function RegistrationForm() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPass, setConfirmPass] = useState('');
   const user = useSelector(state => state.registerUser);
   const usernameTaken = user.usernameTaken;
   const [passDontMatch, setPassDontMatch] = useState(false);
   const [userNameTakenError, setUserNameTakenError] = useState(false);
   const[helperText,setHelperText] = useState("Password must be at least 6 letters");
   const[helperTextUsername, setHelperTextUsername] = useState("Username must be 3-16 letters")

   const navigate = useNavigate();
   const dispatch = useDispatch();

const regex = '^[A-Za-z0-9]{3,16}$';
const regexPass = '^[A-Za-z0-9]{6,16}$' ;
 const validUsername = username.match(regex);
 const validPassword = password.match(regexPass);

 useEffect(()=>{
   
   if(username || password || confirmPass){

      if(!validUsername){
         setUserNameTakenError(true)

      }
      else{
         setUserNameTakenError(false)
         setHelperTextUsername("");

      }
      if(!validPassword){
         setPassDontMatch(true);
         setHelperText("Password must be at least 6 letters");

      }else{
         setPassDontMatch(false); 
         setHelperText("");

      }
      if(password === confirmPass){
         setPassDontMatch(false);
         setHelperText("")
      }else{
         setPassDontMatch(true);
         setHelperText("Passwords do not match")
      }
    
   }

 },[username, password, confirmPass])

 useEffect(()=>{
   
   if(usernameTaken){
      setHelperTextUsername("This username is taken");
      setUserNameTakenError(true); 
   }
 
 },[usernameTaken])


 
 

   const handleRegister = () => {
      if(validUsername && validPassword && password === confirmPass){
         dispatch(registerNewUser({ username, password }))
         .then((data)=>{
            if(data.type !== "register/rejected"){
               navigate('/login')
            }
            

         })
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
                  label="Username"
                  placeholder="Enter your username"
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
{user.userLoading ?  <div class="loader"></div>: null}
           

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
