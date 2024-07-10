import React from 'react';
import { Link } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillWheat } from '@fortawesome/free-solid-svg-icons';

interface OutputProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    Amount: string;
    Date: string;
    Description: string;
    ID: any;
    ifMemo: any
    Memo: string;
    OutputLink: string;
}

const Output:React.FC<OutputProps> = ({ Amount, Date, Description, ID, ifMemo, Memo, OutputLink, onClick }) => {
return (
    <li id='TransactionHistory' className='bg-green-700 flex h-24 rounded text-white w-3/4' key={ID}>
        <FontAwesomeIcon icon={faMoneyBillWheat} className='text-3xl' />
        <div>
            <section>
                <h3 className='text-2xl'>{Description}</h3> 
            </section>
            <section>
                <p className='text-lg'> <FontAwesomeIcon icon={faCoins} className='text-xl' /> Kshs. {Amount}</p>
                <p className='text-lg'> <FontAwesomeIcon icon={faCalendarDays} className='text-xl' /> Date: {Date}</p>
                {
                    ifMemo ? <p className='text-lg'><FontAwesomeIcon icon={faComment} className='text-xl' />{Memo}</p> : ""
                }
            </section>
        </div>
        <div className='flex flex-col gap-5'>
            <Link to={OutputLink} className='bg-white px-5 py-5 rounded-full'>
                <FontAwesomeIcon icon={faPenToSquare} className='text-green-700 text-xl'/>
            </Link>
            <button onClick={onClick} className='bg-white px-5 py-5 rounded-full'>
                <FontAwesomeIcon icon={faTrash} className='text-red-700 text-xl'/>
            </button>
        </div>
    </li>
)
}

export default Output