import React from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import PasswordFields from "../registration/passowrdField";
import { Link } from "react-router-dom";
import "./login.css";

export default function LoginForm() {
   return (
      <Grid className="wrapper" >
         <Paper elevation={20} className="loginPaperStyle">
            <Avatar className="fieldStyle" src='../assets/10491-logo-wallet.png'/>
            <h2>Sign in</h2>
            <form className="formStyle">
               <TextField
                  className="inputStyle"
                  required
                  fullWidth
                  id="outlined-required"
                  label="Email"
                  placeholder="Enter your email" />
               <PasswordFields placeholder={"Enter a password"} labels={"Password"} />
               <Button type="submit" variant="contained" size="large" id="submitButton">Sign in</Button>
            </form>
            <Grid className="fieldStyle">
            <Link to="/register">You don't have an account? Click here to create one.</Link>
               <p className="fieldStyle">You need more information?</p>
               <Link to="/">Click here to see our Demo page.</Link>
            </Grid>
         </Paper>
      </Grid>
   )
}
