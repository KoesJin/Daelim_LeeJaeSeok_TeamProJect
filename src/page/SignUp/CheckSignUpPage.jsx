import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/SignUpPage/CheckSignUpPage/CheckSignUpPage.module.css'; // CSS 모듈 import
import AppleIcon from '../../svg/LoginPage/AppleIcon';
import GoogleIcon from '../../svg/LoginPage/GoogleIcon';
import NaverIcon from '../../svg/LoginPage/NaverIcon';
import EmailIcon from '../../svg/SignUpPage/EmailIcon';

function CheckSignUpPage() {
    // useNavigate 훅
    const navigate = useNavigate();

    const handleSignUpWithEmail = () => {
        navigate('/signuppage');
    };

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.SignUpBody}>
                <div className={styles.container}>
                    <div className={styles.welcomeMessage}>
                        <h1>TeacHub</h1>
                        <p>TeacHub 회원가입 방식을 선택해 주세요.</p>
                    </div>
                    <div className={styles.signupOptions}>
                        <button className={styles.optionButton} onClick={handleSignUpWithEmail}>
                            <EmailIcon className={styles.icon} />
                            <div>
                                <span className={styles.mainText}>TeacHub 회원가입</span>
                                <span className={styles.subText}>아이디와 비밀번호로 TeacHub 회원가입</span>
                            </div>
                        </button>
                        <button className={styles.optionButton}>
                            <GoogleIcon className={styles.icon} />
                            <div>
                                <span className={styles.mainText}>Google로 회원가입</span>
                                <span className={styles.subText}>구글로 인증하여 TeacHub 회원가입</span>
                            </div>
                        </button>
                        <button className={styles.optionButton}>
                            <NaverIcon className={styles.icon} />
                            <div>
                                <span className={styles.mainText}>Naver로 회원가입</span>
                                <span className={styles.subText}>네이버로 인증하여 TeacHub 회원가입</span>
                            </div>
                        </button>
                        <button className={styles.optionButton}>
                            <AppleIcon className={styles.icon} />
                            <div>
                                <span className={styles.mainText}>Apple로 회원가입</span>
                                <span className={styles.subText}>애플로 인증하여 TeacHub 회원가입</span>
                            </div>
                        </button>
                        <button className={styles.backButton} onClick={() => navigate('/')}>
                            <div>
                                <span className={styles.mainText}>뒤로가기</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckSignUpPage;
