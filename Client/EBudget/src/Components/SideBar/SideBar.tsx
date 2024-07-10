import axios from "axios";
import { useCookies } from "react-cookie";
import { BiLogOut } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import React, { useEffect, useState } from 'react';
import { useGetUserID } from "../Hooks/useGetUserID";
import { Link, useNavigate } from "react-router-dom";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

const SideBar: React.FC = () => {

    const [Name, setName] = useState("")
    const userID = useGetUserID();

    useEffect(() => {
        
        const FetchName  = async() => {
            await axios.get(`https://ebudget-server.onrender.com/Users/${userID}/Name`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setName(Response.data.Name)
            })
        } 
    
        if (userID) {
            FetchName()
        } 

    },[userID])

    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    const navigate = useNavigate()

    const Logout = () => {
        setCookie("auth_token", "");
        window.localStorage.clear();
        navigate("/");
    }

return (
    <div id="SideBar" className="bg-green-800 flex flex-col justify-between py-5 rounded text-white w-64" >
        <section className="flex flex-col gap-3 px-5">
            <div>
                <figure className="flex font-bold items-center justify-center gap-1.5">
                    <FontAwesomeIcon icon={faUser} className="bg-white text-green-700 p-3 rounded-full text-3xl" />
                    <h1 className="text-4xl" >EBudget</h1>
                </figure>
                {userID ? <h3>Welcome {Name}</h3> : null }
            </div>
            <div className="flex flex-col gap-3.5 mt-10 px-5">
                <Link to="/Dashboard" className='flex gap-1.5 text-lg'>
                    < BiSolidDashboard className='ReactIcon' />
                    Dashboard
                </Link>
                <Link to="/Income" className='flex gap-1.5 text-lg'>
                    <FontAwesomeIcon icon={faMoneyBillTrendUp} />
                    Incomes
                </Link>
                <Link to="/Expense" className='flex gap-1.5 text-lg'>
                    <FontAwesomeIcon icon={faMoneyBillTransfer} />
                    Expenses
                </Link>
                <Link to="/Savings" className='flex gap-1.5 text-lg'>
                    <FontAwesomeIcon icon={faPiggyBank} />
                    Savings & Investments
                </Link>
                <Link to="/Loan_Calculator" className='flex gap-1.5 text-lg' >
                    <FontAwesomeIcon icon={faBuildingColumns} />
                    Loan Calculator
                </Link>
            </div>
        </section>
        <section  className="flex flex-col gap-5 px-5">
            <div className="flex flex-col gap-3.5" >
                {
                userID ? <Link to={`/${userID}`} className='flex gap-1.5 text-lg' >
                    <AiOutlineUser className='ReactIcon' />
                    Profile
                </Link> : ""
                }
                {
                !userID ? <Link to="/Registration" className='flex gap-1.5 text-lg' >
                    <AiOutlineUserAdd className='ReactIcon' />
                        Sign Up
                    </Link> : ""
                }
                {
                !Cookie.auth_token ?
                (
                    <Link to="/Login" className='flex gap-1.5 text-lg' >
                        <FiLogIn className='ReactIcon' />
                        Login
                    </Link>
                ) : 
                (
                    <button onClick={Logout} className='flex gap-1.5 text-lg'>
                        <BiLogOut className="ReactIcon" />
                        Logout
                    </button>
                )
                }
            </div>
        </section>
    </div>
)
}

export default SideBar