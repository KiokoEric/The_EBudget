import React from 'react';
interface InputProps {
    Value?:any;
    type?: any;
    Change?: any;
    Label: string;
    error?: string;
    Children?: any;
    TextStyle?: string;
    inputStyle: string;
    LabelStyle: string;
    Placeholder?: string;
    ContainerStyle: string;
}

const Input: React.FC<InputProps> = ({ ContainerStyle, type, Children, Label, LabelStyle, Placeholder, inputStyle, Value, Change, TextStyle}) => {

return (
    <div className={ContainerStyle}>
        <label className={LabelStyle}>{Label}</label>
        <div className={TextStyle}>
            <input type={type} placeholder={Placeholder} className={inputStyle} value={Value} onChange={Change} />
            {Children}
        </div>
    </div>
)
}

export default React.memo(Input)

