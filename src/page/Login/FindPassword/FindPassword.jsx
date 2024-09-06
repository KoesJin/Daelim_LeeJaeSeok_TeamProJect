import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaUser, FaLock, FaKey } from 'react-icons/fa'; // Font Awesome 아이콘 사용
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/LoginPage/FindPassword/FindPassword.module.css';

const FindPassword = () => {
    // 유저 정보
    const [userId, setUserId] = useState(''); // 아이디 상태 추가
    const [userEmail, setUserEmail] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userConPw, setUserConPw] = useState('');

    // 인증번호 변수
    const [verificationCode, setVerificationCode] = useState('');

    // 타이머 변수
    const [time, setTime] = useState(300);
    const [isRunning, setIsRunning] = useState(false);

    // 이메일 입력란 상태
    const [isEmailVisible, setIsEmailVisible] = useState(true);

    // 인증번호 유무 상태
    const [isVerificationVisible, setIsVerificationVisible] = useState(false);

    // 인증번호 입력란 상태
    const [isVerificationTableVisible, setIsVerificationTableVisible] = useState(true);

    // 비밀번호 입력란 상태
    const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

    // useNavigate 훅
    const navigate = useNavigate();

    // 타이머 관리하는 useEffect
    useEffect(() => {
        if (isRunning && time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer); // 타이머 클리어
        }
    }, [isRunning, time]);

    // 타이머 시작
    const startTimer = () => {
        setIsRunning(true);
    };

    // 초 단위의 시간을 `분:초` 형식의 문자열로 변환하는 함수
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // 이메일 인증 함수
    const handleEmaiVerification = (e) => {
        e.preventDefault();

        // 이메일이 존재하는지 확인
        if (!userEmail) {
            alert('이메일을 입력해 주세요.');
            return;
        }

        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(userEmail);

        if (!isValid) {
            alert('유효하지 않은 이메일 형식입니다.');
            return;
        }

        // 타이머 시작 코드 -> 인증코드로 바뀔 예정
        if (!isRunning) {
            // 인증번호 입력란 표시
            alert('인증번호가 발급되었습니다.');

            setIsVerificationVisible(true);
            setIsEmailVisible(false);

            // 타이머 시작
            startTimer();
        }
    };

    // 인증번호 확인 함수
    const handleVerificationConfirm = (e) => {
        e.preventDefault();

        setIsPasswordEnabled(true);
        alert('인증번호가 확인되었습니다.');
        setIsVerificationTableVisible(false);
        setIsRunning(false);
    };

    // 정보 변경 함수
    const handleInfoChange = () => {
        // 이메일이 존재하는지 확인
        if (!userEmail) {
            alert('이메일을 입력해 주세요.');
            return;
        }

        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(userEmail);

        if (!isValid) {
            alert('유효하지 않은 이메일 형식입니다.');
            return;
        }

        // 이메일과 인증번호 인증이 되지 않으면 변경할 수 없습니다.
        alert('정보 변경에 실패하였습니다.');
    };

    // 엔터 키가 눌렸을 때 기본 동작을 막음
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.FindPasswordBody}>
                <div className={styles.container}>
                    <div className={styles.title}>TeacHub</div>
                    <form className={styles.form} onSubmit={handleInfoChange} onKeyPress={handleKeyPress}>
                        {/* 아이디 입력란 */}
                        <div className={styles.inputContainer}>
                            <FaUser />
                            <input
                                type="text"
                                placeholder="아이디"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="25"
                            />
                        </div>

                        {/* 이메일 입력란 */}
                        <div className={styles.inputContainer}>
                            <FaEnvelope />
                            <input
                                type="email"
                                placeholder="이메일"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="25"
                                disabled={!isEmailVisible}
                                style={{
                                    backgroundColor: isEmailVisible ? 'transparent' : '#f0f0f0',
                                }}
                            />
                            {isRunning && time > 0 && <span className={styles.timer}>{formatTime(time)}</span>}
                            <button type="button" className={styles.duplicateButton} onClick={handleEmaiVerification}>
                                인증
                            </button>
                        </div>

                        {/* 인증번호 입력란 */}
                        {isVerificationVisible && (
                            <div className={styles.inputContainer}>
                                <FaKey />
                                <input
                                    type="text"
                                    placeholder="인증번호"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className={styles.signUpInput}
                                    maxLength="6"
                                    disabled={!isVerificationTableVisible}
                                    style={{
                                        backgroundColor: isVerificationTableVisible ? 'transparent' : '#f0f0f0',
                                    }}
                                />
                                <button
                                    type="button"
                                    className={styles.duplicateButton}
                                    onClick={handleVerificationConfirm}
                                >
                                    확인
                                </button>
                            </div>
                        )}

                        {/* 비밀번호 입력란 */}
                        <div className={styles.inputContainer}>
                            <FaLock />
                            <input
                                type="password"
                                placeholder="새 비밀번호"
                                value={userPw}
                                onChange={(e) => setUserPw(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="20"
                                disabled={!isPasswordEnabled} // 인증 완료 전까지 비활성화
                                style={{
                                    backgroundColor: isPasswordEnabled ? 'transparent' : '#f0f0f0',
                                }}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <FaLock />
                            <input
                                type="password"
                                placeholder="새 비밀번호 확인"
                                value={userConPw}
                                onChange={(e) => setUserConPw(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="20"
                                disabled={!isPasswordEnabled} // 인증 완료 전까지 비활성화
                                style={{
                                    backgroundColor: isPasswordEnabled ? 'transparent' : '#f0f0f0',
                                }}
                            />
                        </div>

                        <button className={styles.button}>변경하기</button>
                        <button className={styles.button} onClick={() => navigate('/')}>
                            뒤로가기
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FindPassword;
