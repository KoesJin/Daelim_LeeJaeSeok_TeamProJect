import React from 'react';
import { Link } from 'react-router-dom';

const SendMessagePage = () => {
    return (
        <>
            <div>임시 문자 발송 페이지</div>
            <div>
                <Link to="/mainpage">뒤로가기</Link>
            </div>
        </>
    );
};

export default SendMessagePage;
