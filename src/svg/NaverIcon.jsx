import React from 'react';

const NaverLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" ry="4" fill="url(#grad)" />
        <text x="12" y="16" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">
            N
        </text>
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#00E676', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#00C853', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
    </svg>
);

export default NaverLogo;
