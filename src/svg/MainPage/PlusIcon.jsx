import React from 'react';

const PlusIcon = ({ className }) => {
    return (
        <svg className={className} width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            {/* 세로 막대 */}
            <rect x="13.5" y="1" width="3" height="28" rx="1.5" fill="#30a04d" />
            {/* 가로 막대 */}
            <rect x="1" y="13.5" width="28" height="3" rx="1.5" fill="#30a04d" />
        </svg>
    );
};

export default PlusIcon;
