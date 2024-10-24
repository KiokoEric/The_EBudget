import React from 'react';
import { Link } from 'react-router-dom';

interface NavigateProps {
    onClick?:any
    children?: any;
    Navigation?: any;
    NavigateText?: string;
    NavigateStyle?: string;
}

const Navigate: React.FC<NavigateProps> = ({ Navigation, NavigateStyle, children, NavigateText, onClick }) => {
return (
    <Link to={Navigation} className={NavigateStyle} onClick={onClick}>
        { children }
        { NavigateText }
    </Link>
)
}

export default React.memo(Navigate)
