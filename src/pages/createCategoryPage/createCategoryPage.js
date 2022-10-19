import './createCategoryPage.css';
import React, { useState } from "react";
//import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import SelectElement from '../../components/selectElementForCategories/selectElement';
import { FormControl, Input, Button, Box, Avatar } from '@mui/material';
import { iconsArrOfObjects } from '../../components/categoryCreator/icons';
// import ListOfAllIncome from '../categoryCreator/listOfAllIncomes';
// import ListOfAllOutcomes from '../categoryCreator/listOfAllOutcomes';
// import { possibleIncomeObjs } from '../../components/categoryCreator/listOfAllIncomes';
// import { allOutcomeCategories } from '../../components/categoryCreator/listOfAllOutcomes'

// import { green } from '@mui/material/colors';
// import Icon from '@mui/material/Icon';
// import { ArrowRight, Camera } from '@mui/icons-material'
// import CameraIcon from "@mui/icons-material/Camera";

export default function CreateCategoryPage() {

    return (
        <div className='wrapper-select-elements'>
            <Box sx={{ border: 1, borderColor: 'paper', boxShadow: 5, minWidth: 80, display: "flex", flexDirection: 'column' }}>

                <Avatar className="fieldStyle" alt="logo" src="..\assets\10491-logo-wallet.png" size="lg" />
                <h2>Create new category</h2>

                <FormControl>
                    <Input className="inputStyle" type="text" placeholder="enter name of category" required={true} />
                    <SelectElement className="select-element" title={"Transaction type:"}>
                        <option value=''></option>
                        <option value="income">Income</option>
                        <option value="outcome">Outcome</option>
                    </SelectElement>

                    <SelectElement className="select-element" title={"Choose an icon:"}>
                    {/* {iconsArrOfObjects.map((option, i) => <option key={i} value={option.title}>{option.title}</option>)} */}
                    </SelectElement>
                    <Button type="submit">Add this category</Button>
                </FormControl>
            </Box>
        </div>
    )
}


