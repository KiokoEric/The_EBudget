import * as z from 'zod';
import Axios from "axios";
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../Components/Common/Button/Button';
import Output from '../../Components/Common/Output/Output';
import Heading from '../../Components/Common/Heading/Heading';
import { useGetUserID } from "../../Components/Hooks/useGetUserID";

interface FormValues {
    Description: string;
    Amount: number;
    Date: Date;
    Memo: string;
};

const Expense:React.FC = () => {

    const userID = useGetUserID()
    const [userOwner, setuserOwner] = useState(userID)
    const [ Success, setSuccess ] = useState('')
    const [ Cookie,_ ] = useCookies(["auth_token"]);
    const [Transactions, setTransactions] = useState([])

    const ExpenseSchema = z.object({
        Description: z.string().min(1, 'Description is required'),
        Amount: z.string().min(1, 'Amount is required'),
        Date: z.string().min(1, 'Date is required'),
        Memo: z.string().min(1, 'Memo is required'),
    });

    type FormData = z.infer<typeof ExpenseSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(ExpenseSchema),
    });

    // Calculation of Total Expense

    const CalculateExpense = () => {
        let TotalExpense = 0;
        Transactions.forEach((Transaction) => {
            TotalExpense += parseInt(Transaction.Amount);
        });
        return TotalExpense;
    };

    // Delete Expense Transaction

    const handleDelete= async(_id) => {
        await Axios.delete(`https://localhost:4000/Expense/${_id}`, {
            headers: {authorization: Cookie.auth_token}
        }) 
    }

    const AddExpense: SubmitHandler<FormValues> = async (data: FormData) => {
        await Axios.post("https://localhost:4000/Expense/AddExpense", data, {
            headers: { authorization: Cookie.auth_token },
        }) 
        console.log(data)
        setSuccess('Expense details has been successfully added.') 
    };

    useEffect(() => {

        const FetchExpense = () => {
            Axios.get(`https://localhost:4000/Expense/${userID}/Expenses`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTransactions(Response.data)
            })
        } 
    
        if (userOwner) {
            FetchExpense()
        }
    },[Transactions])

return (
    <div>
        <div className='flex flex-col gap-10 text-black w-full'>
        <Heading
            Heading='Expenses'
            HeadingStyle='font-bold mb-1 text-center text-green-700 text-5xl'
            TransactionStyle='bg-blue-950 font-bold flex items-center justify-center h-20 rounded text-4xl text-white text-center'
            TransactionName='Total Expenses'
        />
        <div className='flex gap-3'>
        <section className='flex flex-col items-center mb-5 px-5'>
            <form method="post" onSubmit={handleSubmit(AddExpense)} encType="multipart/form-data" className='flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Expense Description</label> 
                    <input placeholder="Expense Description..." {...register('Description', { required: 'Description is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-96' required />
                    {errors.Description && <p className="text-center text-red-700">{errors.Description.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Expense Amount</label>
                    <input className="border-black border-b h-6 outline-none px-1 py-2 w-96"  placeholder="Expense Amount..." {...register('Amount', { required: 'Expense Amount is required' })} required/>
                    {errors.Amount && <p className="text-center text-red-700">{errors.Amount.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Date</label>
                    <input type='date' className="border-black border-b h-6 outline-none px-1 py-2 uppercase w-96" {...register('Date', { required: 'Date is required' })} required ></input>
                    {errors.Date && <p className="text-center text-red-700">{errors.Date.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Memo</label>
                    <textarea placeholder='Add a Memo...' className="border-black border-b h-20 px-1 outline-none py-2 w-96" {...register('Memo', { required: 'Memo is required' })} required ></textarea>
                    {errors.Memo && <p className="text-center text-red-700">{errors.Memo.message}</p>}
                </div>
                <div className='flex flex-col items-center mt-10 text-center'>
                    <h4 className='font-bold text-center text-green-700'>{Success}</h4>
                    <Button
                        ButtonText='Add Expense'
                        ButtonStyle='bg-green-800 cursor-pointer flex items-center justify-center h-10 px-3 py-1 rounded-sm text-center text-white w-40'
                        onClick={handleSubmit(AddExpense)}
                    />
                </div>
            </form>
        </section>
        <section className='mt-5' >
            <Output
                Description='Salary'
                Amount='50,000'
                Date='10-07-2024'
                ifMemo='Memo'
                Memo='Salary for the month of December.'
            />
        </section>
        </div>
    </div>
    </div>
)
}

export default Expense