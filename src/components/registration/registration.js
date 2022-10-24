import React from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import PasswordFields from "./passowrdField";
import { Link , useNavigate } from "react-router-dom";
import "./registration.css";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { userManager } from "../../server/userManager/userManager";
import {registerUser as registerNewUser} from "../../store/registerUserSlice";

export default function RegistrationForm() {

   const [username, setUsername] = useState('');   
    const [password, setPassword] = useState('');   
    const [confirmPass, setConfirmPass] = useState(''); 
    let isWrong = false;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = () => {
            if(userManager.registerUser(username, password, confirmPass)) {
               dispatch(registerNewUser({username, password}));
               navigate('/login');
               setUsername('');
               setPassword('');
               setConfirmPass('');
            }else {
             isWrong = true;
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
          error = {false}
          id="outlined-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
        />
     
               <TextField
               error = {isWrong}
               
                  required
                  fullWidth
                  id="outlined-required"
                  label="Name"
                  placeholder="Enter your name"
                  value={username} 
                  onChange={e => setUsername(e.target.value)}
                  />
              
               <PasswordFields  placeholder={"Enter a password"} labels={"Password"} 
                  value={password} 
                  onChange={value => setPassword(value)}/>
                  {/* {password} */}
               <PasswordFields placeholder={"Confirm your password"} labels={"Confirm"} 
                  value={confirmPass} 
                  onChange={value=> setConfirmPass(value)}
               />
               <Button type="button" variant="contained" size="large" id="submitButton" onClick={handleRegister}>Sign up</Button>
            </form>
            <Grid className="fieldStyle">
               <Link to="/login">You already have an account? Login Here!</Link>
               
               <Link to="/"><p className="fieldStyle">You need more information?</p></Link>
            </Grid>
         </Paper>
      </Grid>
   )
}
