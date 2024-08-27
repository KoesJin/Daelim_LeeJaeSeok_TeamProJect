import React, { useState, useEffect } from 'react';
import styles from '../../css/Header/Header.module.css';
import { FaBars, FaComments, FaTimes, FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import ProfileSidebar from '../ProfileSideBar/ProfileSidebar';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    //모달
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [userName, setUserName] = useState('');
    const toggleMenuModal = () => {
        setIsMenuModalOpen(!isMenuModalOpen);
    };

    const closeMenuModal = () => {
        setIsMenuModalOpen(false);
    };

    const toggleChatModal = () => {
        setIsChatModalOpen(!isChatModalOpen);
    };

    const closeChatModal = () => {
        setIsChatModalOpen(false);
        setSelectedChat(null);
    };

    const openChat = (contact) => {
        setSelectedChat(contact);
    };

    const goBack = () => {
        setSelectedChat(null);
    };

    //navigate 훅
    const navigate = useNavigate();

    // userName 가져오는 useEffect 훅
    useEffect(() => {
        // 새로고침 시 localStorage에서 userName를 불러오게함
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    // 로그아웃
    const handleLogout = () => {
        const confirmed = window.confirm('정말로 로그아웃 하시겠습니까?');
        if (confirmed) {
            localStorage.removeItem('Authorization');
            sessionStorage.removeItem('Authorization');
            localStorage.removeItem('PasswordVerAuth');
            sessionStorage.removeItem('PasswordVerAuth');

            localStorage.removeItem('userName');
            localStorage.removeItem('userId');

            navigate('/'); // 메인 페이지로 부드럽게 전환
        }
    };

    return (
        <div className={styles.header}>
            <button onClick={toggleMenuModal} className={styles.headerButton}>
                <FaBars />
            </button>
            <div className={styles.title} onClick={() => navigate('/mainpage')}>
                TeacHub
            </div>
            <div className={styles.chatButtonContainer}>
                <div className={styles.userName}>{userName}님</div>
                <button onClick={toggleChatModal} className={styles.headerButton}>
                    <FaComments style={{ marginBottom: '5px' }} />
                </button>
            </div>
            {/* 메뉴 모달 */}
            <div className={`${styles.modal} ${isMenuModalOpen ? styles.open : ''}`}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h5>로고 위치</h5>
                        <button className={styles.closeButton} onClick={closeMenuModal}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className={styles.modalBody}>
                        <div className={styles.sidebarHeader}>
                            <div className={styles.logo}>목록</div>
                        </div>
                        <ul className={styles.menuList}>
                            <li
                                className={styles.listItem}
                                onClick={() => {
                                    navigate('/studentmanagement');
                                    closeMenuModal();
                                }}
                            >
                                학생 관리
                            </li>
                            <li className={styles.listItem}>AI 문제집</li>
                            <li className={styles.listItem}>시간표</li>
                            <li className={styles.listItem}>투표</li>
                            <li className={styles.listItem}>문자 발송</li>
                            <li className={styles.listItem}>자리 선정</li>
                            <li
                                className={styles.listItem}
                                onClick={() => {
                                    navigate('/checkinfo');
                                    closeMenuModal();
                                }}
                            >
                                내 정보 관리
                            </li>

                            <li className={styles.listItem} onClick={handleLogout}>
                                로그 아웃
                            </li>
                        </ul>
                        <div className={styles.companyInfo}>
                            회사 정보
                            <div className={styles.companyDetails}>
                                여기에는 회사 정보를 입력합니다. 예를 들어, 회사 주소, 연락처, 이메일 등이 들어갈 수
                                있습니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 채팅 목록 모달 */}
            <div className={`${styles.chatModal} ${isChatModalOpen && !selectedChat ? styles.open : ''}`}>
                <div className={styles.chatModalContent}>
                    <div className={styles.modalHeader}>
                        <button className={styles.addButton}>
                            <FaUserPlus />
                        </button>
                        <h5>채팅 목록</h5>
                        <button className={styles.closeButton} onClick={closeChatModal}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className={styles.modalBody}>
                        <ProfileSidebar onSelectContact={openChat} />
                    </div>
                </div>
            </div>
            {/* 개별 채팅 모달 */}
            <div className={`${styles.chatModal} ${selectedChat ? styles.open : ''}`}>
                <div className={styles.chatModalContent}>
                    <div className={styles.modalHeader}>
                        <button className={styles.backButton} onClick={goBack}>
                            <FaArrowLeft />
                        </button>
                        <h5 className={styles.chatTitle}>{selectedChat?.name}</h5>
                        <button className={styles.closeButton} onClick={closeChatModal}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className={styles.modalBody}>
                        <div className={styles.chatWindow}>{/* 채팅 내용이 표시될 부분 */}</div>
                        <input className={styles.chatInput} type="text" placeholder="메시지를 입력하세요..." />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
