import { Bar } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js';
import {Chart as ChartJS} from "chart.js/auto";

export default function BarChart({data}){
    return <Bar data={data}/>
}