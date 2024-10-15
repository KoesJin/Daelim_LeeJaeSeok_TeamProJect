import React from 'react';
import { useNavigate } from 'react-router-dom';
//FindPw css 와 동일하기 때문에 중복 사용
import styles from '../../../css/LoginPage/FindPassword/CheckFindPw.module.css';

// 이미지 및 아이콘 import
import MainLogo from '../../../img/TeacHub.png';
import PhoneIcon from '../../../svg/LoginPage/CheckFindPw/PhoneVerificationIcon';
import EmailIcon from '../../../svg/LoginPage/CheckFindPw/EmailVerificationIcon';

function CheckFindId() {
    const navigate = useNavigate();

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.CheckFindPwBody}>
                <img src={MainLogo} alt="TeacHub Logo" className={styles.mainLogo} />

                <p className={styles.title}>
                    <span className={styles.titleBold}>아이디 찾기 방식</span>
                    <span className={styles.titleRegular}>을 선택해주세요!</span>
                </p>

                <div className={styles.optionsWrapper}>
                    {/* 전화번호 인증 옵션 */}
                    <div className={styles.optionContainer}>
                        <p className={styles.optionTitle}>
                            <span>전화번호</span>
                            <br />
                            <span>인증</span>
                        </p>
                        <p className={styles.subText}>등록된 전화번호로 아이디 찾기</p>
                        <PhoneIcon className={styles.optionIcon} onDragStart={(e) => e.preventDefault()} />
                        <button
                            className={styles.signUpButton}
                            // onClick={() => alert('준비중입니다.')}
                            onClick={() => navigate('/findid-phone')}
                        >
                            인증하기
                        </button>
                    </div>

                    {/* 이메일 인증 옵션 */}
                    <div className={styles.optionContainer}>
                        <p className={styles.optionTitle}>
                            <span>이메일</span>
                            <br />
                            <span>인증</span>
                        </p>
                        <p className={styles.subText}>등록된 이메일로 아이디 찾기</p>
                        <EmailIcon className={styles.optionIcon} onDragStart={(e) => e.preventDefault()} />
                        <button className={styles.signUpButton} onClick={() => navigate('/findid-email')}>
                            인증하기
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

export default CheckFindId;
