import { React, useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "./transactionsList.css";
import { Typography, Box, MenuItem, Button, IconButton, Icon } from "@mui/material";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart, ArcElement } from 'chart.js';
import SelectElement from "../selectElementForCategories/selectElement";
import { accountManager } from "../../server/accountManager/accountManager";
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PieChart from "./pieChart";
import { Modal } from 'react-bootstrap';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { v4 as uuidV4 } from 'uuid';
import Dropdown from 'react-bootstrap/Dropdown';

import BarChart from "./barChart";
import getTheIcon, { iconsArrOfObjects } from "../categoryCreator/icons";

Chart.register(ArcElement);


export default function TransactionsList() {
    const [typeOfTransaction, setTypeOfTransaction] = useState('');
    const params = useParams();
    const AccountId = params.id;
    const owner = useSelector(state => state.activeUser);
    const [show, setShow] = useState(false);  //modal functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const accounts = accountManager.getAllAccounts();
    let accountName = '';
    let accountBalance = 0;
    let transactions = [];
    const stylesDatePicker = { width: 260, display: 'block', marginBottom: 10 };
    //let balance = (accountManager.checkAccountBalance(AccountId, owner.username)).toFixed(2);
    // console.log('balance:' , (accountManager.checkAccountBalance(AccountId, owner.username)))
    //const [transactions, setTransactions] = useState([]);
    let accountCurrency = "";
    accounts.map(a => {
        if (a.id === AccountId) {
            accountCurrency = " " + a.currency;
            a.transactions.map(tr => {
                let date;
                let arrOfDate = tr.date.split('.');
                date = arrOfDate[1] + "." + arrOfDate[0] + '.' + arrOfDate[2];
                tr.date = date;
            })
            // setTransactions(a.transactions);
            return transactions = [...a.transactions];
        }
    });
    accounts.map(a => {
        if (a.id === AccountId) {
            return accountName = a.name;
        }
    });
    const allTransactionForAccount = accountManager.showStatistics(AccountId);
    const [data, setData] = useState({
        labels: allTransactionForAccount.map(data => data.name),
        datasets: [{
            label: '',
            data: allTransactionForAccount.map(data => data.value),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255,44,87)',
                'rgb(255,205,0)',
                'rgb(19,185,119)',
                'rgb(183,101,201)',
                'rgb(91,224,255)',
                'rgb(43,174,246)',
                'rgb(255,161,1)',
                'rgb(66,205,0)',
            ],
            hoverOffset: 4
        }]
    });

    //тази функция сортира, но не ги принтира на ново!
    const showByCategories = (category) => {
        transactions = [];
        // setTransactions([]);
        // let arrOfTr = []
        const allTransactionsByType = accountManager.showStatisticsByTransactionType(AccountId, category);
        setData({
            labels: allTransactionsByType.map(data => data.name),
            datasets: [{
                label: '',
                data: allTransactionsByType.map(data => data.value),
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
        })
        accounts.map(a => {
            if (a.id === AccountId) {
                if (category === "income") {

                    a.transactions.map(tr => {
                        if (tr.type === "income") {
                            transactions.push(tr);
                            // arrOfTr.push(tr);
                        }
                    })
                } else if (category === "outcome") {
                    a.transactions.map(tr => {
                        if (tr.type === "outcome") {
                            transactions.push(tr);
                            //arrOfTr.push(tr);
                        }
                    })
                }

            }
        });
        //setTransactions(arrOfTr);
        console.log(transactions);
        return transactions;
    }
    useEffect(() => {

    }, [transactions])

    return (
        <div >
            <Box className="sortWrapper"
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '15vw' },
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

                {/* <DateRangePicker size="lg"  style={stylesDatePicker}/> */}
                <Button type="submit" variant="contained" size="large" id="incomes-btn">Clear filters</Button>
            </Box>


            <Modal show={show} onHide={handleClose}>
                {/* <Box sx={{ borderColor: 'paper', boxShadow: 20, display: "flex", flexDirection: 'column' }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>   </Modal.Body>
                </Box> */}
            </Modal>
            <div className="listandChart">
            <Box sx={{ borderColor: 'paper', boxShadow: 5, display: "flex", flexDirection: 'column' }}>
                <ListGroup>
                    <Typography className="transactionsHeader" variant="h6">
                        List of transactions for {accountName}.
                    </Typography>
                    <Typography className="transactionsHeader" variant="h8">
                        Balance: {(accountManager.checkAccountBalance(AccountId, owner.username)).toFixed(2)}{accountCurrency}
                    </Typography>
                    {transactions.map(transaction => (
                        
                        <ListGroup.Item key={transaction.id} className="transactionListWrapper">
                            {/* <Icon className="shortListIcon" key={uuidV4()}>{iconsArrOfObjects.map(i => {
                                if (transaction.name.toLowerCase() === i.title) {
                                    return i.tag;
                                }
                            })} </Icon> */}
                            <Typography variant="subtitle2" className="transactionListTitles">
                                {transaction.name}
                            </Typography>
                            <div className="transactionList">
                                <Typography variant="subtitle2">
                                    {transaction.date}
                                </Typography>
                                <Typography className={transaction.type === "outcome" ? "transactionAmmountOutcome" :
                                    "transactionAmmountIncome"} variant="subtitle2">
                                    {transaction.type === 'income' ? "+ " : "- "}
                                    {transaction.amount}{accountCurrency}
                                </Typography>
                                <IconButton aria-label="delete" size="small" onClick={() => {
                                    accountManager.removeTransaction(transaction.id, AccountId);
                                }}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                </Box>
                <div className="pieChart">
                    <PieChart data={data}></PieChart>
                    {/* пазим за друга статистика този*/}
                    {/* {<BarChart data={data}></BarChart>} */}
                </div>
            </div>
        </div>
    )
}