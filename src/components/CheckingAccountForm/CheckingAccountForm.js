import React from "react";
import { Avatar, Grid, Paper, TextField, Button, RadioGroup, FormControlLabel, Radio, Box, Typography } from "@mui/material";
import "./accountForm.css";
import DropDownOptions from "./dropDownOptions";
import CloseIcon from '@mui/icons-material/Close';
import { iconsArrOfObjects } from '../../components/categoryCreator/icons';
import { useState} from "react";
import { create } from "../../store/checkingAccountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSavingsAccount } from "../../store/SavingsAccountSlice";
import { accountManager } from "../../server/accountManager/accountManager";

export default function CreateCheckingAccount({handleClose}) {
   const [accountName, setAccountName] = useState('');
   const [accountStartAmount, setAccountStartAmount] = useState(0);
   const [currency, setCurrency] = useState('');
   const [type, setType] = useState('');
   const [target, setTarget] = useState(0);
   const [percentage, setPercentage] = useState('');
   const [icon, setIcon] = useState('');
   let error = false;
   let errorTarget = false;
   let helperText = ``;
   let helperTextTarget = ``;
   

   const user = useSelector(state => state.activeUser);
   const owner = user.username;
   const navigate = useNavigate();
   const dispatch = useDispatch();

   if(accountStartAmount<0 || target<0){
      if(accountStartAmount<0){
         helperText = `You can't use negative amount` 
         error = true;
      }
      if(target<0){
         helperTextTarget = `You can't use negative amount` 
         errorTarget = true;
      }
  }else{
      error = false;
      helperText = ``;
  }
   
   
   const handleDispatch = ()=> {
      if(type === "checking"){  
         dispatch(create({owner, accountName, currency, accountStartAmount}))
         setAccountName('');
         setCurrency('');
         setAccountStartAmount('');     
      }
      if(type === "savings"){
         dispatch(createSavingsAccount({owner, accountName, currency, target , accountStartAmount, percentage, icon}))
         setAccountName('');
         setCurrency('');
         setAccountStartAmount('');
         setTarget('');
         setPercentage('');
         setIcon('');  
      }
        
   }
  
   const currencies = [
      {
         name: 'USD',
         label: '$',
      },
      {
         name: 'EUR',
         label: '???',
      },
      {
         name: 'BGN',
         label: '????.',
      },

   ];
   let accountTypes;
   const isExistSavingsAccount = accountManager.checkForSavingsAccount(owner);
   if(!isExistSavingsAccount){
      accountTypes = [
         {
            name: 'checking',
            label: 'checking',
         },
         {
            name: 'savings',
            label: 'savings',
         },
      ];
   }else{
      accountTypes = [
         {
            name: 'checking',
            label: 'checking',
         },
      ];
   }
   
   let form;
   if (type === "savings") {
      form = <div className="formStyle">
         <TextField
            required
            fullWidth
            id="outlined-required"
            label="Account Name"
            placeholder="Enter name for your account"
            onChange={(e)=> setAccountName(e.target.value)}
            />
         <DropDownOptions
            required
            fullWidth
            label="Currency"
            helperText={"Please choose the currency"}
            arr={currencies}
            value={currency}
            handleChange={(e)=> setCurrency(e.target.value)}
         />
         <TextField
            required
            fullWidth
            type="number"
            id="outlined-number"
            error={error}
      
            helperText= {helperText}
            InputProps={{ inputProps: { min: 0 } }}
            label="Starting amount"
            placeholder="Enter starting amount"
            onChange={(e)=> setAccountStartAmount(e.target.value)}
         />
         <TextField
            required
            fullWidth
           
            type="number"
            error={errorTarget}
            helperText= {helperTextTarget}
            InputProps={{ inputProps: { min: 0 } }}
            id="outlined-number"
            label="Target amount"
            placeholder="Enter target amount"
            onChange={(e)=> setTarget(e.target.value)}
         />
         <TextField
            required
            fullWidth
            type="number"
           
            id="outlined-number"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            label="Incomes %"
            placeholder="Set % of the incomes, you wish to save"
            onChange={(e)=> setPercentage(e.target.value)}
         />
         <Box sx={{ pl: 1, display: "flex", flexDirection: 'column' }}>
            <Typography variant="body2" >
               Choose target icon
            </Typography>
            <RadioGroup onChange={(e)=> setIcon(e.target.value)} >
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
            placeholder="Enter name for your account" 
            onChange={(e)=> setAccountName(e.target.value)}/>
         <DropDownOptions
            required
            fullWidth
            label="Currency"
            helperText={"Please choose the currency"}
            arr={currencies}
            value={currency}
            handleChange={(e)=> setCurrency(e.target.value)}
            
         />
         <TextField
            required
            error={error}
            helperText= {helperText}
            fullWidth
            type="number"
            id="outlined-number"
            InputProps={{ inputProps: { min: 0 } }}
            label="Starting amount"
            placeholder="Enter starting amount"
            onChange={(e)=> setAccountStartAmount(e.target.value)}
         />
      </div>
   }

   return (
      <Grid className="wrapper">
         <div className="paperStyle">
            <Avatar className="fieldStyle" src='../assets/10491-logo-wallet.png' />
            <div id="formHeading">
               <Typography variant="h5" gutterBottom>
                  Create new money account
               </Typography> 
            </div>
            <div className="formStyle">
           
               <DropDownOptions
                  required
                  fullWidth
                  label="Type"
                  helperText={"Please choose the type of your account"}
                  arr={accountTypes}
                  value={type}
                  handleChange={(e)=> setType(e.target.value)}
               />
               <div>{form}</div>
               <Button
                type="button"
                variant="contained" 
                size="large" 
                id="createButton" 
                onClick={()=>{
                  handleDispatch();
                  handleClose();   
               }}
                 >
                  Create new account
                  </Button>

            
            </div>
         
         </div>
      </Grid>
   )
}
