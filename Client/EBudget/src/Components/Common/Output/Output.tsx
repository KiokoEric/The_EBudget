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
    ID?: any;
    ifMemo: any;
    Date: string;
    Memo: string;
    Amount: string;
    OutputLink?: any;
    MemoStyle:string;
    containerStyle: any;
    Description: string;
    TransactionIcon: any;
    ActionStyle?: string;
}

const Output:React.FC<OutputProps> = ({ containerStyle, TransactionIcon, Amount, Date, Description, ID, ifMemo, MemoStyle ,Memo, OutputLink, ActionStyle, onClick }) => {
return (
    <li className={containerStyle} key={ID}>
        { TransactionIcon }
        <div className='flex flex-col gap-4'>
            <section>
                <h3 className='text-center text-3xl xl:text-2xl sm:text-left'>{Description}</h3> 
            </section>
            <section className='flex flex-col gap-4 lg:gap-2 sm:flex-row'>
                <div className='flex gap-10 sm:gap-5 xl:gap-2'>
                    <p className='text-xl text-center'> <FontAwesomeIcon icon={faCoins} className='text-xl mr-1' /> Kshs. {Amount}</p>
                    <p className='text-xl text-center'> <FontAwesomeIcon icon={faCalendarDays} className='text-xl mr-1' /> Date: {Date}</p>
                </div>
                {
                    ifMemo ? <p className={MemoStyle}><FontAwesomeIcon icon={faComment} className='text-xl mr-1' />{Memo}</p> : ""
                }
            </section>
        </div>
        <div className={ActionStyle}>
            <Link id='Edit' to={OutputLink} className='bg-white px-3 py-3 rounded-full'>
                <FontAwesomeIcon icon={faPenToSquare} className='text-green-700 text-xl'/>
            </Link>
            <button id='Delete' onClick={onClick} className='bg-white px-3 py-3 rounded-full'>
                <FontAwesomeIcon icon={faTrash} className='text-red-600 text-xl'/>
            </button>
        </div>
    </li>
)
}

export default React.memo(Output)
