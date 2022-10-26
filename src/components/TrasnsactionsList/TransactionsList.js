import {React, useState} from "react";
import { ListGroup } from "react-bootstrap";
import "./transactionsList.css";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { Typography, Box, MenuItem, Button, IconButton} from "@mui/material";

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { Doughnut, Pie } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js';
import SelectElement from "../selectElementForCategories/selectElement";
import { accountManager } from "../../server/accountManager/accountManager";
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from "react-router-dom";


Chart.register(ArcElement);


export default function TransactionsList() {
    const [typeOfTransaction, setTypeOfTransaction] = useState('');
    //взимайки Id на сметката, ще вземем всички нейни транзакции => обикаляме масива долу на всяка нов ListItem
    //иконките ще ги извикваме от заглавието на категориите, за тези които на се custom
    //const allTransactionForThisAccount = accountManager.showAllTransactionForThisAccount(accountId);
    const params = useParams()
    const AccountId = params.id
    //console.log(AccountId)
    const accounts = accountManager.getAllAccounts()
    let accountName =''
    let transactions = []
    accounts.map(a => {
        if(a.id === AccountId){
           return transactions = [...a.transactions];
        }
    })
    accounts.map(a => {
        if(a.id === AccountId){
           return accountName = a.name;
        }
    })
    console.log(transactions)
  
    const data = {
        labels: [
            'income',
            'expenses'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [30,30,30,50,70,20,50,70],
          backgroundColor: [
            'rgb(19,185,119)',
            'rgb(255, 99, 132)',
            'rgb(255,44,87)',
            'rgb(255,205,0)',
            'rgb(183,101,201)',
            'rgb(91,224,255)',
            'rgb(43,174,246)',
            'rgb(255,161,1)',
            'rgb(66,205,0)',
            
          ],
          hoverOffset: 4
        }]
      };
    //   deleteTransaction = (transactionId) => {
    //     accountManager.removeTransaction( transactionId, accountsId);
    //   }
    
    return (

        <div className="transactionsListWrapper">

            <Box className="sortWrapper"
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '15vw'},
                }}
                noValidate
                autoComplete="off"
            >
                <SelectElement title={"Transaction type:"}
                    value={typeOfTransaction}
                    onChange={value => setTypeOfTransaction(value)}
                >
                    {<MenuItem key={'income'} value={'income'} >{'Income'}</MenuItem>}
                    {<MenuItem key={'outcome'} value={'outcome'}>{'Outcome'}</MenuItem>}
                </SelectElement>
            
            <Button type="submit" variant="contained" size="large" id="date-btn">Filter by date</Button>
            <Button type="submit" variant="contained" size="large" id="incomes-btn">Clear filters</Button>
            </Box>

            <div className="listandChart">
            
            <ListGroup>
            <Typography className="transactionsHeader" variant="h6">
                List of transactions for {accountName}
            </Typography>
            {transactions.map(transaction => (
            <ListGroup.Item key = {transaction.id} className="transactionList">
                    <div className="category">
                        <TimeToLeaveIcon className="categoryIcon" />
                        <Typography variant="subtitle2">
                           {transaction.type}
                        </Typography>
                    </div>
                    <Typography variant="subtitle2">
                    {transaction.name}
                    </Typography>
                    <Typography variant="subtitle2">
                    {transaction.date}
                    </Typography>
                    <Typography className="transactionAmmountOutcome" variant="subtitle2">
                    {transaction.amount}
                    </Typography>
                    <IconButton aria-label="delete" size="small">
                             <DeleteIcon fontSize="inherit"/>       
                    </IconButton>
                </ListGroup.Item>))}
            </ListGroup>
           <div className="pieChart">
          <Pie data={data}></Pie>
            
            </div>
            </div>
        </div>
    )
}