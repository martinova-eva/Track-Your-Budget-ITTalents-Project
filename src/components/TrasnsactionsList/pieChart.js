import { Doughnut, Pie } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js';
import {Chart as ChartJS} from "chart.js/auto";

export default function  PieChart({data}){

    return <Pie data={data}/>
}