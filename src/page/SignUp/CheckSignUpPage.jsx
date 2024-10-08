import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/SignUpPage/CheckSignUpPage/CheckSignUpPage.module.css';

// 이미지 및 아이콘 import
import MainLogo from '../../img/TeacHub.png';
import AppleLogo from '../../img/AppleLogo.png';
import GoogleLogo from '../../img/GoogleLogo.png';
import NaverLogo from '../../img/NaverLogo.png';
import TeachCong from '../../svg/CheckSignUpPage/TeachCong';

function CheckSignUpPage() {
    const navigate = useNavigate();

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.CheckSignUpBody}>
                <img src={MainLogo} alt="TeacHub Logo" className={styles.mainLogo} />

                <p className={styles.title}>
                    <span className={styles.titleBold}>회원가입 방식</span>
                    <span className={styles.titleRegular}>을 선택해주세요!</span>
                </p>

                <div className={styles.optionsWrapper}>
                    {/* TeacHub Option */}
                    {/* TeacHub Option */}
                    <div className={`${styles.optionContainer} ${styles.teachHubOption}`}>
                        <p className={styles.optionTitle}>
                            <span>TeacHub</span>
                            <br />
                            <span>회원가입</span>
                        </p>
                        <p className={styles.subText}>이메일 및 비밀번호로 회원가입</p> {/* 서브 텍스트 추가 */}
                        <TeachCong className={styles.teachCongLogo} onDragStart={(e) => e.preventDefault()} />
                        <button
                            className={styles.signUpButton}
                            onClick={() => navigate('/signuppage')}
                            onTouchEnd={() => navigate('/signuppage')} // 모바일에서 터치 시 작동하도록 추가
                        >
                            가입하기
                        </button>
                    </div>

                    {/* Google Option */}
                    <div className={styles.optionContainer}>
                        <p className={styles.optionTitle}>
                            <span>Google</span>
                            <br />
                            <span>회원가입</span>
                        </p>
                        <p className={styles.subText}>Google 계정으로 간편하게 가입</p> {/* 서브 텍스트 추가 */}
                        <img
                            src={GoogleLogo}
                            alt="Google Logo"
                            className={styles.GoogleLogo}
                            onDragStart={(e) => e.preventDefault()}
                        />
                        <button className={styles.signUpButton} onClick={() => alert('준비중입니다.')}>
                            가입하기
                        </button>
                    </div>

                    {/* Naver Option */}
                    <div className={styles.optionContainer}>
                        <p className={styles.optionTitle}>
                            <span>Naver</span>
                            <br />
                            <span>회원가입</span>
                        </p>
                        <p className={styles.subText}>Naver 계정으로 간편하게 가입</p> {/* 서브 텍스트 추가 */}
                        <img
                            src={NaverLogo}
                            alt="Naver Logo"
                            className={styles.NaverLogo}
                            onDragStart={(e) => e.preventDefault()}
                        />
                        <button className={styles.signUpButton} onClick={() => alert('준비중입니다.')}>
                            가입하기
                        </button>
                    </div>

                    {/* Apple Option */}
                    <div className={styles.optionContainer}>
                        <p className={styles.optionTitle}>
                            <span>Apple</span>
                            <br />
                            <span>회원가입</span>
                        </p>
                        <p className={styles.subText}>Apple 계정으로 간편하게 가입</p> {/* 서브 텍스트 추가 */}
                        <img
                            src={AppleLogo}
                            alt="Apple Logo"
                            className={styles.appleLogo}
                            onDragStart={(e) => e.preventDefault()}
                        />
                        <button className={styles.signUpButton} onClick={() => alert('준비중입니다.')}>
                            가입하기
                        </button>
                    </div>
                </div>
                <div className={styles.backButton} onClick={() => navigate('/')}>
                    <p className={styles.backButtonText}>뒤로가기</p>
                </div>
            </div>
        </div>
    );
}

export default CheckSignUpPage;
