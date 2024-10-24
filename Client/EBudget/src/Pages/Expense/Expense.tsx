import * as z from 'zod';
import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../../Components/Common/Modal/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../Components/Common/Button/Button';
import Output from '../../Components/Common/Output/Output';
import Heading from '../../Components/Common/Heading/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetUserID } from "../../Components/Hooks/useGetUserID";
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

interface FormValues {
    Date: string;
    Memo: string;
    Amount: string;
    userOwner: any;
    Description: string;
};

const Expense:React.FC = () => {

    const userID = useGetUserID()
    const [ Cookie,_ ] = useCookies(["auth_token"]);

    // USESTATE HOOK

    const [Expenses, setExpenses] = useState<number>(0)
    const [ Success, setSuccess ] = useState<string>('')
    const [userOwner, setuserOwner] = useState<any>(userID)
    const [Transactions, setTransactions] = useState<any>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // OPENING AND CLOSING OF ADD NEW EXPENSE MODAL

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // CREATION OF THE EXPENSE ZOD SCHEMA

    const ExpenseSchema = z.object({
        userOwner: z.any().default(userID),
        Memo: z.string().min(1, 'Memo is required'),
        Date: z.string().min(1, 'Date is required'),
        Amount: z.string().min(1, 'Amount is required'),
        Description: z.string().min(1, 'Description is required'),
    });

    type FormData = z.infer<typeof ExpenseSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(ExpenseSchema),
    });

    // CALCULATION OF TOTAL EXPENSES

    const CalculateExpense = () => {
        let TotalExpense = 0;
        Transactions.forEach((Transaction: any) => {
            TotalExpense += parseInt(Transaction.Amount);
        });
        return TotalExpense;
    };

    // DELETE EXPENSE TRANSACTIONS FUNCTION

    const handleDelete= async(_id: any) => {
        await axios.delete(`http://localhost:4000/Expense/${_id}`, {
            headers: {authorization: Cookie.auth_token}
        }) 
    }

    // ADD EXPENSE FUNCTION

    const AddExpense: SubmitHandler<FormValues> = async (data: FormData) => {
        await axios.post("http://localhost:4000/Expense/AddExpense", data, {
            headers: { authorization: Cookie.auth_token },
        }) 
        setSuccess('Expense details has been successfully added.') 
    };

    // CALLING ON THE USER'S CREATED EXPENSES TRANSACTIONS

    useEffect(() => {

        const FetchExpense = () => {
            axios.get(`http://localhost:4000/Expense/${userID}/Expenses`, {
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

    // SET EXPENSES CALCULATION

    useEffect(()=> {
        const TotalExpense = CalculateExpense();
        setExpenses(TotalExpense);
    },[Transactions]) 

return (
    <div id='App' className='flex flex-col gap-10 text-black p-2 rounded xl:shadow-Shadow-green w-full'>
        <Heading
            Heading='Expenses'
            HeadingStyle='font-bold mb-1 text-center text-green-700 text-5xl'
            TransactionStyle='bg-blue-950 font-bold flex items-center justify-center h-20 rounded text-4xl text-white text-center min-w-full'
            TransactionName='Total Expenses'
            Value={Expenses}
        />
        <div className='flex gap-3'>
            <section className='hidden xl:flex flex-col items-center mb-5 px-5'>
                <form method="post" onSubmit={handleSubmit(AddExpense)} encType="multipart/form-data" className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold text-lg' htmlFor="">Expense Description</label> 
                        <input placeholder="Expense Description..." {...register('Description', { required: 'Description is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-96' required />
                        {errors.Description && <p className="text-center text-red-700">{errors.Description.message}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold text-lg' htmlFor="">Expense Amount</label>
                        <input type='number' className="border-black border-b h-6 outline-none px-1 py-2 w-96"  placeholder="Expense Amount..." {...register('Amount', { required: 'Expense Amount is required' })} required/>
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
                    <div className='flex flex-col items-center mt-5 text-center'>
                        <h4 className='font-bold mt-2 text-center text-green-700'>{Success}</h4>
                        <Button
                            ButtonText='Add Expense'
                            ButtonStyle='bg-green-800 cursor-pointer flex items-center justify-center h-10 px-3 py-1 rounded-sm text-center text-white w-40 hover:bg-black'
                            onClick={handleSubmit(AddExpense)}
                        />
                    </div>
                </form>
            </section>
            <section className='flex flex-col gap-3 mt-5 w-full'>
                {
                    Transactions.map((Transaction: any) => (
                        <Output
                            containerStyle='bg-green-800 flex flex-col items-center justify-center gap-5 min-h-max px-2 py-2 rounded text-white sm:flex-row'
                            TransactionIcon={ <FontAwesomeIcon icon={faHandHoldingDollar} className='hidden sm:flex text-3xl' /> }
                            Description= {Transaction.Description}
                            Amount= {Transaction.Amount}
                            Date= {Transaction.Date}
                            ifMemo= {Transaction.Memo}
                            MemoStyle='m-auto text-xl text-center w-52 sm:w-64 lg:w-80 xl:w-52'
                            Memo= {Transaction.Memo}
                            ActionStyle='flex justify-end gap-2 sm:flex-col md:flex-row lg:flex-row xl:flex-col'
                            OutputLink={`/Expense/${Transaction._id}`}
                            onClick={() => handleDelete(Transaction._id)}
                        />
                ))}
                <div className='flex items-center justify-center mt-5 xl:hidden'>
                    <Button
                        ButtonText='Add New Expense'
                        ButtonStyle='bg-green-800 cursor-pointer flex items-center justify-center h-10 px-3 py-1 rounded-sm text-center text-white w-40'
                        onClick={openModal}
                    />
                </div>
            </section>
        </div>
        <div className='flex flex-col items-center justify-center' >
            <Modal isOpen={isModalOpen} formStyle='border-b-2 border-black m-auto p-10 rounded w-10/12 xl:hidden'>
                <form method="post" onSubmit={handleSubmit(AddExpense)} encType="multipart/form-data" className='flex flex-col justify-center items-center gap-8'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold text-lg' htmlFor="">Expense Description</label> 
                        <input placeholder="Expense Description..." {...register('Description', { required: 'Description is required' })} className='border-black border-b h-8 m-auto outline-none truncate px-1 py-1 text-black w-64 sm:w-80' required />
                        {errors.Description && <p className="text-center text-red-700">{errors.Description.message}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold text-lg' htmlFor="">Expense Amount</label>
                        <input className="border-black border-b h-6 outline-none px-1 py-2 w-64 sm:w-80"  placeholder="Expense Amount..." {...register('Amount', { required: 'Expense Amount is required' })} required/>
                        {errors.Amount && <p className="text-center text-red-700">{errors.Amount.message}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold text-lg' htmlFor="">Date</label>
                        <input type='date' className="border-black border-b h-6 outline-none px-1 py-2 uppercase w-64 sm:w-80" {...register('Date', { required: 'Date is required' })} required ></input>
                        {errors.Date && <p className="text-center text-red-700">{errors.Date.message}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold text-lg' htmlFor="">Memo</label>
                        <textarea placeholder='Add a Memo...' className="border-black border-b h-20 px-1 outline-none py-2 w-64 sm:w-80" {...register('Memo', { required: 'Memo is required' })} required ></textarea>
                        {errors.Memo && <p className="text-center text-red-700">{errors.Memo.message}</p>}
                    </div>
                    <div className='flex flex-col items-center mt-10 text-center'>
                        <h4 className='font-bold text-center text-green-700'>{Success}</h4>
                        <div className='flex flex-col gap-5' >
                            <Button
                                ButtonText='Add Expense'
                                ButtonStyle='bg-green-800 cursor-pointer flex items-center justify-center h-10 px-3 py-1 rounded-sm text-center text-white w-40'
                                onClick={handleSubmit(AddExpense)}
                            />
                            <Button
                                ButtonText='Close Modal'
                                ButtonStyle='bg-green-800 cursor-pointer flex items-center justify-center h-10 px-3 py-1 rounded-sm text-center text-white w-40'
                                onClick={closeModal}
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    </div>
)
}

export default Expense
