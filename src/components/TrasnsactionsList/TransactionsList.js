import React from "react";
import { ListGroup } from "react-bootstrap";
import "./transactionsList.css";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { Typography } from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SortButtons from "./SortButtons";
import { Doughnut, Pie } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);




export default function TransactionsList() {
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
        <div className="transactionsListWrapper">
            <SortButtons />
            <div className="listandChart">
            
            <ListGroup>
            <Typography className="transactionsHeader" variant="h6">
                List of transactions for Checkings account
            </Typography>
                <ListGroup.Item className="transactionList">
                    <div className="category">
                        <TimeToLeaveIcon className="categoryIcon" />
                        <Typography variant="subtitle2">
                            Auto
                        </Typography>
                    </div>
                    <Typography variant="subtitle2">
                        Fuel
                    </Typography>
                    <Typography variant="subtitle2">
                        20.10.2022
                    </Typography>
                    <Typography className="transactionAmmountOutcome" variant="subtitle2">
                        -$50.00
                    </Typography>
                </ListGroup.Item>
                <ListGroup.Item className="transactionList">
                    <div className="category">
                        <MonetizationOnIcon className="categoryIcon" />
                        <Typography variant="subtitle2">
                            Income
                        </Typography>
                    </div>
                    <Typography variant="subtitle2">
                        Salary
                    </Typography>
                    <Typography variant="subtitle2">
                        20.10.2022
                    </Typography>
                    <Typography className="transactionAmmountIncome" variant="subtitle2">
                        +$1000.00
                    </Typography>
                </ListGroup.Item>
            </ListGroup>
           <div className="pieChart">
          <Pie data={data}></Pie>
            
            </div>
            </div>
        </div>
    )
}