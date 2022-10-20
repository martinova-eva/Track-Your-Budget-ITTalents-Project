import './transactionPage.css';
import React, { useState } from "react";
//import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import SelectElement from '../../components/selectElementForCategories/selectElement';
import {FormControl,  Input,  Button, Box, Avatar} from '@mui/material';
// import ListOfAllIncome from '../categoryCreator/listOfAllIncomes';
// import ListOfAllOutcomes from '../categoryCreator/listOfAllOutcomes';
import { possibleIncomeObjs } from '../../components/categoryCreator/listOfAllIncomes';
import { allOutcomeCategories } from '../../components/categoryCreator/listOfAllOutcomes'
import InputBase from '@mui/material/InputBase/InputBase';
import BasicDatePicker from '../../components/CheckingAccountForm/datePicker';

export default function TransactionPage() {

  const [selectedAccount, setSelectedAccount] = useState('');
  const [typeOfTransaction, setTypeOfTransaction] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [data, setData] = useState();
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();
  const btnAtribute = false;

  const handleCreateNewTransaction = ()=> {
    if(selectedAccount && typeOfTransaction && categoryName && data && description && amount){
        console.log(selectedAccount, typeOfTransaction, categoryName, data, description, amount);
        btnAtribute = true;
        // {selectedAccount, typeOfTransaction, categoryName, data, description, amount}
    }
    btnAtribute = false;
}

  return (
    <div className='wrapper-select-elements'>
      <Box sx={{ border: 1, borderColor: 'paper', boxShadow: 5, minWidth: 80, display: "flex", flexDirection: 'column' }}>

        <Avatar className="fieldStyle" alt="logo" src="..\assets\10491-logo-wallet.png" size="lg" />
        <h2>Add a transaction</h2>

        <SelectElement className="select-element" title={"Choose account:"}
                        value={selectedAccount} 
                        onClick={e=> setSelectedAccount(e.target.value)}
        >
          <option value=''></option>
          <option value='accountInLv'>Account in lv</option>
          <option value='accountInUSD'>Account in USD</option>
        </SelectElement>

        <SelectElement className="select-element" title={"Transaction type:"}
                        value={typeOfTransaction} 
                        onChange={e=> setTypeOfTransaction(e.target.value)}
        >
          <option value=''></option>
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </SelectElement>

        {/* според избора трябва да се disable елемента, който не е нужен */}
        <SelectElement className="select-element" title={"Choose from income category:"} 
                        value={categoryName} 
                        onChange={e=> setCategoryName(e.target.value)}
        >
        {possibleIncomeObjs.map((option, i) => <option key={i} value={option.title}>{option.title} </option>)}
        </SelectElement>

        <SelectElement className="select-element" title={"Choose from outcome category:"}
                      value={categoryName} 
                      onChange={e=> setCategoryName(e.target.value)}
         >
          {allOutcomeCategories.map((option, i) => <option key={i} value={option.title}>{option.title}</option>)}
        </SelectElement>

        <FormControl>
            <BasicDatePicker className="datePicker" 
                      value={data} 
                      onChange={e=> setData(e.target.value)}
            />
          <Input className="inputStyle" type="text" placeholder="transaction description" required={true}
                  value={description} 
                  onChange={e => setDescription(e.target.value)}
          />
          <InputBase className="inputStyle" type="number"   placeholder="enter amount" required={true}
                    value={amount} 
                    onChange={e => setAmount(e.target.value)}
          />

          {/* след като е попълнено всичко да ревъртне активен бутон */}
          {btnAtribute ? <Button type="submit">Add transaction</Button> : <Button type="submit" disabled>Add transaction</Button>}
          {/* {при АДД винаги трябва да сравнява дали има сума равна или по- голяма на посочената, ако не да извести} */}
        </FormControl>
      </Box>
    </div>
  )
}


