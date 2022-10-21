import React from "react";
import { Button} from "@mui/material";
import "./transactionsList.css";

export default function SortButtons() {
    return (
        <div className="sortWrapper">
            <Button type="submit" variant="contained" size="large" id="category-btn">Sort by category</Button>
            <Button type="submit" variant="contained" size="large"  id="date-btn">Sort by date</Button>
            <Button type="submit" variant="contained" size="large" id="incomes-btn">Sort by income/outcome</Button>
        </div>
    )
}