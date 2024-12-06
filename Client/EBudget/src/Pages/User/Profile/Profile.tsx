import axios from 'axios';
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react';
import ProfileImage from "../../../assets/Profile.png";
import { useNavigate, useParams } from 'react-router-dom';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Input from '../../../Components/Common/Input/Input';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Components/Common/Button/Button';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Profile:React.FC = () => {

    const { userID } = useParams()
    const navigate = useNavigate()
    const [Cookie, _] = useCookies(["auth_token"]);

    // USESTATE HOOK

    const [Name, setName] = useState<string>("")
    const [Email, setEmail] = useState<string>("")
    const [Password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    // DISPLAYING AND HIDING OF PASSWORDS

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // CALLING ON THE USER'S DETAILS

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

    // EDIT USER FUNCTION

    const EditUser = () => {
        navigate(`/EditProfile/${userID}`)
    } 

    // DELETE USER FUNCTION

    const DeleteUser = () => {
        navigate(`/DeleteProfile`)
    }

return (
    <div className='flex sm:grid sm:grid-cols-2 gap-5 items-center justify-center mt-1'>
        <figure className='hidden md:block' >
            <img src={ProfileImage} alt="" />
        </figure>
        <form encType="multipart/form-data" className='flex flex-col items-center justify-start gap-2 text-lg'>
            <div className='mb-10'>
                <h2 className='text-5xl'><span className='text-green-800'>E</span>Budget</h2>
                <p className='mt-5 text-xl text-center'>My Profile</p>
            </div>
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Name'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96' 
                Value={Name}        
            />
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Email'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'
                Value={Email}
            />
            <Input 
                ContainerStyle = 'flex flex-col w-80 sm:w-96'
                Label = 'Password'
                type={showPassword ? 'text' : 'password'}
                LabelStyle = 'font-bold'
                inputStyle = 'h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'
                TextStyle="border-black border-b flex flex-row"
                Value={Password}
                Children={showPassword ? <FontAwesomeIcon icon={faEye} className="underline" onClick={handleTogglePassword} /> : <FontAwesomeIcon icon={faEyeSlash} className="underline" onClick={handleTogglePassword} />  }
            />
            <div className='flex gap-5 mt-5 sm:gap-16'>
                <Button
                    onClick={EditUser}
                    ButtonStyle="bg-green-800 cursor-pointer flex items-center justify-center gap-4 text-center text-white px-2 py-1.5 rounded w-40 hover:bg-black"
                    ButtonText="Edit Details"
                    Children={<FontAwesomeIcon icon={faPenToSquare} />}
                />
                <Button
                    onClick={DeleteUser}
                    ButtonStyle="bg-green-800 cursor-pointer flex items-center justify-center gap-4 text-center text-white px-2 py-1.5 rounded w-40 hover:bg-black"
                    ButtonText="Delete My Profile"
                    Children={<FontAwesomeIcon icon={faTrash} />}
                />
            </div>
        </form>
    </div>
)
}

export default Profile
