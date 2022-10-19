import React from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import PasswordFields from "./passowrdField";
import { Link } from "react-router-dom";
import "./registration.css";

export default function RegistrationForm() {
   return (
      <Grid className="wrapper">
         <Paper elevation={20} className="registerPaperStyle">
            <Avatar className="fieldStyle" src='../assets/10491-logo-wallet.png' />
            <h2>Sign up</h2>
            <form className="formStyle">
               <TextField
                  className="inputStyle"
                  required
                  fullWidth
                  id="outlined-required"
                  label="Name"
                  placeholder="Enter your name" />
               <TextField
                  className="inputStyle"
                  required
                  fullWidth
                  id="outlined-required"
                  label="Email"
                  placeholder="Enter your email" />
               <PasswordFields placeholder={"Enter a password"} labels={"Password"} />
               <PasswordFields placeholder={"Confirm your password"} labels={"Confirm"} />
               <Button type="submit" variant="contained" size="large" id="submitButton" >Sign up</Button>
            </form>
            <Grid className="fieldStyle">
               <Link to="/login">You already have an account? Login Here!</Link>
               <p className="fieldStyle">You need more information?</p>
               <Link to="/">Click here to see our Demo page.</Link>
            </Grid>
         </Paper>
      </Grid>
   )
}
