import React from 'react';

function EmailIcon({ className }) {
    return (
        <svg
            className={className}
            width="180"
            height="250"
            viewBox="0 0 180 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="14"
                y="34"
                width="150"
                height="100"
                rx="10"
                ry="10"
                stroke="#4CAF50"
                strokeWidth="10"
                fill="white"
            />

            {/* 경로 좌표를 조정하여 튀어나오는 문제 해결 */}
            <path d="M20 40 L90 85 L160 40" stroke="#4CAF50" strokeWidth="10" fill="none" />
        </svg>
    );
}

export default EmailIcon;
