import React from "react";
import { Grid, TextField } from "@mui/material";
import "./accountForm.css";
import MenuItem from '@mui/material/MenuItem';


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
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];
export default function DropDownOptions({ helperText, label }) {
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <Grid className="wrapper">
      <TextField
        required
        fullWidth
        id="outlined-select-currency"
        select
        label={label}
        value={currency}
        onChange={handleChange}
        helperText={helperText}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  )

}