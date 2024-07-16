import React from 'react'

const Labels: React.FC = () => {
return (
    <div className='flex flex-col gap-2' >
        <h3 className='font-bold text-2xl'>Labels</h3>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-yellow-500 m-1.5'></div>
            <p className='text-lg'>Total Savings</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-blue-800 m-1.5' ></div>
            <p className='text-lg'>Total Balance</p>
        </section>
        <section className='flex gap-2'>
            <div id='Indicator' className='bg-red-700 m-1.5' ></div>
            <p className='text-lg'>Total Expenses</p>
        </section>
    </div>
)
}

export default Labels