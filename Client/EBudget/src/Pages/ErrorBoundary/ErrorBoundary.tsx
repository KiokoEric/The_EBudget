import React from 'react'

const ErrorBoundary: React.FC = () => {
return (
    <div className='m-auto w-screen'>
        <h1 className='font-bold mt-5 text-red-600 text-3xl text-center w-screen'>Kindly Login to access the EBudget Resources.</h1>
    </div>
    
)
}

export default ErrorBoundary
