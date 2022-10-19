import React, { useState } from "react";

export const possibleIncomeArr = [
    { title: "salary", type: "income"},
    { title: "bonuses", type: "income"},
    { title: "freelance projects", type: "income"},
    { title: "investments", type: "income"},
    { title: "others", type: "income"},
    { title: "add another", type: "income"},
]
const symbolls = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

export const possibleIncomeObjs = possibleIncomeArr.map(c => {
    c.id = `${Math.floor(Math.random()*20)}${symbolls[Math.floor(Math.random()*(symbolls.length))]}`;
    return c;
});

// export default function ListOfAllIncome(){
//     const[incomeCategories, setIncomeCategories] = useState(possibleIncomeObjs);
//     return incomeCategories;
    
// }