import { React, useState} from "react";
import {  Modal } from "react-bootstrap";
import "./transactionsList.css";
import { Typography, Box, MenuItem, Button} from "@mui/material";
import SelectElement from "../selectElementForCategories/selectElement";
import { accountManager } from "../../server/accountManager/accountManager";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PieChart from "./pieChart";
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { v4 as uuidV4 } from 'uuid';
import EnhancedTable from "./transactionsTable";
import { useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';


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
    const [openTransferModal, setTransferModal] = useState(false);  //modal functions
    const handleCloseTransferModal = () => setTransferModal(false);
    const handleOpenTransferModal = () => setTransferModal(true);
    const [backupAccount, setBackupAccount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [transferingAmount, setTransferingAmount] = useState(0);
    let accountsForTransfer = accountManager.getAccountsForTransfer(AccountId, owner.username)
    let savingsAccount = accountManager.checkForSavingsAccount(owner.username)
    let error = false;
    let helperText = ``;

    
    if(transferingAmount<0 || transferingAmount>accountBalance){
        if(transferingAmount<0){
            helperText = `Invalid input` 
        }else{
            helperText = `The amount exceed your balance` 

        }
        error = true;
       
    }else{
        error = false;
        helperText = ``;
    }
    
    let deleteOptions = false;
    if (accountBalance > 0) {
        deleteOptions = true;
    }
 
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
    const showAll = () => {
        setTransactions(accountManager.getFormatedTransactions(AccountId));
        setData({
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
        })
    }
    const deleteAccount = () => {
        accountManager.removeAccount(AccountId);
        navigate('/home');
    }
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
                            let date;
                            let arrOfDate = tr.date.split('.');
                            date = arrOfDate[1] + "." + arrOfDate[0] + '.' + arrOfDate[2];
                            tr.date = date;
                            arrOfTr.push(tr);
                        }
                    })
                } else if (category === "outcome") {
                    a.transactions.map(tr => {
                        if (tr.type === "outcome") {
                            let date;
                            let arrOfDate = tr.date.split('.');
                            date = arrOfDate[1] + "." + arrOfDate[0] + '.' + arrOfDate[2];
                            tr.date = date;
                            arrOfTr.push(tr);
                        }
                    })
                }

            }
        });
        arrOfTr.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        setTransactions(arrOfTr);
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
                <Box id="date-range-picker" sx={{ borderColor: 'paper' }}>
                    <DateRangePicker size="lg"
                        style={stylesDatePicker}
                        value={range}
                        className='bahur'
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
                </Box>
            </Box>

{transactions.length>0 ? <div className="listandChart">
                <div id="table">
                    <Typography variant="subtitle2">{`Transactions for account: ${accountName}`}</Typography>
                    <Typography variant="subtitle2">{`Balance: ${accountBalance} ${accountCurrency}`}</Typography>
                    <EnhancedTable
                        rows={transactions}
                        AccountId={AccountId}
                        setTransactions={setTransactions}
                        setAccountBalance={setAccountBalance}
                        accountCurrency={accountCurrency}
                    >

                    </EnhancedTable>
                    <Button
                        type="button"
                        variant="contained"
                        size="large"
                        id="delete-btn"
                        onClick={handleOpenDeleteModal}
                    >Delete Account
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        size="large"
                        id="incomes-btn"
                        onClick={handleOpenTransferModal}
                    >
                    <SwapHorizIcon key={uuidV4()}></SwapHorizIcon> Transfer money to another account </Button>
                </div>
                <div className="pieChart">
                    <PieChart data={data}></PieChart>
                </div>
            </div> : <div className="listandChart">
                <div id="table">
                    <Typography variant="subtitle2">{`Transactions for account: ${accountName}`}</Typography>
                    <Typography variant="subtitle2">{`Balance: ${accountBalance} ${accountCurrency}`}</Typography>
                    <Typography variant="subtitle2">{`You don't have any transactions.`}</Typography>

                    <Button
                        type="button"
                        variant="contained"
                        size="large"
                        id="delete-btn"
                        onClick={handleOpenDeleteModal}
                    >Delete Account
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        size="large"
                        id="incomes-btn"
                        onClick={handleOpenTransferModal}
                    >
                    <SwapHorizIcon key={uuidV4()}></SwapHorizIcon> Transfer money to another account </Button>
                </div>
            </div>}
            
            {deleteOptions ?
                <Modal show={openDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <Typography>{`Are you sure you want to delete account ${accountName}`}</Typography>

                        <Typography>{`You have ${accountBalance} ${accountCurrency} left in your account.`}</Typography>
                        <Grid className="wrapper">
                            <TextField
                                fullWidth
                                id="outlined-select-currency"
                                select
                                value={backupAccount}
                                onChange={(e) => setBackupAccount(e.target.value)}
                                helperText={`Please choose account to transfer your balance.`}
                            >
                                {accountsForTransfer.map((option) => (

                                    <MenuItem key={uuidV4()} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Close
                        </Button>
                        <Button variant="primary" id="deleteConfirmBtn" onClick={() => {
                            accountManager.transferAllFundsFromCheckingAccount(AccountId, backupAccount)
                            accountManager.removeAccount(AccountId);
                            navigate('/home');
                            handleCloseDeleteModal()

                        }}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
                :
                <Modal show={openDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <Typography>{`Are you sure you want to delete account ${accountName}`}</Typography>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Close
                        </Button>
                        <Button variant="primary" id="deleteConfirmBtn"
                            onClick={() => {
                                deleteAccount(AccountId);
                                handleCloseDeleteModal();
                            }}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>}
            <Modal show={openTransferModal} onHide={handleCloseTransferModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Typography className="transferMoneyLogo">{`Your current account balance is ${accountBalance} ${accountCurrency}.`}</Typography>
                    <div className="transferMoneyLogo">
                        <SwapHorizIcon></SwapHorizIcon>
                        <Typography variant="button">{`Transfer Money`}</Typography>
                    </div>
                    <Grid className="transferMoneywrapper">
                        <TextField
                            fullWidth
                            id="outlined-select-currency"
                            select
                            value={recipient}
                            
                            onChange={(e) => setRecipient(e.target.value)}
                            helperText={`Please choose an account`}
                        >
                            {accountsForTransfer.map((option) => (
                                <MenuItem key={uuidV4()} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                        
                            required
                            fullWidth
                            error={error}
                            helperText={helperText}
                            type="number"
                            InputProps={{ inputProps: { min: 0, max: { accountBalance } } }}
                            id="outlined-number"
                            label="Amount"
                            placeholder="Enter amount"
                            onChange={(e) => setTransferingAmount(e.target.value)}
                        />
                    </Grid>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTransferModal}>
                        Cancel
                    </Button>
                    <Button 
                     disabled={error}
                    variant="primary" 
                    id="transferMoneyBtn" 
                    onClick={() => {
                       
                        accountManager.ordinaryTransfer(AccountId, recipient, transferingAmount);
                        setTransactions(accountManager.getFormatedTransactions(AccountId));
                        setAccountBalance(accountManager.checkAccountBalance(AccountId, owner.username));
                        setRecipient('');
                        setTransferingAmount(0);
                        setTransferModal(false);
                        setTransactions(accountManager.getFormatedTransactions(AccountId))
                       
                    }}>
                        Transfer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
