import React from 'react';
import { Link } from 'react-router-dom';

const VotePage = () => {
    return (
        <>
            <div>임시 투표 페이지</div>
            <div>
                <Link to="/mainpage">뒤로가기</Link>
            </div>
        </>
    );
};

export default VotePage;
