import axios from "axios";
import { useCookies } from "react-cookie";
import { BiLogOut } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import React, { useEffect, useState } from 'react';
import Navigate from "../Common/Navigate/Navigate";
import { useGetUserID } from "../Hooks/useGetUserID";
import { Link, useNavigate } from "react-router-dom";
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

const SideBar: React.FC = () => {

    const userID = useGetUserID();
    const navigate = useNavigate();
    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    // USESTSATE HOOK

    const [Name, setName] = useState<string>("")
    const [ExtendNavbar,setExtendNavbar ] = useState<boolean>(true)

    const toggleMenu = () => {
        setExtendNavbar(!ExtendNavbar);
    };

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

    const Logout = () => {
        setCookie("auth_token", "");
        window.localStorage.clear();
        navigate("/");
        window.location.reload();
    }

return (
    <div>
        <div id="SideBar" className="hidden bg-green-800 xl:flex flex-col justify-between py-5 rounded text-white w-64" >
        <section className="flex flex-col gap-3 px-5">
            <div>
                <figure className="flex font-bold items-center justify-center gap-1.5">
                    {
                        userID ? 
                        <Navigate 
                            Navigation={`/${userID}`}
                            children={<FontAwesomeIcon icon={faUser} className="bg-white text-green-700 p-3 rounded-full text-3xl" />}
                        /> : null
                    }
                    <h1 className="text-4xl">EBudget</h1>
                </figure>
                {userID ? <h3 className="font-bold mt-5 text-center text-xl">Welcome {Name}</h3> : null }
            </div>
            <div className="flex flex-col gap-3.5 px-5">
                <Navigate
                    Navigation="/Dashboard" 
                    NavigateStyle="flex items-center gap-1.5 text-lg"
                    children={ <BiSolidDashboard /> }
                    NavigateText="Dashboard"
                />
                <Navigate
                    Navigation="/Income" 
                    NavigateStyle="flex items-center gap-1.5 text-lg"
                    children={ <FontAwesomeIcon icon={faMoneyBillTrendUp} /> }
                    NavigateText="Incomes"
                />
                <Navigate
                    Navigation="/Expense" 
                    NavigateStyle="flex items-center gap-1.5 text-lg"
                    children={ <FontAwesomeIcon icon={faMoneyBillTransfer} /> }
                    NavigateText="Expenses"
                />
                <Navigate
                    Navigation="/Savings"
                    NavigateStyle="flex items-center gap-1.5 text-lg"
                    children={ <FontAwesomeIcon icon={faPiggyBank} /> }
                    NavigateText="Savings & Investments"
                />
                <Navigate
                    Navigation="/Loan_Calculator"
                    NavigateStyle="flex items-center gap-1.5 text-lg"
                    children={ <FontAwesomeIcon icon={faBuildingColumns} /> }
                    NavigateText="Loan Calculator"
                />
            </div>
        </section>
        <section  className="flex flex-col gap-5 px-5">
            <div className="flex flex-col gap-3.5">
                {
                userID ?
                <Navigate 
                    Navigation={`/${userID}`}
                    NavigateStyle="flex gap-1.5 text-lg"
                    children={<AiOutlineUser />}
                    NavigateText="Profile"
                />  : ""
                }
                {
                !userID ? 
                    <Navigate 
                        Navigation={`/Registration`}
                        NavigateStyle="flex gap-1.5 text-lg"
                        children={<AiOutlineUserAdd />}
                        NavigateText="Sign Up"
                    /> : ""
                }
                {
                !Cookie.auth_token ?
                (
                    <Navigate 
                        Navigation={`/`}
                        NavigateStyle="flex gap-1.5 text-lg"
                        children={<FiLogIn />}
                        NavigateText="Login"
                    />
                ) : 
                (
                    <Navigate 
                        Navigation={`/`}
                        NavigateStyle="flex gap-1.5 text-lg"
                        children={<BiLogOut />}
                        NavigateText="Logout"
                        onClick={Logout}
                    />
                )
                }
            </div>
        </section>
        </div>
        <div className="flex justify-between px-2 py-1 shadow-lg sticky text-black xl:hidden">
            <h1 className="font-bold text-4xl">EBudget</h1>
            <div className="flex items-center justify-center gap-3">
                {
                    userID ? 
                    <Link to={`/${userID}`} >
                        <FontAwesomeIcon icon={faUser} className="bg-black text-white p-2 rounded-full text-lg" />
                    </Link> : null
                }
                <button onClick={toggleMenu} className="focus:outline-none">
                    {ExtendNavbar ? <FontAwesomeIcon icon={faX} className="text-sm" /> : <FontAwesomeIcon icon={faBars} className="text-base" />}
                </button>
                {userID ? <h3 className="font-bold flex flex-col text-center"><span>Welcome</span>{Name}</h3> : null }
            </div>
            {/* Mobile Menu (hidden by default) */}
            {ExtendNavbar && (
                <nav className="bg-white absolute top-14 right-0 flex flex-col gap-4 m-auto pl-4 pt-2 pb-8 rounded-Header text-base text-black w-36 xl:hidden">
                    <Navigate
                        Navigation="/Dashboard"
                        NavigateStyle="border-b border-black text-black no-underline w-28"
                        NavigateText="Dashboard"
                    />
                    <Navigate
                        Navigation="/Income"
                        NavigateStyle="border-b border-black text-black no-underline w-28"
                        NavigateText="Incomes"
                    />
                    <Navigate
                        Navigation="/Expense"
                        NavigateStyle="border-b border-black text-black no-underline w-28"
                        NavigateText="Expenses"
                    />
                    <Navigate
                        Navigation="/Savings"
                        NavigateStyle="border-b border-black text-black no-underline w-28"
                        NavigateText="Savings & Investments"
                    />
                    <Navigate
                        Navigation="/Loan_Calculator"
                        NavigateStyle="border-b border-black text-black no-underline w-28"
                        NavigateText="Loan Calculator"
                    />
                    {
                    !userID ?
                        <Navigate
                            Navigation="/Registration"
                            NavigateStyle="border-b border-black text-black no-underline w-28"
                            NavigateText="Sign Up"
                        /> : null
                    }
                    {
                    !Cookie.auth_token ?
                    (
                        <Navigate
                            Navigation="/"
                            NavigateStyle="border-b border-black text-black no-underline w-28"
                            NavigateText="Login"
                        />
                    ) : 
                    (
                        <Navigate
                            NavigateStyle="border-b border-black text-black no-underline w-28"
                            NavigateText="Logout"
                            onClick={Logout}
                        />
                    )
                    }
                </nav>
            )}
        </div>
    </div>
)
}

export default SideBar
