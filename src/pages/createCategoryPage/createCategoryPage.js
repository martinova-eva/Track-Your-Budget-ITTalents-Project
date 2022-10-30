import './createCategoryPage.css';
import React, { useState } from "react";
import SelectElement from '../../components/selectElementForCategories/selectElement';
import { FormControl, TextField, Alert, IconButton, Button, Box, Avatar, RadioGroup, FormControlLabel, Radio, Grid, MenuItem } from '@mui/material';
import { iconsArrOfObjects, getTheIcon } from '../../components/categoryCreator/icons';
import { accountManager } from '../../server/accountManager/accountManager';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from 'react-bootstrap';

export default function CreateCategoryPage() {

    const [nameOfCategory, setNameOfCategory] = useState('');
    const [typeOfCategory, setTypeOfCategory] = useState('');
    const [iconTitle, setIconTitle] = useState('');
    const [missingData, setMissingData] = useState(false);
    const owner = useSelector(state => state.activeUser);
    const navigate = useNavigate();
    const [show, setShow] = useState(false); //modal functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreateNewCategory = () => {
        if (nameOfCategory && typeOfCategory && iconTitle) {
            setMissingData(false);
           accountManager.addCustomCategory(owner.username, nameOfCategory, typeOfCategory, iconTitle);
           navigate('/add-transaction');
            setNameOfCategory('');
            setTypeOfCategory('');
            setIconTitle('');
        } else {
            setMissingData(true);
        }
    }

    return (
        <Grid className="fieldStyle">
            <Box sx={{ borderColor: 'paper', boxShadow: 5, display: "flex", flexDirection: 'column',  mx: '6rem',alignItems:'center' }}>

                <Avatar  sx={{ m: '1rem' }} alt="logo" src="..\assets\10491-logo-wallet.png" size="lg" />
                <h4>Create new category</h4>

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

                                {<MenuItem key={'income'} value={'income'}>{'Incomes'}</MenuItem>}
                                {<MenuItem key={'outcome'} value={'outcome'}>{'Expenses'}</MenuItem>}
                            </SelectElement>
                            {missingData ? <Alert
                                    variant="outlined" severity="error"
                                    action={
                                        <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setMissingData(false);
                                        }}
                                        >
                                        <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                    >
                                    Missing data!
                                    </Alert>
                                : null}
                        </Box>
                    </Grid>
                    <Box className="icons-container" sx={{  borderColor: 'paper', boxShadow: 2, display: "flex", flexDirection: 'column' }}>
                        <h5>Choose icon</h5>
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
                    <Button type="button" onClick={()=> {
                        if (nameOfCategory && typeOfCategory && iconTitle) {
                            setMissingData(false);
                            handleShow();
                        }else{
                            setMissingData(true);
                        }
                            }}>Add this category</Button>
                </FormControl>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>{`Are you sure you want to create ${nameOfCategory} category?`}</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary"  onClick={handleCreateNewCategory}>
                            Yes
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                No
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </Box>
        </Grid>
    )
}
