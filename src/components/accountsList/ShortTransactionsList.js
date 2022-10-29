import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { accountManager } from "../../server/accountManager/accountManager";
import { v4 as uuidV4 } from 'uuid';
import { Typography,  Icon } from "@mui/material";
import { iconsArrOfObjects } from "../categoryCreator/icons";



export default function ShortTransactionsList({ id }) {
    const accounts = accountManager.getAllAccounts();
    let transactions = accountManager.showLastFiveTransactionsForAccount(id);
    let accountCurrency = accounts.map(a => {
        if(a.id === id){
            return a.currency
        }
    })
    transactions.map(tr => {
        let date;
        let arrOfDate = tr.date.split('.');
        date = arrOfDate[1] + "." + arrOfDate[0] + '.' + arrOfDate[2];
        tr.date = date;
    })

    return (
        <ListGroup key={id} className="shortList" id={id}>
            {transactions.map(transaction => (
                <div  key={transaction.id} >
                <ListGroup.Item 
                className={transaction.type === "outcome" ? "expensesShortList" : "incomesShortList"}>
                    <div className="shortListCategoryWrapper">
                        <Icon className="shortListIcon" >
                            {iconsArrOfObjects.map(icon => {
                                if (icon.title.toLowerCase() === transaction.name.toLowerCase()) {
                                    return icon.tag;
                                }
                            })
                            }</Icon>
                        <Typography variant="subtitle2" className="transactionListTitles">
                            {transaction.name}
                        </Typography>
                    </div>

                    <div className="transactionList">
                        <Typography variant="subtitle2">
                            {transaction.date}
                        </Typography>
                        <Typography className={transaction.type === "outcome" ? "transactionAmmountOutcome" :
                            "transactionAmmountIncome"} variant="subtitle2">
                            {transaction.type === 'income' ? "+ " : "- "}
                            {transaction.amount}{accountCurrency}
                        </Typography>
                        <div className="transactionDescription">
                        <Typography variant="subtitle2">
                            {transaction.description}
                        </Typography>
                        </div>

                    </div>
                </ListGroup.Item>
                </div>
            ))}
        </ListGroup>

    );

}