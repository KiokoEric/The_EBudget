import React from 'react';

interface InputProps {
    ContainerStyle: string;
    Label: string;
    LabelStyle: string,
    Type: string;
    Placeholder?: string;
    inputStyle: string;
}

const Input: React.FC<InputProps> = ({ ContainerStyle, Label, LabelStyle, Type, Placeholder, inputStyle }) => {

return (
    <div className={ContainerStyle}>
        <label className={LabelStyle}>{Label}</label>
        <input type={Type} placeholder={Placeholder} className={inputStyle} />
    </div>
)
}

export default React.memo(Input)

