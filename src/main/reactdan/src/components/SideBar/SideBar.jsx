import React, { useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../../css/SideBar/SideBar.css'; // Sidebar 스타일 임포트

const SideBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <Button
                className="menu-button"
                onClick={toggleMenu}
                style={{
                    background: 'none',
                    border: 'none',
                    padding: '10px',
                    zIndex: 1000,
                    position: 'absolute',
                    top: '15px',
                    left: '10px',
                }}
            >
                {menuOpen ? <FaTimes color="black" size={30} /> : <FaBars color="black" size={30} />}
            </Button>
            <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">(우리 로고)</div>
                </div>
                <ListGroup variant="flush" className="menu-list">
                    <ListGroup.Item>학생 관리</ListGroup.Item>
                    <ListGroup.Item>AI 문제집</ListGroup.Item>
                    <ListGroup.Item>시간표</ListGroup.Item>
                    <ListGroup.Item>투표</ListGroup.Item>
                    <ListGroup.Item>문자 발송</ListGroup.Item>
                    <ListGroup.Item className="empty-item">빈칸</ListGroup.Item>
                    <ListGroup.Item className="empty-item">빈칸</ListGroup.Item>
                    <ListGroup.Item className="empty-item">빈칸</ListGroup.Item>
                </ListGroup>
                <div className="separator"></div>
                <div className="company-info">
                    회사 정보
                    <div className="company-details">
                        여기에는 회사 정보를 입력합니다. 예를 들어, 회사 주소, 연락처, 이메일 등이 들어갈 수 있습니다.
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
