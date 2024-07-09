import React from 'react';

interface ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    Children?: any;
    ButtonText: string;
    ButtonStyle: string;
}

const Button: React.FC<ButtonProps> = ({ Children, ButtonText, ButtonStyle, onClick }) => {
return (
    <div onClick={onClick} className={ButtonStyle}> {Children} { ButtonText }</div>
)
}

export default React.memo(Button);