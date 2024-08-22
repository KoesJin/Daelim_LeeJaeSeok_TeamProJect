import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaBook, FaCalendarAlt, FaVoteYea, FaEnvelope, FaChair } from 'react-icons/fa';
import schoolLogo from '../../img/schoolLogo.jpg'; // 로고 이미지 import
import '../../css/MainPage/MainPage.css'; // 스타일 import

const MainPage = () => {
    const navigate = useNavigate();

    //MainPage에서 accessToken값이 세션과 , 로컬에 없으면 /로 튕기게 하는 코드
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/');
        }
    }, [navigate]);
    return (
        <>
            <Container fluid className="main-container">
                <Row className="full-height">
                    <Col className="main-content">
                        <div className="header">
                            <img src={schoolLogo} alt="School Logo" className="school-logo" /> {/* 로고 이미지 적용 */}
                            <div className="school-name">성보중학교</div>
                        </div>
                        <div className="content-grid">
                            <Link to="/student-management" className="content-section">
                                <FaUserGraduate className="icon-large" />
                                <h2 className="title-large">학생 관리</h2>
                            </Link>
                            <Link to="/ai-workbook" className="content-section">
                                <FaBook className="icon-large" />
                                <h2 className="title-large">AI 문제집</h2>
                            </Link>
                            <Link to="/schedule" className="content-section">
                                <FaCalendarAlt className="icon-large" />
                                <h2 className="title-large">시간표</h2>
                            </Link>
                            <Link to="/vote" className="content-section">
                                <FaVoteYea className="icon-large" />
                                <h2 className="title-large">투표</h2>
                            </Link>
                            <Link to="/send-message" className="content-section">
                                <FaEnvelope className="icon-large" />
                                <h2 className="title-large">문자 발송</h2>
                            </Link>
                            <Link to="/seat-assignment" className="content-section">
                                <FaChair className="icon-large" />
                                <h2 className="title-large">자리 선정</h2>
                            </Link>
                            <div className="content-section">
                                <h2 className="title-large">빈칸</h2>
                            </div>
                            <div className="content-section">
                                <h2 className="title-large">빈칸</h2>
                            </div>
                        </div>
                        <div className="notice-section">
                            <h2>공지사항</h2>
                            <ul>
                                <li>1. 여긴 공지사항이 들어갈 칸 입니다. </li>
                                <li>2. 여긴 공지사항이 들어갈 칸 입니다.</li>
                                <li>3. 여긴 공지사항이 들어갈 칸 입니다.</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MainPage;
