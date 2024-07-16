import React from 'react';
import Labels from '../../Components/Labels/Labels';
import Status from '../../Components/Common/Status/Status';
import Output from '../../Components/Common/Output/Output';
import ChartImage from '../../Components/ChartImage/ChartImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWheat } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

const Dashboard:React.FC = () => {
return (
    <div id='App' className='flex flex-col gap-10 text-black p-2 rounded shadow-Shadow-green w-5/6'>
        <section className='flex gap-2 justify-between'>
            <Status
                StatusStyle='bg-Blue flex flex-col gap-3 items-center justify-center max-h-28 py-2 rounded-md text-center text-white w-72'
                NameStyle='font-bold text-4xl'
                TransactionName='Total Income'
                ValueStyle='font-bold text-3xl'
                TransactionValue='Kshs. 200'
            />
            <Status
                StatusStyle='bg-Blue flex flex-col gap-3 items-center justify-center max-h-28 py-2 rounded-md text-center text-white w-72'
                NameStyle='font-bold text-4xl'
                TransactionName='Total Expense'
                ValueStyle='font-bold text-3xl'
                TransactionValue='Kshs. 200'
            />
            <Status
                StatusStyle='bg-Blue flex flex-col gap-3 items-center justify-center max-h-36 px-0 py-2 rounded-md text-center text-white w-72'
                NameStyle='font-bold text-4xl'
                TransactionName='Savings & Investments'
                ValueStyle='font-bold text-3xl'
                TransactionValue='Kshs. 200'
            />
            <Status
                StatusStyle='bg-Blue flex flex-col gap-3 items-center justify-center max-h-28 py-2 rounded-md text-center text-white w-64'
                NameStyle='font-bold text-4xl'
                TransactionName='Total Balance'
                ValueStyle='font-bold text-3xl'
                TransactionValue='Kshs. 200'
            />
        </section>
        <div className='flex gap-10 px-2' >
            <section className='w-6/12'>
                <h2 className='font-bold mb-20 text-Blue text-center text-4xl'>Transaction Summary</h2>
                <figure className='bg-Beige max-h-fit  px-2 py-2 rounded'> 
                    <ChartImage />
                    <Labels />
                </figure>
            </section>
            <section className='flex flex-col gap-10 w-full'>
                <h2 className='font-bold text-Blue text-center text-4xl'>Recent Transaction History</h2>
                <div>
                    <h3 className='font-bold mb-2 text-Blue text-center text-3xl'>Income Transactions</h3>
                    <section className='max-h-52 overflow-scroll overflow-x-hidden'>
                        <Output
                            TransactionIcon={ <FontAwesomeIcon icon={faMoneyBillWheat} className='text-3xl' /> }
                            Description='Salary'
                            Amount='50,000'
                            Date='10-07-2024'
                            ifMemo='Memo'
                            MemoStyle='text-xl text-center w-72'
                            Memo='Salary for the month of December.'
                            ActionStyle='hidden'
                        />
                    </section>
                </div>
                <div>
                    <h3 className='font-bold mb-2 text-Blue text-center text-3xl'>Expense Transactions</h3>
                    <section className='max-h-52 overflow-scroll overflow-x-hidden'>
                        <Output
                            TransactionIcon={<FontAwesomeIcon icon={faHandHoldingDollar} className='text-3xl' />}
                            Description='Salary'
                            Amount='50,000'
                            Date='10-07-2024'
                            ifMemo='Memo'
                            MemoStyle='text-xl text-center w-72'
                            Memo='Salary for the month of December.'
                            ActionStyle='hidden'
                        />
                    </section>
                </div>
            </section>
        </div>
    </div>
)
}

export default Dashboard