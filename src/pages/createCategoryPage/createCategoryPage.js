import './createCategoryPage.css';
import React, { useState } from "react";
import SelectElement from '../../components/selectElementForCategories/selectElement';
import { FormControl, TextField, Input, Button, Box, Avatar, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import { iconsArrOfObjects } from '../../components/categoryCreator/icons';
import {green} from '@mui/material/colors';

//const primary = green[500]; // #13b977
// import ListOfAllIncome from '../categoryCreator/listOfAllIncomes';
// import ListOfAllOutcomes from '../categoryCreator/listOfAllOutcomes';
// import { possibleIncomeObjs } from '../../components/categoryCreator/listOfAllIncomes';
// import { allOutcomeCategories } from '../../components/categoryCreator/listOfAllOutcomes'

export default function CreateCategoryPage() {

    const [nameOfCategory, setNameOfCategory] = useState('');
    const [typeOfCategory, setTypeOfCategory] = useState('');
    const [iconTitle, setIconTitle] = useState('');
    
    const handleCreateNewCategory = ()=> {
        if(nameOfCategory && typeOfCategory && iconTitle){
            console.log(nameOfCategory, typeOfCategory, iconTitle);
            // {nameOfCategory, typeOfCategory, iconTitle}
        }else{
            console.log("something is omitted");
        }
    }

    return (
        <Grid >
            <Box sx={{ border: 1, borderColor: 'paper', boxShadow: 5,  display: "flex", flexDirection: 'column',margin: 5 }}>

                <Avatar className="fieldStyle" alt="logo" src="..\assets\10491-logo-wallet.png" size="lg" 
                    
                />
                <h2>Create new category</h2>

                <FormControl >
                    <Grid className="category-center">
                    <Box className="form-margin">
                    <TextField
                        type="text"
                        variant='outlined'
                        required
                        fullWidth
                        label="enter name of category"
                        value={nameOfCategory}
                        onChange={e => setNameOfCategory(e.target.value)}
                    />

                    <SelectElement title={"Transaction type:"} placeholder="Transaction type:"
                                        value={typeOfCategory} 
                                         onChange={value=> setTypeOfCategory(value)}>
                        {/* <option value=''></option> */}
                        <option value="income">Income</option>
                        <option value="outcome">Outcome</option>
                    </SelectElement>
                    </Box>
                    </Grid>
                        <Box className="icons-container" sx={{ border: 0.5, borderColor: 'paper', boxShadow: 2,  display: "flex", flexDirection: 'column' }}>
                        <h3>Choose icon</h3>
                        <RadioGroup required
                        value={iconTitle}
                        onChange={e => setIconTitle(e.target.value)}>
                            <Box>
                                {iconsArrOfObjects.map((icon, i) =>
                                <FormControlLabel 
                                key={i} value={icon.title} 
                                control={<Radio  color="success"/>} label={icon.tag}
                                />
                                )}
                            </Box>
                        </RadioGroup>
                        </Box>
                    <Button type="button" onClick={handleCreateNewCategory}>Add this category</Button>
                </FormControl>
                   
            </Box>
        </Grid>
    )
}
