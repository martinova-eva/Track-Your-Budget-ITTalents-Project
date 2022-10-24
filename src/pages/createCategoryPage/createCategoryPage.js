import './createCategoryPage.css';
import React, { useState } from "react";
import SelectElement from '../../components/selectElementForCategories/selectElement';
import { FormControl, TextField, Input, Button, Box, Avatar, RadioGroup, FormControlLabel, Radio, Grid, MenuItem } from '@mui/material';
import { iconsArrOfObjects, getTheIcon } from '../../components/categoryCreator/icons';

export default function CreateCategoryPage() {

    const [nameOfCategory, setNameOfCategory] = useState('');
    const [typeOfCategory, setTypeOfCategory] = useState('');
    const [iconTitle, setIconTitle] = useState('');

    const handleCreateNewCategory = () => {
        if (nameOfCategory && typeOfCategory && iconTitle) {
            console.log(nameOfCategory, typeOfCategory, getTheIcon(iconTitle));
            // {nameOfCategory, typeOfCategory, getTheIcon(iconTitle)}
            setNameOfCategory('');
            setTypeOfCategory('');
            setIconTitle('');
        } else {
            alert("something is omitted, try again");
        }
    }

    return (
        <Grid className="fieldStyle">
            <Box sx={{ border: 1, borderColor: 'paper', boxShadow: 5, display: "flex", flexDirection: 'column', m: '2rem', mx: '10rem' }}>

                <Avatar className="fieldStyle" sx={{ m: '2rem' }} alt="logo" src="..\assets\10491-logo-wallet.png" size="lg" />
                <h3>Create new category</h3>

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
                                onChange={value => setTypeOfCategory(value)}>

                                {<MenuItem key={'income'} value={'income'}>{'Income'}</MenuItem>}
                                {<MenuItem key={'outcome'} value={'outcome'}>{'Outcome'}</MenuItem>}
                            </SelectElement>
                        </Box>
                    </Grid>
                    <Box className="icons-container" sx={{ border: 0.5, borderColor: 'paper', boxShadow: 2, display: "flex", flexDirection: 'column' }}>
                        <h3>Choose icon</h3>
                        <RadioGroup required
                            value={iconTitle}
                            onChange={e => setIconTitle(e.target.value)}>
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
                    <Button type="button" onClick={handleCreateNewCategory}>Add this category</Button>
                </FormControl>

            </Box>
        </Grid>
    )
}
