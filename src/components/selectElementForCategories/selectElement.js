import "./selectElement.css"
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import React, { useState } from "react";

export default function SelectElement(props) {

    const [option, setOption] = useState();
    const [allOptions, setAllOptions] = useState(props.children)

    const handleChange = (e) => {
      if(e.target.value ){
        console.log(e.target.value)
        setOption(e.target.value);
      }
    }
    return (
      <FormControl className="select-element" onChange={(e)=>handleChange(e)} value={option} fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native"> 
          {props.title}
        </InputLabel>
      <NativeSelect>
        {props.children}
      </NativeSelect>
      </FormControl>
     
    );
}