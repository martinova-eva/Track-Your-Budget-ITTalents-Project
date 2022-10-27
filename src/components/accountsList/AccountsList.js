import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import "./accountList.css"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ShortTransactionsList from "./ShortTransactionsList";


export default function AccountsList() {
    return (
        <div className="accountsWrapper">
            <h3>Your accounts</h3>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Checking account USD</Accordion.Header>
                    <Accordion.Body>
                        <ShortTransactionsList />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Checking account EUR</Accordion.Header>
                    <Accordion.Body>
                        <ShortTransactionsList />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Savings account</Accordion.Header>
                    <Accordion.Body>
                        <ShortTransactionsList />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        <AddCircleOutlineIcon className="addNewIcon" />
                        Add new account
                    </Accordion.Header>
                </Accordion.Item>
            </Accordion>
        </div>
    );

}