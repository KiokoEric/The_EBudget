import React from 'react';

interface StatusProps {
    TransactionName: string;
    NameStyle: string;
    TransactionValue: any;
    ValueStyle: string;
    StatusStyle: string;
}

const Status:React.FC<StatusProps> = ({ StatusStyle, NameStyle, TransactionName, ValueStyle, TransactionValue }) => {
return (
    <div className={StatusStyle}>
        <h1 className={NameStyle}>{TransactionName}</h1>
        <h2 className={ValueStyle}>{TransactionValue}</h2>
    </div>
)
}

export default Status
