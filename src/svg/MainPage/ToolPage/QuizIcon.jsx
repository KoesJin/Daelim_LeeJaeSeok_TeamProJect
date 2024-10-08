import React from 'react';

const QuizIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        {/* SVG 내용 */}
        <circle cx="32" cy="32" r="30" stroke="#30a04d" strokeWidth="4" fill="none" />
        <text x="32" y="40" textAnchor="middle" fontSize="28" fill="#30a04d">
            ?
        </text>
    </svg>
);

export default QuizIcon;
