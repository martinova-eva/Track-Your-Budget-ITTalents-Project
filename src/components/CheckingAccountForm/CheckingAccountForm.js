import React from "react";
import { Avatar, Grid, Paper, TextField, Button} from "@mui/material";
import "./accountForm.css";
import DropDownOptions from "./dropDownOptions";
import BasicDatePicker from "./datePicker";


export default function CreateCheckingAccount(){

    return (
        <Grid className="wrapper">
           <Paper elevation={20} className="paperStyle">
              <Avatar className="fieldStyle" src='../assets/10491-logo-wallet.png'/>
              <h2>Create new money account</h2>
              <form className="formStyle">
                 <TextField
                    className="inputStyle"
                    required
                    fullWidth
                    id="outlined-required"
                    label="Account Name"
                    placeholder="Enter name for your account" />
                    <DropDownOptions label="Type" helperText={"Please choose the type of your account"}/>
                    <DropDownOptions label="Currency" helperText={"Please choose the currency"}/>
                    <TextField
                    className="inputStyle"
                    required
                    fullWidth
                    type="number"
                    id="outlined-number"
                    label="Starting ammount"
                    placeholder="Enter starting" 
                    />
                    <BasicDatePicker/>
                    <Button type="submit" variant="contained" size="large" id="submitButton" >Create new account</Button>
                 
              </form>
             
           </Paper>
        </Grid>
     )

}