import * as z from 'zod';
import Axios from "axios";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../Components/Common/Button/Button';
import Output from '../../Components/Common/Output/Output';
import Heading from '../../Components/Common/Heading/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetUserID } from "../../Components/Hooks/useGetUserID";
import { faMoneyBillWheat } from '@fortawesome/free-solid-svg-icons';

interface FormValues {
    Description: string;
    Amount: number;
    Date: Date;
    Memo: string;
};

const Income:React.FC = () => {

    const userID = useGetUserID()
    const [userOwner, setuserOwner] = useState(userID)
    const [ Success, setSuccess ] = useState('')
    const [ Cookie,_ ] = useCookies(["auth_token"]);
    const [Transactions, setTransactions] = useState([])

    const IncomeSchema = z.object({
        Description: z.string().min(1, 'Description is required'),
        Amount: z.string().min(1, 'Amount is required'),
        Date: z.string().min(1, 'Date is required'),
        Memo: z.string().min(1, 'Memo is required'),
    });

    type FormData = z.infer<typeof IncomeSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(IncomeSchema),
    });

    // Calculation of Total Income

    const CalculateIncome = () => {
        let TotalIncome = 0;
        Transactions.forEach((Transaction) => {
            TotalIncome += parseInt(Transaction.Amount);
        });
        return TotalIncome;
    };

    // Delete Income Transaction

    const handleDelete= async(_id) => {
        await Axios.delete(`https://localhost:4000/Income/${_id}`, {
            headers: {authorization: Cookie.auth_token}
        }) 
    }

    const AddIncome: SubmitHandler<FormValues> = async (data: FormData) => {
        await Axios.post("https://localhost:4000/Income/AddIncome", data, {
            headers: { authorization: Cookie.auth_token },
        }) 
        console.log(data)
        setSuccess('Income details has been successfully added.') 
    };

    useEffect(() => {

        const FetchIncome = () => {
            Axios.get(`https://localhost:4000/Income/${userID}/Incomes`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTransactions(Response.data)
            })
        } 
    
        if (userOwner) {
            FetchIncome()
        }
        },[Transactions])

return (
    <div id='App' className='flex flex-col gap-10 text-black p-2 rounded shadow-Shadow-green w-full'>
        <Heading
            Heading='Income'
            HeadingStyle='font-bold mb-1 text-center text-green-700 text-5xl'
            TransactionStyle='bg-blue-950 font-bold flex items-center justify-center h-20 rounded text-4xl text-white text-center'
            TransactionName='Total Income'
        />
        <div className='flex gap-5'>
        <section className='flex flex-col items-center mb-5 px-5'>
            <form method="post" onSubmit={handleSubmit(AddIncome)} encType="multipart/form-data" className='flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Income Description</label> 
                    <input placeholder="Income/Revenue Description..." {...register('Description', { required: 'Description is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-96' required />
                    {errors.Description && <p className="text-center text-red-700">{errors.Description.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Income Amount</label>
                    <input className="border-black border-b h-6 outline-none px-1 py-2 w-96"  placeholder="Income/Revenue Amount..." {...register('Amount', { required: 'Income Amount is required' })} required/>
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
                        ButtonText='Add Income/Revenue'
                        ButtonStyle='bg-green-800 cursor-pointer flex items-center justify-center h-10 px-3 py-1 rounded-sm text-center text-white w-40'
                        onClick={handleSubmit(AddIncome)}
                    />
                </div>
            </form>
        </section>
        <section className='mt-5 w-full' >
            <Output
                TransactionIcon={ <FontAwesomeIcon icon={faMoneyBillWheat} className='text-3xl' /> }
                Description='Salary'
                Amount='50,000'
                Date='10-07-2024'
                ifMemo='Memo'
                MemoStyle='text-xl text-center w-52'
                Memo='Salary for the month of December.'
                ActionStyle='flex justify-end gap-2'
            />
        </section>
        </div>
    </div>
)
}

export default Income