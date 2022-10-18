import React, { useState } from "react";

const possibleOutcomeArr = [
    { title: "rent", type: "outcome"},
    { title: "mortgage", type: "outcome"},
    { title: "household bills", type: "outcome"},
    { title: "food", type: "outcome"},
    { title: "health care", type: "outcome"},
    { title: "entertainment", type: "outcome"},
    { title: "sport", type: "outcome"},
    { title: "trips", type: "outcome"},
    { title: "gifts", type: "outcome"},
    { title: "house renovation", type: "outcome"},
    { title: "house insuranse", type: "outcome"},
    { title: "car supplies and renovation", type: "outcome"},
    { title: "car insurance", type: "outcome"},
    { title: 'events', type: "outcome"},
    { title: 'education', type: "outcome"},
    { title: 'custom', type: "outcome"},
    { title: 'others', type: "outcome"},
    { title: "add another", type: "outcome"},
]
const symbolls = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

export const allOutcomeCategories = possibleOutcomeArr.map(c => {
    c.id = `${Math.floor(Math.random()*500)}${symbolls[Math.floor(Math.random()*(symbolls.length))]}`;
    return c;
});

// export default function ListOfAllOutcomes(){
//     const[outcomeCategories, setOutcomeCategories] = useState(allOutcomeCategories);
//     return outcomeCategories;
// }