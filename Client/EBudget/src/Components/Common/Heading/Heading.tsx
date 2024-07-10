import React from 'react';

interface HeadingProps {
    idName: string;
    ContainerStyle: string;
    Heading: string;
    HeadingStyle: string;
    TransactionStyle?: string;
    TransactionName?: string;
    Name?: any;
}

const Heading: React.FC<HeadingProps> = ({ idName, ContainerStyle, Heading, HeadingStyle, TransactionStyle, TransactionName, Name }) => {

return (
    <div id={idName} className={ContainerStyle} >
        <h1 className={HeadingStyle}>{Heading}</h1>
        <div className={TransactionStyle}>
            <h3>{ TransactionName }: {Name}</h3>
        </div>
    </div>
)
}

export default React.memo(Heading);