import React from 'react';

const NoticeIcon = ({ className }) => {
    return (
        <svg
            className={className}
            width="30"
            height="32"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <ellipse cx="16" cy="16.5" rx="16" ry="16.5" fill="#30A04D" />
            <circle cx="12" cy="15" r="3" fill="white" />
            <circle cx="19" cy="15" r="3" fill="white" />
            <circle cx="18.5" cy="14.5" r="1.5" fill="#242424" />
            <circle cx="12.5" cy="14.5" r="1.5" fill="#242424" />
            <ellipse cx="16" cy="19.5" rx="2" ry="1.5" fill="#FFF8BD" />
        </svg>
    );
};

export default NoticeIcon;
