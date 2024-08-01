import React from 'react';
import { Link } from 'react-router-dom';

const StudentManagementPage = () => {
    return (
        <>
            <div>임시 학생 관리 페이지</div>
            <div>
                <Link to="/mainpage">뒤로가기</Link>
            </div>
        </>
    );
};

export default StudentManagementPage;
