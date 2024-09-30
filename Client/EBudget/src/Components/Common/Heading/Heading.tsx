import React from 'react';

interface HeadingProps {
    Value?: any;
    idName?: string;
    Heading: string;
    ValueStyle?: string;
    HeadingStyle: string;
    ContainerStyle?: string;
    TransactionName?: string;
    TransactionStyle?: string;
}

const Heading: React.FC<HeadingProps> = ({ idName, ContainerStyle, Heading, HeadingStyle, TransactionStyle, TransactionName,ValueStyle, Value }) => {

return (
    <div id={idName} className={ContainerStyle} >
        <h1 className={HeadingStyle}>{Heading}</h1>
        <div className={TransactionStyle}>
            <h3 className={ValueStyle} >{ TransactionName }: {Value}</h3>
        </div>
    </div>
)
}

export default React.memo(Heading);
