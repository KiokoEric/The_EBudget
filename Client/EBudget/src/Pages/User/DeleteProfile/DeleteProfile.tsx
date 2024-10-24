import axios from "axios";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from "../../../Components/Common/Button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetUserID } from "../../../Components/Hooks/useGetUserID";

const DeleteProfile = () => {  

    const myID = useGetUserID();
    const navigate = useNavigate()
    const [Cookie, setCookie] = useCookies(["auth_token"]) 

    // DELETE USER FUNCTION

    const DeleteUser = (id: any) => {
        try{
            axios.delete(`http://localhost:4000/Users/Delete/${id}`, {
                headers: { authorization: Cookie.auth_token }
            })
            .then(() => { 
                navigate("/Registration")
                setCookie("auth_token", "");
                window.localStorage.clear()
            })
        }
        catch (Error){
            console.log(Error)
        }
    }

return (
    <div className='flex flex-col gap-5 items-center justify-center m-auto w-11/12'>
        <h1 className="font-bold text-center text-5xl">We are sorry to see you go, but hope to see you again!</h1>
        <Button 
            onClick={() => DeleteUser(myID)}
            ButtonStyle="bg-green-800 cursor-pointer flex items-center justify-center gap-4 text-center text-white text-lg px-2 py-1.5 rounded w-40 hover:bg-black"
            ButtonText="Delete Account"
            Children={<FontAwesomeIcon icon={faTrash} />}
        />
    </div>
)
}

export default DeleteProfile
