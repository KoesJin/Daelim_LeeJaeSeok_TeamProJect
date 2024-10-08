import React from 'react';

const LadderIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        {/* SVG 내용 */}
        <rect x="26" y="8" width="12" height="48" fill="#30a04d" />
        <rect x="20" y="16" width="24" height="4" fill="#30a04d" />
        <rect x="20" y="32" width="24" height="4" fill="#30a04d" />
        <rect x="20" y="48" width="24" height="4" fill="#30a04d" />
    </svg>
);

export default LadderIcon;
