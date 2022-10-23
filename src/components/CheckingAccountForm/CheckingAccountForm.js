import React from "react";
import { Avatar, Grid, Paper, TextField, Button, RadioGroup, FormControlLabel, Radio, Box, Typography } from "@mui/material";
import "./accountForm.css";
import DropDownOptions from "./dropDownOptions";
import CloseIcon from '@mui/icons-material/Close';
import { iconsArrOfObjects } from '../../components/categoryCreator/icons';


export default function CreateCheckingAccount({ handleClose }) {
   const currencies = [
      {
         value: 'USD',
         label: '$',
      },
      {
         value: 'EUR',
         label: '€',
      },
      {
         value: 'BGN',
         label: 'лв.',
      },

   ];
   const accountTypes = [
      {
         value: 'checking',
         label: 'checking',
      },
      {
         value: 'savings',
         label: 'savings',
      },
   ];
   const [currency, setCurrency] = React.useState('');
   const [type, setType] = React.useState('');
   const handleCurrency = (event) => {
      setCurrency(event.target.value);
   };
   const handleType = (event) => {
      setType(event.target.value);
   };
   let form;
   if (type === "savings") {
      form = <div className="formStyle">
         <TextField
            required
            fullWidth
            id="outlined-required"
            label="Account Name"
            placeholder="Enter name for your account" />
         <DropDownOptions
            required
            fullWidth
            label="Currency"
            helperText={"Please choose the currency"}
            arr={currencies}
            value={currency}
            handleChange={handleCurrency}
         />
         <TextField
            required
            fullWidth
            type="number"
            id="outlined-number"
            InputProps={{ inputProps: { min: 0 } }}
            label="Starting amount"
            placeholder="Enter starting amount"
         />
         <TextField
            required
            fullWidth
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            id="outlined-number"
            label="Target amount"
            placeholder="Enter target amount"
         />
         <TextField
            required
            fullWidth
            type="number"
            id="outlined-number"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            label="Incomes %"
            placeholder="Set % of the incomes, you wish to save"
         />
         <Box sx={{ pl: 1, display: "flex", flexDirection: 'column' }}>
            <Typography variant="body2" >
               Choose target icon
            </Typography>
            <RadioGroup >
               <Box>
                  {iconsArrOfObjects.map((icon, i) =>
                     <FormControlLabel
                        key={i} value={icon.title}
                        control={<Radio color="success" />} label={icon.tag}
                     />
                  )}
               </Box>
            </RadioGroup>
         </Box>
      </div>




   } else {
      form = <div className="formStyle">
         <TextField
            required
            fullWidth
            id="outlined-required"
            label="Account Name"
            placeholder="Enter name for your account" />
         <DropDownOptions
            required
            fullWidth
            label="Currency"
            helperText={"Please choose the currency"}
            arr={currencies}
            value={currency}
            handleChange={handleCurrency}
         />
         <TextField
            required
            fullWidth
            type="number"
            id="outlined-number"
            InputProps={{ inputProps: { min: 0 } }}
            label="Starting amount"
            placeholder="Enter starting amount"
         />
      </div>
   }

   return (
      <Grid className="wrapper">
         <Paper elevation={20} className="paperStyle">
            <div className="closeIconContainer"><CloseIcon className="closeIcon" onClose={handleClose} /></div>
            <Avatar className="fieldStyle" src='../assets/10491-logo-wallet.png' />
            <div id="formHeading">
               <Typography variant="h5" gutterBottom>
                  Create new money account
               </Typography></div>
            <form className="formStyle">
               <DropDownOptions
                  required
                  fullWidth
                  label="Type"
                  helperText={"Please choose the type of your account"}
                  arr={accountTypes}
                  value={type}
                  handleChange={handleType}
               />
               <div>{form}</div>
               <Button type="submit" variant="contained" size="large" id="submitButton" >Create new account</Button>
            </form>
         </Paper>
      </Grid>
   )
}
