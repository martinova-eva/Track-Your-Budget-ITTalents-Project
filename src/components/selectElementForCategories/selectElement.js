import "./selectElement.css"
import { FormControl, InputLabel, NativeSelect, TextField, MenuItem, Box } from '@mui/material';
import React, { useState } from "react";

export default function SelectElement(props) {

    const [option, setOption] = useState('');
    const [allOptions, setAllOptions] = useState(props.children)

    const handleChange = (e) => {
      if(e.target.value ){
        //console.log(e.target.value)
        setOption(e.target.value);
        props.onChange(e.target.value);
      }else{
        console.log('Choose something')
      }
    }
    return (
      <TextField
          className="select-element"
          id="outlined-select-currency"
          select
          label={props.title}
          value={option}
          onChange={(e)=>handleChange(e)}
        >
         {props.children}
    </TextField> 
    );
}
