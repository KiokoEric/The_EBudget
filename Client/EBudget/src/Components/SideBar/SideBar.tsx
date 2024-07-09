import axios from "axios";
import { useCookies } from "react-cookie";
import { BiLogOut } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

const SideBar: React.FC = () => {

    const [Name, setName] = useState("")
    // const userID = useGetUserID();

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
    <div>
        <section>
            <div>
                <figure>
                    <FontAwesomeIcon icon={faUser} />
                    <h1>EBudget</h1>
                </figure>
                {userID ? <h3>Welcome {Name}</h3> : null }
            </div>
            <div>
                <Link to="/Dashboard" className='Link' >
                    < BiSolidDashboard className='ReactIcon' />
                    Dashboard
                </Link>
                <Link to="/Income" className='Link' >
                    <FontAwesomeIcon icon={faMoneyBillTrendUp} />
                    Incomes
                </Link>
                <Link to="/Expense" className='Link' >
                    <FontAwesomeIcon icon={faMoneyBillTransfer} />
                    Expenses
                </Link>
                <Link to="/Savings" className='Link' >
                    <FontAwesomeIcon icon={faPiggyBank} />
                    Savings & Investments
                </Link>
                <Link to="/Loan_Calculator" className='Link' >
                    <FontAwesomeIcon icon={faBuildingColumns} />
                    Loan Calculator
                </Link>
            </div>
        </section>
        <section>
            <div>
                {
                userID ? <Link to={`/${userID}`} className='Link' >
                    <AiOutlineUser className='ReactIcon' />
                    Profile
                </Link> : ""
                }
                {
                !userID ? <Link to="/Registration" className='Link' >
                    <AiOutlineUserAdd className='ReactIcon' />
                        Sign Up
                    </Link> : ""
                }
                {
                !Cookie.auth_token ?
                (
                    <Link to="/" className='Link' >
                        <FiLogIn className='ReactIcon' />
                        Login
                    </Link>
                ) : 
                (
                    <button onClick={Logout} className='Logout'>
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