import React from 'react';
import { Link } from 'react-router-dom';

const SchedulePage = () => {
    return (
        <>
            <div>임시 시간표 페이지</div>
            <div>
                <Link to="/mainpage">뒤로가기</Link>
            </div>
        </>
    );
};

export default SchedulePage;
