import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Input from '../../../Components/Common/Input/Input';
import Button from "../../../Components/Common/Button/Button";
import EditProfileImage from "../../../assets/EditProfile.webp";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const EditProfile:React.FC = () => {

    const { userID } = useParams()
    const [Cookie, _] = useCookies(["auth_token"])

    // USESTATE HOOK

    const [Name, setName] = useState<string>("")
    const [Email, setEmail] = useState<string>("")
    const [Success, setSuccess] = useState<string>("")
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
                console.log(Error)
            }
        }  
        
        FetchUser()

    }, [])

    // EDIT USER DETAILS FUNCTION

    const EditUserDetails = (e: any) => {
        e.preventDefault()

        const data = {
            Name, Email, Password
        }
        try {
            axios.put(`https://ebudget-server.onrender.com/Users/${userID}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("Details have been succesffuly edited.")
            })
        } catch (error) {
            console.error(error) 
        }
    } 

return (
    <div className='flex sm:grid sm:grid-cols-2 gap-5 items-center justify-center mt-1'>
        <figure className='hidden md:block' >
            <img src={EditProfileImage} alt="" />
        </figure>
        <form encType="multipart/form-data" className='flex flex-col items-center justify-start gap-2 text-lg'>
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Name'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96' 
                Value={Name}
                Change={(e:any) => setName(e.target.value)}        
            />
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Email'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'
                Value={Email}
                Change={(e:any) => setEmail(e.target.value)}  
            />
            <Input 
                ContainerStyle = 'flex flex-col w-80 sm:w-96'
                Label = 'Password'
                type={showPassword ? 'text' : 'password'}
                LabelStyle = 'font-bold'
                inputStyle = 'h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'
                TextStyle="border-black border-b flex flex-row"
                Value={Password}
                Change={(e:any) => setPassword(e.target.value)}  
                Children={showPassword ? <FontAwesomeIcon icon={faEye} className="underline" onClick={handleTogglePassword} /> : <FontAwesomeIcon icon={faEyeSlash} className="underline" onClick={handleTogglePassword} />}
            />
            <div className='mt-10'>
                <h4 className='font-bold text-center text-green-700'>{Success}</h4>
                <Button
                    onClick={EditUserDetails}
                    ButtonStyle="bg-green-800 cursor-pointer flex items-center justify-center gap-4 text-center text-white px-2 py-1.5 rounded w-40 hover:bg-black"
                    ButtonText="Edit Details"
                    Children={<FontAwesomeIcon icon={faPenToSquare} />}
                />
            </div>
        </form>
    </div>
)
}

export default EditProfile
