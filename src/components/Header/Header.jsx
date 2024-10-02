import React, { useEffect, useState } from 'react';
import styles from '../../css/Header/Header.module.css';
import ChatIcon from '../../svg/MainPage/Chat/ChatIcon';
import MainTitle from '../../img/TeacHub.png';
import MenuIcon from '../../svg/MainPage/MenuIcon';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Header = () => {
    //모달
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [userName, setUserName] = useState('');

    // 메뉴 모달
    const toggleMenuModal = () => {
        setIsMenuModalOpen(!isMenuModalOpen);
    };

    const closeMenuModal = () => {
        setIsMenuModalOpen(false);
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
        <div className={styles.container}>
            {/* 좌측 메뉴 아이콘 */}
            <div className={styles.leftSection}>
                <div onClick={toggleMenuModal}>
                    <MenuIcon className={styles.menuIcon} />
                </div>
                <div className={`${styles.modal} ${isMenuModalOpen ? styles.open : ''}`}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <img src={MainTitle} alt="MainTitle" className={styles.menuLogo} />
                            <button className={styles.closeButton} onClick={closeMenuModal}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
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
                                <div className={styles.companyDetails}>
                                    TeacHub는 교육 기술 솔루션을 통해 전 세계 교육자와 학생들에게 보다 나은 학습 환경을
                                    제공합니다. 저희의 목표는 인공지능과 빅데이터를 활용하여 교육의 모든 측면에서 혁신을
                                    이루는 것입니다.
                                    <br />
                                    <br />
                                    <strong>주소:</strong> 경기도 안양시 동안구 임곡로 29
                                    <br />
                                    <strong>연락처:</strong> 010-2479-9363
                                    <br />
                                    <strong>이메일:</strong> lovesky00317@brtech.co.kr
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 중앙 타이틀 */}
            <div className={styles.centerSection}>
                <img
                    src={MainTitle}
                    alt="MainTitle"
                    className={styles.mainTitle}
                    onClick={() => navigate('/mainpage')}
                />
            </div>

            {/* 우측 이름 및 채팅 아이콘 */}
            <div className={styles.rightSection}>
                <div className={styles.teacherInfo}>
                    <span className={styles.teacherName}>{userName}</span>
                    <span className={styles.teacherTitle}>선생님</span>
                </div>
                <ChatIcon className={styles.ChatIcon} />
            </div>
        </div>
    );
};

export default Header;
