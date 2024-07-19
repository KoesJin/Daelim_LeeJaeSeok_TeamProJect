import React from 'react';
import '../css/MainPage/MainPage.css';
import { Container, Row, Col, ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import Sidebar from '../components/SideBar/SideBar';

const MainPage = () => {
    return (
        <Container fluid className="main-container">
            <Sidebar />
            <Row className="full-height">
                <Col lg={9} md={9} className="main-content">
                    <div className="header">
                        <div className="school-logo"></div>
                        <div className="school-name">(학교 이름)</div>
                    </div>
                    <div className="content-grid">
                        <div className="content-section">
                            <h2>학생 관리</h2>
                        </div>
                        <div className="content-section">
                            <h2>AI 문제집</h2>
                        </div>
                        <div className="content-section">
                            <h2>시간표</h2>
                        </div>
                        <div className="content-section">
                            <h2>투표</h2>
                        </div>
                        <div className="content-section">
                            <h2>문자 발송</h2>
                        </div>
                        <div className="content-section">
                            <h2>빈칸</h2>
                        </div>
                        <div className="content-section">
                            <h2>빈칸</h2>
                        </div>
                        <div className="content-section">
                            <h2>빈칸</h2>
                        </div>
                        <div className="content-section notice-section">
                            <h2>공지사항</h2>
                            <ul>
                                <li>1. 여긴 공지사항이 들어갈 칸 입니다. </li>
                                <li>2. 여긴 공지사항이 들어갈 칸 입니다.</li>
                                <li>3. 여긴 공지사항이 들어갈 칸 입니다.</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col lg={3} md={3} className="sidebar-right">
                    <div className="profile">
                        <div className="profile-avatar"></div>
                        <div className="profile-info">
                            <div className="profile-name">김진석</div>
                            <div className="profile-status">내 정보</div>
                        </div>
                    </div>
                    <InputGroup className="search-bar">
                        <FormControl placeholder="이름으로 검색" aria-label="Search" className="search-input" />
                        <InputGroup.Text>검색</InputGroup.Text>
                    </InputGroup>
                    <ListGroup className="contact-list">
                        <ListGroup.Item>
                            <div className="contact-item">
                                <div className="contact-avatar"></div>
                                <div className="contact-info">
                                    <div className="contact-name">이하늘 교사</div>
                                    <div className="contact-message">오늘 수업 참 힘드네요</div>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="contact-item">
                                <div className="contact-avatar"></div>
                                <div className="contact-info">
                                    <div className="contact-name">심재휘 교사</div>
                                    <div className="contact-message">담배 마렵네요</div>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="contact-item">
                                <div className="contact-avatar"></div>
                                <div className="contact-info">
                                    <div className="contact-name">김옥지 교사</div>
                                    <div className="contact-message">해윙</div>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="contact-item">
                                <div className="contact-avatar"></div>
                                <div className="contact-info">
                                    <div className="contact-name">곰모띠 교장</div>
                                    <div className="contact-message">수업 끝나고 올라와요</div>
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default MainPage;
