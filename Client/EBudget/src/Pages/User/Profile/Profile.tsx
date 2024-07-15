import axios from 'axios';
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Components/Common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const Profile:React.FC = () => {

    const { userID } = useParams()
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Cookie, _] = useCookies(["auth_token"]);

    useEffect(() => {

        const FetchUser =() => {
        try{
            axios.get(`https://ebudget-server.onrender.com/Users/${userID}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Data) => { 
                setName(Data.data.Name)
                setEmail(Data.data.Email)
                setPassword(Data.data.Password)
            })
        }
        catch (Error){
            console.log("")
        }
        }

        FetchUser()
        
    }, [])

return (
    <div className='flex flex-col items-center justify-center m-auto w-full'>
        <form method="post" encType="multipart/form-data" className='bg-green-800 flex flex-col items-center gap-5 px-5 py-5 rounded text-white'>
            <FontAwesomeIcon icon={faUser} className='bg-black -mt-20 px-9 py-8 rounded-full text-8xl text-white' />
            <h1 className='font-bold pt-5 text-center text-5xl'>Profile</h1>
            <div className='flex flex-col gap-2'>
                <label className='text-lg' htmlFor="">Name</label> 
                <input className='border-black border-b h-8 outline-none rounded-sm truncate px-1 py-4 text-black text-lg w-96' value={Name} required />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-lg' htmlFor="Email">Email</label> 
                <input className='border-black border-b h-8 outline-none rounded-sm truncate px-1 py-4 text-black text-lg w-96' value={Email} required />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-lg' htmlFor="Password">Password</label> 
                <input className='border-black border-b h-8 outline-none rounded-sm truncate px-1 py-4 text-black text-lg w-96' value={Password} required />
            </div>
            <div className='flex gap-10'>
                <Button
                    Children={<FontAwesomeIcon icon={faPenToSquare} />}
                    ButtonText='Edit Details'
                    ButtonStyle='bg-black cursor-pointer flex gap-2 items-center justify-center mt-1 text-center text-lg text-white px-3 py-2 rounded w-36'
                />
                <Button
                    Children={<FontAwesomeIcon icon={faTrash} />}
                    ButtonText='Delete Profile'
                    ButtonStyle='bg-black cursor-pointer flex gap-2 items-center justify-center mt-1 text-center text-lg text-white px-3 py-2 rounded w-36'
                />
            </div>
        </form>
    </div>
)
}

export default Profile