import {React, useState} from "react";
import { ListGroup } from "react-bootstrap";
import "./transactionsList.css";
import { Typography, Box, MenuItem, Button, IconButton} from "@mui/material";
import { Doughnut, Pie } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js';
import SelectElement from "../selectElementForCategories/selectElement";
import { accountManager } from "../../server/accountManager/accountManager";
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

Chart.register(ArcElement);


export default function TransactionsList() {
    const [typeOfTransaction, setTypeOfTransaction] = useState('');
    const params = useParams();
    const AccountId = params.id;
    const owner = useSelector(state => state.activeUser);
    //console.log(AccountId)
   // const accountBalance = accountManager.checkAccountBalance(AccountId, owner.username);
    const accounts = accountManager.getAllAccounts();
    let accountName ='';
    let transactions = [];
    let accountCurrency = "";
    accounts.map(a => {
        if(a.id === AccountId){
            accountCurrency = " " + a.currency;
           return transactions = [...a.transactions];
        }
    });
    accounts.map(a => {
        if(a.id === AccountId){
           return accountName = a.name;
        }
    });
     //тази функция сортира, но не ги принтира на ново!
    const showByCategories = (category) => {
        transactions = [];
        accounts.map(a => {
            if(a.id === AccountId){
                if(category === "income"){
                    a.transactions.map(tr => {
                        if(tr.type === "income"){
                            transactions.push(tr);
                        }
                    })
                }else if(category === "outcome"){
                    a.transactions.map(tr => {
                        if(tr.type === "outcome"){
                            transactions.push(tr);
                        }
                    })
                }
               
            }
        });
        console.log(transactions)
        return transactions;
    }
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
    return (
        <div >
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
                    onChange={value => {
                        setTypeOfTransaction(value);
                        showByCategories(value);
                        }}
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
                List of transactions for {accountName}. Balance: {(accountManager.checkAccountBalance(AccountId, owner.username)).toFixed(2)}{accountCurrency}
            </Typography>

            {transactions.map(transaction => (
            <ListGroup.Item key = {transaction.id} className="transactionListWrapper">
                    
                    <Typography variant="subtitle2" className="transactionListTitles">
                    {transaction.name}
                    </Typography>
                    <div className="transactionList">
                    <Typography variant="subtitle2">
                    {transaction.date}
                    </Typography>
                    <Typography className={transaction.type === "outcome" ? "transactionAmmountOutcome" : 
                    "transactionAmmountIncome"} variant="subtitle2">
                    {transaction.type === 'income' ? "+ " : "- " }
                    {transaction.amount}{accountCurrency}
                    </Typography>
                    <IconButton aria-label="delete" size="small" onClick={()=> {
                        accountManager.removeTransaction( transaction.id, AccountId);
                        }}>
                             <DeleteIcon fontSize="inherit"/>       
                    </IconButton>
                    </div>
                    {/* {transaction.description !== "" ?  <Typography>{transaction.description}</Typography> : null} */}
                </ListGroup.Item>
               ))}
            </ListGroup>

           <div className="pieChart">
          <Pie data={data}></Pie>
            
            </div>
            </div>
        </div>
    )
}