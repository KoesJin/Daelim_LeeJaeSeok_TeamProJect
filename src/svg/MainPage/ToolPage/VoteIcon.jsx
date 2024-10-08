import React from 'react';

const VoteIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        {/* SVG 내용 */}
        <circle cx="32" cy="32" r="30" stroke="#30a04d" strokeWidth="4" fill="none" />
        <rect x="20" y="24" width="24" height="16" fill="#30a04d" />
    </svg>
);

export default VoteIcon;
