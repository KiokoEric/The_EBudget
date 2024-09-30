import React from 'react';

interface ModalProps {
    children?: any;
    isOpen: boolean;
    formStyle: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, formStyle }) => {
    if (!isOpen) {
        return null;
    }
return (
    <div className={formStyle}>
        { children }
    </div>
)
}

export default React.memo(Modal);
