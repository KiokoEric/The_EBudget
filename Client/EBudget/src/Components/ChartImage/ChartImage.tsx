import axios from "axios";
import { useCookies } from "react-cookie";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import React, { useEffect, useState } from 'react';
import { useGetUserID } from "../Hooks/useGetUserID";

Chart.register(ArcElement)

const ChartImage: React.FC = () => {

    const userID = useGetUserID();
    const [Cookie, _] = useCookies(["auth_token"]);

    const [ TotalIncome, setTotalIncome ] = useState<any>()
    const [ TotalExpenses, setTotalExpenses ] = useState<any>()
    const [ TotalSavings, setTotalSavings ] = useState<any>()

    useEffect(() => {

        const FetchTotalIncomes = async() => {
            await axios.get(`https://localhost:4000/Income/${userID}/TotalIncomes`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTotalIncome(Response.data.TotalAmount)
            })
        }

        const FetchTotalExpenses = async() => {
            await axios.get(`https://localhost:4000/Expense/${userID}/TotalExpenses`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTotalExpenses(Response.data.TotalAmount)
            })
        }

        const FetchTotalSavings = async() => {
            await axios.get(`https://localhost:4000/Savings/${userID}/TotalSavings`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTotalSavings(Response.data.TotalAmount)
            })
        }

        FetchTotalIncomes()

        FetchTotalExpenses()

        FetchTotalSavings()

    }, [userID])

    const Balance = TotalIncome - TotalExpenses - TotalSavings

    const Config = {

        data: {
            
        datasets: [{
            label: 'My First Dataset',
            data: [TotalSavings , TotalExpenses, Balance ],
            backgroundColor: [
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
            borderRadius: 5, 
            spacing: 0,
        }]},
    
        options: {
            cutout: 10
        }
    }

return (
    <div>
        <Doughnut {...Config}></Doughnut>
    </div>
)
}   

export default ChartImage