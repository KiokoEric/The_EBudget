import React from 'react';

interface TextAreaProps {
    Value?:any;
    Change?: any;
    Label: string;
    error?: string;
    inputStyle: string;
    LabelStyle: string;
    Placeholder?: string;
    ContainerStyle: string;
}

const TextArea: React.FC<TextAreaProps> = ({ ContainerStyle, Label, LabelStyle, Placeholder, inputStyle, Value, Change }) => {

return (
    <div className={ContainerStyle}>
        <label className={LabelStyle}>{Label}</label>
        <textarea placeholder={Placeholder} className={inputStyle} value={Value} onChange={Change} />
    </div>
)
}

export default React.memo(TextArea) 
