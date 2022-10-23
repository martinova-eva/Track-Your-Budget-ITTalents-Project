import React from "react";
import { Grid, TextField } from "@mui/material";
import "./accountForm.css";
import MenuItem from '@mui/material/MenuItem';



export default function DropDownOptions({ helperText, label, arr, value, handleChange}) {
 
  return (
    <Grid className="wrapper">
      <TextField
        
        fullWidth
        id="outlined-select-currency"
        select
        label={label}
       value={value}
        onChange={handleChange}
        helperText={helperText}
      >
        {arr.map((option) =>(
          
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  )
} 