import React from "react";
import { FormHelperText, InputLabel,TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./registration.css";
import { PropaneSharp } from "@mui/icons-material";


export default function PasswordFields({ helperText, labels, placeholder, onChange, error }){
   const [values, setValues] = React.useState({
      password: '',
      showPassword: false,

   });
   const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
      onChange(event.target.value);
   };

   const handleClickShowPassword = () => {
      setValues({
         ...values,
         showPassword: !values.showPassword,
      });
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };
   return (
      <FormControl  error = {error} fullWidth variant="outlined">
         <InputLabel required htmlFor="outlined-adornment-password">{labels}</InputLabel>
         <OutlinedInput
         fullWidth
            required
           
            placeholder={placeholder}
            type={values.showPassword ? 'text' : 'password'}
            value={values.password.trim()}
            onChange={handleChange('password')}
            endAdornment={
               <InputAdornment position="end">
                  <IconButton
                     aria-label="toggle password visibility"
                     onClick={handleClickShowPassword}
                     onMouseDown={handleMouseDownPassword}
                     edge="end"
                  >
                     {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
               </InputAdornment>
            }
            label="Password"
         />
         <FormHelperText id="outlined-error-helper-text">{helperText}</FormHelperText>
      </FormControl>

   )
}