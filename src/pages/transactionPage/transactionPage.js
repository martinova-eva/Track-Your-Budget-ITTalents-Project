import './transactionPage.css';
import React, { useState } from "react";
//import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import SelectElement from '../../components/selectElementForCategories/selectElement';
import {FormControl,  Input,  Button, Box, Avatar} from '@mui/material';
// import ListOfAllIncome from '../categoryCreator/listOfAllIncomes';
// import ListOfAllOutcomes from '../categoryCreator/listOfAllOutcomes';
import { possibleIncomeObjs } from '../../components/categoryCreator/listOfAllIncomes';
import { allOutcomeCategories } from '../../components/categoryCreator/listOfAllOutcomes'

export default function TransactionPage() {

  return (
    <div className='wrapper-select-elements'>
      <Box sx={{ border: 1, borderColor: 'primary.main', boxShadow: 5, minWidth: 80, display: "flex", flexDirection: 'column' }}>

        <Avatar className="fieldStyle" alt="logo" src=".\budgetingLogo.png" size="lg" />
        <h2>Add a transaction</h2>

        <SelectElement className="select-element" title={"Choose account:"}>
          <option value=''></option>
          <option value='accountInLv'>Account in lv</option>
          <option value='accountInUSD'>Account in USD</option>
        </SelectElement>

        <SelectElement className="select-element" title={"Transaction type:"}>
          <option value=''></option>
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </SelectElement>

        {/* според избора трябва да се disable елемента, който не е нужен */}
        <SelectElement className="select-element" title={"Choose from income category:"} >
          {possibleIncomeObjs.map((option, i) => <option key={i} value={option.title}>{option.title}</option>)}
        </SelectElement>

        <SelectElement className="select-element" title={"Choose from outcome category:"} >
          {allOutcomeCategories.map((option, i) => <option key={i} value={option.title}>{option.title}</option>)}
        </SelectElement>

        <Input className="select-element" type="text" placeholder="transaction description" />

        <FormControl>
          <Input className="select-element" type="number" id="my-input" aria-describedby="my-helper-text" placeholder="enter amount" />

          {/* след като е попълнено всичко да ревъртне активен бутон */}
          <Button type="submit" disabled>Add transaction</Button>
          {/* {при АДД винаги трябва да сравнява дали има сума равна или по- голяма на посочената, ако не да извести} */}
        </FormControl>
      </Box>
    </div>
  )
}


