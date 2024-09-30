import axios from "axios";
import { useCookies } from "react-cookie";
import { RiEditFill } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import Input from "../../Components/Common/Input/Input";
import { useNavigate, useParams } from 'react-router-dom';
import Button from "../../Components/Common/Button/Button";
import TextArea from "../../Components/Common/TextArea/TextArea";
import { useGetUserID } from "../../Components/Hooks/useGetUserID";

const SavingsTransaction:React.FC = () => {

    const { _id } = useParams()
    const userID = useGetUserID();
    const navigate = useNavigate()
    const [Cookie, _] = useCookies(["auth_token"]);

    // USESTATE HOOK

    const [Memo, setMemo] = useState<string>("")
    const [Date, setDate] = useState<string>("")
    const [Amount, setAmount] = useState<string>("")
    const [Success, setSuccess] = useState<string>("")
    const [userOwner, setuserOwner] = useState<any>(userID)
    const [Description, setDescription] = useState<string>("")

    // CALLING ON THE DETAILS OF THE SAVINGS TRANSACTION

    useEffect(() => {

        const FetchSavings =() => {
        try{
            axios.get(`http://localhost:4000/Savings/${_id}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Data) => { 
                setMemo(Data.data.Memo)
                setDate(Data.data.Date) 
                setAmount(Data.data.Amount)
                setDescription(Data.data.Description)
            })
        }
        catch (Error){
            console.log(Error)
        }}

        FetchSavings()
        
    }, [])

    // EDIT SAVINGS TRANSACTION FUNCTION

    const EditTransaction = (e: any) => {
        e.preventDefault()

        const data = {
            Description, Amount, Memo, Date, userOwner
        }
        try {
            axios.put(`http://localhost:4000/Savings/${_id}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("Savings Transaction has been succesffuly edited.")
                setTimeout(() => {
                    navigate('/Savings')
                }, 1500);
            })
        } catch (error) {
            console.error(error) 
        }
    }

    return (
        <div className="w-screen">
            <figure className='flex justify-center gap-4 lg:justify-start'>
                <RiEditFill size="3rem" />
                <h1 className='font-bold pb-2 text-3xl sm:text-5xl'>Edit Savings Transaction</h1>
            </figure>
            <hr />
            <section className="flex flex-col gap-8 items-center justify-center mt-20 mb-5">
            <Input 
                    ContainerStyle = 'flex flex-col gap-1'
                    Label = 'Description'
                    LabelStyle = 'font-bold text-xl'
                    inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black text-xl w-80 sm:w-96'   
                    Value={Description}
                    Change={(e:any) => setDescription(e.target.value)}
                />
                <Input 
                    ContainerStyle = 'flex flex-col gap-1'
                    Label = 'Amount'
                    LabelStyle = 'font-bold text-xl'
                    inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black text-xl w-80 sm:w-96'  
                    Value={Amount} 
                    Change={(e:any) => setAmount(e.target.value)}
                />
                <Input 
                    ContainerStyle = 'flex flex-col w-80 sm:w-96'
                    Label = 'Date'
                    LabelStyle = 'font-bold text-xl'
                    type='date'
                    inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-3 text-black text-xl w-80 sm:w-96'
                    TextStyle="border-black border-b flex flex-row"
                    Value={Date}
                    Change={(e:any) => setDate(e.target.value)}
                />
                <TextArea
                    ContainerStyle = 'flex flex-col gap-2'
                    Label = 'Memo'
                    LabelStyle = 'font-bold text-xl'
                    inputStyle = 'border-black border-b h-20 outline-none truncate px-1 py-2 text-black text-xl w-80 sm:w-96'  
                    Value={Memo}
                    Change={(e: any) => setMemo(e.target.value)}
                />
                <p className="font-bold mt-4 text-center text-green-600">{Success}</p>
                <Button
                    ButtonText='Edit Savings Transaction'
                    ButtonStyle='bg-green-800 cursor-pointer flex items-center justify-center h-10 px-3 py-1 rounded-sm text-center text-white w-40'
                    onClick={EditTransaction}
                />
            </section>
        </div>
    )
    }
    
export default SavingsTransaction
