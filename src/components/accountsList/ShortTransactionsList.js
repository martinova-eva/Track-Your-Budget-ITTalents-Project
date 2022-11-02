import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { accountManager } from "../../server/accountManager/accountManager";
import { v4 as uuidV4 } from 'uuid';
import { Typography,  Icon } from "@mui/material";
import { iconsArrOfObjects } from "../categoryCreator/icons";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';


export default function ShortTransactionsList({ id }) {
    const accounts = accountManager.getAllAccounts();
    const[ transactions, setTransactions] = useState(accountManager.showLastFiveTransactionsForAccount(id));
    let accountCurrency = accounts.map(a => {
        if(a.id === id){
            return a.currency
        }
    })
    if(transactions){
        transactions.map(tr => {
            let date;
            let arrOfDate = tr.date.split('.');
            date = arrOfDate[1] + "." + arrOfDate[0] + '.' + arrOfDate[2];
            tr.date = date;
        })

    }
    console.log(transactions)

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
         
          <TableBody>
            { transactions ?   transactions.map((row,id) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                <div className="shortListCategoryWrapper">
            <Icon className="shortListIcon" >
                {iconsArrOfObjects.map(icon => {
                        if (icon.title.toLowerCase() === row.name.toLowerCase()) {
                            return icon.tag;
                        }else if( row.name.toLowerCase().includes('transfer')){
                            return <SwapHorizIcon key={uuidV4()} color="success"/>
                        }else if(accountManager.checkForTag(row.name.toLowerCase()) === icon.title.toLowerCase()){
                            return icon.tag;
                        }
                    })
                }
                </Icon>
            <Typography variant="subtitle2" className="transactionListTitles">
                {row.name}
            </Typography>
        </div>
                </TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">
                     <Typography className={row.type === "outcome" ? "transactionAmmountOutcome" :
                "transactionAmmountIncome"} variant="subtitle2">
                {row.type === 'income' ? "+ " : "- "}
                {row.amount}{accountCurrency}
            </Typography>
            </TableCell>

                <TableCell align="left" >
                    <div className="tableDescriptionOverflow">{row.description}</div></TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </TableContainer>

    );

}

