import { React, useState, useEffect } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import "./transactionsList.css";
import { Typography, Box, MenuItem, Button, IconButton, Paper, Table, TableRow, TableCell, TableBody, TableHead, TableContainer, Icon, TablePagination } from "@mui/material";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart, ArcElement } from 'chart.js';
import SelectElement from "../selectElementForCategories/selectElement";
import { accountManager } from "../../server/accountManager/accountManager";
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PieChart from "./pieChart";
import { DateRangePicker } from 'rsuite';
import Container from 'react-bootstrap/Container';
import 'rsuite/dist/rsuite.min.css';
import { v4 as uuidV4 } from 'uuid';
import BarChart from "./barChart";
import getTheIcon, { iconsArrOfObjects } from "../categoryCreator/icons";
import { updateTransactions } from "../../store/checkingAccountSlice";
import EnhancedTable from "./transactionsTable";
import { useNavigate } from "react-router-dom";
import DropDownOptions from "../CheckingAccountForm/dropDownOptions";


export default function TransactionsList() {
    const params = useParams();
    const AccountId = params.id;
    const owner = useSelector(state => state.activeUser);
    const accounts = accountManager.getAllAccounts();

    const [typeOfTransaction, setTypeOfTransaction] = useState('');
    const [range, setRange] = useState();
    const [transactions, setTransactions] = useState(accountManager.getFormatedTransactions(AccountId));
    const [accountName, setAccountName] = useState(accountManager.getAccountName(AccountId));
    const [accountBalance, setAccountBalance] = useState(accountManager.checkAccountBalance(AccountId, owner.username));
    const [accountCurrency, setAcountCurrency] = useState(accountManager.getAccountCurrency(AccountId));
    const [allTransactionForAccount, setAllTransactionForAccount] = useState(accountManager.showStatistics(AccountId));
    const [show, setShow] = useState(false); //modal functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);  //modal functions
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const[backupAccount, setBackupAccount] = useState('');
    let accountsForTransfer = accountManager.getAccountsForTransfer(AccountId)
    console.log(accountsForTransfer);
  
    const stylesDatePicker = { width: 260, display: 'block', marginBottom: 10 };
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
    const showAll= ()=>{
        setTransactions(accountManager.getFormatedTransactions(AccountId))
    }
    const deleteAccount=()=>{
        accountManager.removeAccount(AccountId);
        navigate('/home');
    }
    //тази функция сортира, но не ги принтира на ново!
    const showByCategories = (category) => {
        setTransactions([]);
         let arrOfTr = []
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
                            arrOfTr.push(tr);
                        }
                    })
                } else if (category === "outcome") {
                    a.transactions.map(tr => {
                        if (tr.type === "outcome") {
                            arrOfTr.push(tr);
                        }
                    })
                }

            }
        });
        setTransactions(arrOfTr);
     ;
    }
 

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
                <Button 
                type="button" 
                variant="contained" 
                size="large" 
                id="incomes-btn"
                onClick={showAll}
                >All Transactions</Button>

                <SelectElement title={"Transaction type:"}
                    value={typeOfTransaction}
                    onChange={value => {
                        setTypeOfTransaction(value);
                        showByCategories(value);
                    }}
                >
                    {<MenuItem key={'income'} value={'income'} >{'Incomes'}</MenuItem>}
                    {<MenuItem key={'outcome'} value={'outcome'}>{'Expenses'}</MenuItem>}
                </SelectElement>

                <DateRangePicker size="lg" id="date-range-picker" 
                    value= {range}
                    onChange={(e) => {
                        let statisticData = accountManager.showStatisticsByDateRange(AccountId, e);

                        setTransactions(statisticData);
                        let chartData = accountManager.showStatisticsByDateRangeForChart(statisticData);
                        setData({
                            labels: chartData.map(data => data.name),
                            datasets: [{
                                label: '',
                                data: chartData.map(data => data.value),
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
                     }}
                    placeholder="Select Date Range"
                    format="dd-MM-yyyy"
                />
                  <Button 
                type="button" 
                variant="contained" 
                size="large" 
                id="delete-btn"
                onClick={handleOpenDeleteModal}
                >Delete Account
                </Button>
                
            </Box>
          

            <div className="listandChart">
      <div id="table">  
      <Typography variant="subtitle2">{`Transactions for account: ${accountName}`}</Typography> 
      <Typography variant="subtitle2">{`Balance: ${accountBalance} ${accountCurrency}`}</Typography> 
   <EnhancedTable
    rows={transactions} 
    AccountId = {AccountId}
    setTransactions = {setTransactions}
    accountCurrency = {accountCurrency}
    >

    </EnhancedTable>
    </div> 
           
                <div className="pieChart">
                    <PieChart data={data}></PieChart>
                    {/* пазим за друга статистика този*/}
                    {/* {<BarChart data={data}></BarChart>} */}
                </div>
            </div>

            <Modal show={openDeleteModal} onHide={handleCloseDeleteModal}>
                     <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        <Typography>{`Are you sure you want to delete account ${accountName}`}</Typography>
        
         <Typography>{`You have ${accountBalance} ${accountCurrency} left in your account.`}</Typography>
        <DropDownOptions    
            fullWidth
            helperText={`Please choose account to transfer your balance.`}
            arr={accountsForTransfer}
            value={backupAccount}
            handleChange={(e)=> setBackupAccount(e.target.value)}>
            </DropDownOptions> 
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="primary" id="deleteConfirmBtn" onClick={deleteAccount}>
           Yes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

