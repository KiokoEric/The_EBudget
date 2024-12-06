import * as z from 'zod';
import axios from "axios";
import React from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../../Components/Common/Button/Button';
import RegistrationImage from "../../../assets/Registration_Image.avif";

interface FormValues {
    Name: string;
    Email: string;
    Password: string;
};

const Registration:React.FC = () => {

    const navigate = useNavigate()

    // CREATION OF THE REGISTRATION ZOD SCHEMA

    const RegistrationSchema = z.object({
        Name: z.string().min(1, { message: 'Name is required'}),
        Email: z.string().email({ message: "Invalid email address" }),
        Password: z.string().min(1, { message: 'Password is required'})
    });

    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(RegistrationSchema)
    });

    type UserData = z.infer<typeof RegistrationSchema>

    // ONREGISTRATION FUNCTION

    const onRegistration : SubmitHandler<FormValues> = async (data: UserData) => {
        try {
            await axios.post("https://ebudget-server.onrender.com/Users/Registration", data) 
            .then(() => {
                enqueueSnackbar("Registration Completed! Kindly Log in", { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right', 
                    },
                })
                navigate("/")
            })
        } catch (error) { 
            enqueueSnackbar("Registration Failed!" , { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })  
            console.error(error)
        }
    }

return (
    <div className='flex sm:grid sm:grid-cols-2 gap-5 items-center justify-center mt-1'>
        <figure className='hidden md:block'>
            <img src={RegistrationImage} alt="" />
        </figure>
        <form method="post" onSubmit={handleSubmit(onRegistration)} encType="multipart/form-data" className='flex flex-col items-center justify-start gap-2'>
            <div className='mb-10'>
                <h2 className='text-5xl'>Welcome to <span className='text-green-800' >E</span>budget</h2>
                <p className='mt-5 text-xl text-center'>Create your account.</p>
            </div>            
            <div className='flex flex-col gap-2'>
                <label className='text-xl' htmlFor="">Name</label> 
                <input placeholder="Enter Name..." {...register('Name', { required: 'Name is required' })} className='border-black border-b h-8 outline-none rounded-sm truncate px-1 py-2 text-black text-lg w-80 lg:w-96' required />
                {errors.Name && <p className="text-center text-red-700">{errors.Name.message}</p>}
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-xl' htmlFor="Email">Email</label> 
                <input placeholder="Enter Email..." {...register('Email', { required: 'Email is required' })} className='border-black border-b h-8 outline-none rounded-sm truncate px-1 py-2 text-black text-lg w-80 lg:w-96' required />
                {errors.Email && <p className="text-center text-red-700">{errors.Email.message}</p>}
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-xl' htmlFor="Password">Password</label> 
                <input placeholder="Enter Password..." {...register('Password', { required: 'Password is required' })} className='border-black border-b h-8 outline-none rounded-sm truncate px-1 py-2 text-black text-lg w-80 lg:w-96' required />
                {errors.Password && <p className="text-center text-red-700">{errors.Password.message}</p>}
            </div>
            <Button
                ButtonText='Sign Up'
                ButtonStyle='bg-green-800 cursor-pointer mt-4 px-3 py-1 rounded text-center text-lg text-white  w-36 hover:bg-black'
                onClick={handleSubmit(onRegistration)}
            />
        </form>
    </div>
)
}

export default Registration
