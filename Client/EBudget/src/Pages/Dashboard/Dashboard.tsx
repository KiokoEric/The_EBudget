import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react';
import Labels from '../../Components/Labels/Labels';
import Status from '../../Components/Common/Status/Status';
import Output from '../../Components/Common/Output/Output';
import ChartImage from '../../Components/ChartImage/ChartImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetUserID } from "../../Components/Hooks/useGetUserID";
import { faMoneyBillWheat } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

const Dashboard:React.FC = () => {

    const userID = useGetUserID();
    const [Cookie, _] = useCookies(["auth_token"]);

    // USESTATE HOOK

    const [ TotalIncome, setTotalIncome ] = useState<any>("")
    const [ TotalSavings, setTotalSavings ] = useState<any>("")
    const [ TotalExpenses, setTotalExpenses ] = useState<any>("")
    const [ IncomeTransactions, setIncomeTransactions ] = useState<[]>([])
    const [ ExpenseTransactions, setExpenseTransactions ] = useState<[]>([])

    // CALLING ON THE TOTAL INCOMES, TOTAL EXPENSES AND TOTAL SAVINGS

    useEffect(() => {

        const FetchTotalIncomes = async() => {
            await axios.get(`http://localhost:4000/Income/${userID}/TotalIncomes`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTotalIncome(Response.data.TotalAmount)
            })
        }

        const FetchTotalExpenses = async() => {
            await axios.get(`http://localhost:4000/Expense/${userID}/TotalExpenses`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTotalExpenses(Response.data.TotalAmount)
            })
        }

        const FetchTotalSavings = async() => {
            await axios.get(`http://localhost:4000/Savings/${userID}/TotalSavings`, {
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

    // CALLING ON THE USER'S CREATED INCOME AND EXPENSES TRANSACTIONS

    useEffect(() => {

        const FetchIncome = async() => {
            await axios.get(`http://localhost:4000/Income/${userID}/Incomes`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setIncomeTransactions(Response.data)
            })
        } 

        const FetchExpenses = () => {
            axios.get(`http://localhost:4000/Expense/${userID}/Expenses`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setExpenseTransactions(Response.data)
            })
        }
    
        if (userID) {
            FetchIncome()
            FetchExpenses()
        } 

    },[])


return (
    <div id='App' className='flex flex-col gap-10 text-black p-2 rounded xl:shadow-Shadow-green xl:w-5/6'>
        <section className='flex flex-col items-center gap-2 justify-between xl:flex-row'>
            <Status
                StatusStyle='bg-Blue flex flex-col gap-3 items-center justify-center max-h-28 py-2 rounded-md text-center text-white w-11/12 xl:w-72'
                NameStyle='font-bold text-4xl'
                TransactionName='Total Income'
                ValueStyle='font-bold text-3xl'
                TransactionValue={TotalIncome}
            />
            <Status
                StatusStyle='bg-Blue flex flex-col gap-3 items-center justify-center max-h-28 py-2 rounded-md text-center text-white w-11/12 xl:w-72'
                NameStyle='font-bold text-4xl'
                TransactionName='Total Expense'
                ValueStyle='font-bold text-3xl'
                TransactionValue={TotalExpenses}
            />
            <Status
                StatusStyle='bg-Blue flex flex-col gap-3 items-center justify-center max-h-36 px-0 py-2 rounded-md text-center text-white w-11/12 xl:w-72'
                NameStyle='font-bold text-4xl'
                TransactionName='Savings & Investments'
                ValueStyle='font-bold text-3xl'
                TransactionValue={TotalSavings}
            />
            <Status
                StatusStyle='bg-Blue flex flex-col gap-3 items-center justify-center max-h-28 py-2 rounded-md text-center text-white w-11/12 xl:w-56'
                NameStyle='font-bold text-4xl'
                TransactionName='Total Balance'
                ValueStyle='font-bold text-3xl'
                TransactionValue={TotalIncome - TotalExpenses - TotalSavings}
            />
        </section>
        <div className='flex flex-col gap-5 xl:flex-row' >
            <section className='xl:w-6/12'>
                <h2 className='font-bold mb-20 text-Blue text-center text-4xl'>Transaction Summary</h2>
                <figure className='bg-Beige max-h-fit  px-2 py-2 rounded'> 
                    <ChartImage />
                    <Labels />
                </figure>
            </section>
            <section className='flex flex-col gap-10 w-full'>
                <h2 className='font-bold text-Blue text-center text-4xl'>Recent Transaction History</h2>
                <div>
                    <h3 className='font-bold mb-2 text-Blue text-center text-3xl'>Income Transactions</h3>
                    <section className='flex flex-col gap-3 max-h-80 xl:max-h-52 overflow-scroll overflow-x-hidden'>
                    {
                    IncomeTransactions.map((Transaction: any) => (
                        <Output
                            containerStyle='bg-green-800 flex flex-col items-center justify-center gap-5 min-h-max px-2 py-2 rounded text-white sm:flex-row'
                            TransactionIcon={ <FontAwesomeIcon icon={faMoneyBillWheat} className='hidden sm:flex text-3xl' /> }
                            Description= {Transaction.Description}
                            Amount= {Transaction.Amount}
                            Date= {Transaction.Date}
                            ifMemo= {Transaction.Memo}
                            MemoStyle='m-auto text-xl text-center w-52 sm:w-64 lg:w-80 xl:w-80'
                            Memo= {Transaction.Memo}
                            ActionStyle='hidden'
                        />
                    ))}
                    </section>
                </div>
                <div> 
                    <h3 className='font-bold mb-2 text-Blue text-center text-3xl'>Expense Transactions</h3>
                    <section className='flex flex-col gap-3 max-h-80 xl:max-h-52 overflow-scroll overflow-x-hidden'>
                    {
                    ExpenseTransactions.map((Transaction: any) => (
                        <Output
                            containerStyle='bg-green-800 flex flex-col items-center justify-center gap-5 min-h-max px-2 py-2 rounded text-white sm:flex-row'
                            TransactionIcon={ <FontAwesomeIcon icon={faHandHoldingDollar} className='hidden sm:flex text-3xl' /> }
                            Description= {Transaction.Description}
                            Amount= {Transaction.Amount}
                            Date= {Transaction.Date}
                            ifMemo= {Transaction.Memo}
                            MemoStyle='m-auto text-xl text-center w-52 sm:w-64 lg:w-80 xl:w-80'
                            Memo= {Transaction.Memo}
                            ActionStyle='hidden'
                        />
                    ))}
                    </section>
                </div>
            </section>
        </div>
    </div>
)
}

export default Dashboard
