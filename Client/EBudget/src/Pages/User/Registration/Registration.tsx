import * as z from 'zod';
import Axios from "axios";
import React from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Components/Common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FormValues {
    Name: string;
    Email: string;
    Password: string;
};

const Registration:React.FC = () => {

    const navigate = useNavigate()

    const RegistrationSchema = z.object({
        Name: z.string().min(1, { message: 'Name is required'}),
        Email: z.string().email({ message: "Invalid email address" }),
        Password: z.string().min(1, { message: 'Password is required'})
    });

    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(RegistrationSchema)
    });

    const onRegistration : SubmitHandler<FormValues> = async (data) => {
        console.log(data)
        try {
            await Axios.post("https://localhost:4000/Users/Registration", data) 
            .then(() => {
                console.log(data)
                enqueueSnackbar("Registration Completed! Kindly Log in", {variant: "success"})
                navigate("/Login")
            })
        } catch (error) { 
            enqueueSnackbar("Registration Failed!" , {variant: "error"})  
            console.error(error)
        }
    }

return (
    <div className='flex flex-col items-center justify-center m-auto w-full'>
        <form method="post" onSubmit={handleSubmit(onRegistration)} encType="multipart/form-data" className='bg-green-800 flex flex-col items-center gap-5 px-5 py-5 rounded text-white'>
            <FontAwesomeIcon icon={faUser} className='bg-black -mt-20 px-9 py-8 rounded-full text-8xl text-white' />
            <h1 className='font-bold pt-5 text-center text-5xl'>Sign Up</h1>
            <div className='flex flex-col gap-2'>
                <label className='text-lg' htmlFor="">Name</label> 
                <input placeholder="Enter Name..." {...register('Name', { required: 'Name is required' })} className='border-black border-b h-8 outline-none rounded-sm truncate px-1 py-2 text-black text-lg w-96' required />
                {errors.Name && <p className="text-center text-red-700">{errors.Name.message}</p>}
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-lg' htmlFor="Email">Email</label> 
                <input placeholder="Enter Email..." {...register('Email', { required: 'Email is required' })} className='border-black border-b h-8 outline-none rounded-sm truncate px-1 py-2 text-black text-lg w-96' required />
                {errors.Email && <p className="text-center text-red-700">{errors.Email.message}</p>}
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-lg' htmlFor="Password">Password</label> 
                <input placeholder="Enter Password..." {...register('Password', { required: 'Password is required' })} className='border-black border-b h-8 outline-none rounded-sm truncate px-1 py-2 text-black text-lg w-96' required />
                {errors.Password && <p className="text-center text-red-700">{errors.Password.message}</p>}
            </div>
            <Button
                ButtonText='Sign Up'
                ButtonStyle='bg-black cursor-pointer mt-1 text-center text-lg text-white px-3 py-1 rounded w-36'
                onClick={handleSubmit(onRegistration)}
            />
        </form>
    </div>
)
}

export default Registration