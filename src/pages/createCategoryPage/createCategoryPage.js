import './createCategoryPage.css';
import React, { useState } from "react";
import SelectElement from '../../components/selectElementForCategories/selectElement';
import { FormControl, FormLabel, Input, Button, Box, Avatar, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import { iconsArrOfObjects } from '../../components/categoryCreator/icons';
// import ListOfAllIncome from '../categoryCreator/listOfAllIncomes';
// import ListOfAllOutcomes from '../categoryCreator/listOfAllOutcomes';
// import { possibleIncomeObjs } from '../../components/categoryCreator/listOfAllIncomes';
// import { allOutcomeCategories } from '../../components/categoryCreator/listOfAllOutcomes'

export default function CreateCategoryPage() {

    return (
        <Grid className='wrapper-new-category'>
            <Box sx={{ border: 1, borderColor: 'paper', boxShadow: 5,  display: "flex", flexDirection: 'column' }}>

                <Avatar className="fieldStyle" alt="logo" src="..\assets\10491-logo-wallet.png" size="lg" />
                <h2>Create new category</h2>

                <FormControl >
                    <Grid className="category-center">
                    <Input className="distance-inputs"  type="text" placeholder="enter name of category" required={true} />
                    <SelectElement title={"Transaction type:"}>
                        <option value=''></option>
                        <option value="income">Income</option>
                        <option value="outcome">Outcome</option>
                    </SelectElement>
                    </Grid>
                        <Box className="icons-container" sx={{ border: 0.5, borderColor: 'paper', boxShadow: 2,  display: "flex", flexDirection: 'column' }}>
                        <h3>Choose icon</h3>
                        <RadioGroup>
                        {iconsArrOfObjects.map((icon, i) =>
                            <FormControlLabel key={i} value={icon.title} control={<Radio  color="success"/>} label={icon.tag}/>
                            )}
                        </RadioGroup>
                        </Box>
                    <Button type="submit">Add this category</Button>
                </FormControl>
                
                   
            </Box>
        </Grid>
    )
}


