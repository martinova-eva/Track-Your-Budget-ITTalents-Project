import React, { useState } from "react";
import {v4 as uuidV4} from 'uuid';
import AddCardIcon  from '@mui/icons-material/AddCard';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AddTaskIcon from '@mui/icons-material/AddTask';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const possibleIncomeArr = [
    { title: "Salary", type: "income", id: uuidV4(), tag: <AddCardIcon className="iconsStyle" color="success"/>},
    { title: "Bonuses", type: "income", id: uuidV4(), tag: <CardGiftcardIcon color="success"/>},
    { title: "Freelance projects", type: "income", id: uuidV4(), tag:<AddTaskIcon color="success"/> },
    { title: "Investments", type: "income",id: uuidV4(), tag: <MonetizationOnIcon color="success"/>},
    { title: "Others", type: "income",id: uuidV4(), tag: <AddCircleOutlineIcon color="success"/>},
    { title: "Add another", type: "income",id: uuidV4(), tag: <AutoAwesomeIcon color="success"/>},
]

