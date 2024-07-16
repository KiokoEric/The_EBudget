import React from 'react';
import { Link } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

interface OutputProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    TransactionIcon: any;
    Amount: string;
    Date: string;
    Description: string;
    ID?: any;
    ifMemo: any;
    MemoStyle:string;
    Memo: string;
    OutputLink?: string;
    ActionStyle?: string;
}

const Output:React.FC<OutputProps> = ({ TransactionIcon, Amount, Date, Description, ID, ifMemo, MemoStyle ,Memo, OutputLink, ActionStyle, onClick }) => {
return (
    <li className='bg-green-800 flex items-center gap-5 min-h-max px-4 py-2 rounded text-white' key={ID}>
        { TransactionIcon }
        <div className='flex flex-col gap-4'>
            <section>
                <h3 className='text-2xl'>{Description}</h3> 
            </section>
            <section className='flex gap-3'>
                <p className='text-xl text-center'> <FontAwesomeIcon icon={faCoins} className='text-xl mr-1' /> Kshs. {Amount}</p>
                <p className='text-xl text-center'> <FontAwesomeIcon icon={faCalendarDays} className='text-xl mr-1' /> Date: {Date}</p>
                {
                    ifMemo ? <p className={MemoStyle}><FontAwesomeIcon icon={faComment} className='text-xl mr-1' />{Memo}</p> : ""
                }
            </section>
        </div>
        <div className={ActionStyle}>
            <Link to={OutputLink} className='bg-white px-3 py-3 rounded-full'>
                <FontAwesomeIcon icon={faPenToSquare} className='text-green-700 text-xl'/>
            </Link>
            <button onClick={onClick} className='bg-white px-3 py-3 rounded-full'>
                <FontAwesomeIcon icon={faTrash} className='text-red-600 text-xl'/>
            </button>
        </div>
    </li>
)
}

export default React.memo(Output)