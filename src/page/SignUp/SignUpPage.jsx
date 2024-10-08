import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/SignUpPage/SignUpPage.module.css'; // CSS 모듈 import
import MainLogo from '../../img/TeacHub.png'; // 로고 이미지 import

function SignUpPage() {
    const navigate = useNavigate();

    // 회원가입 정보
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userConPw, setUserConPw] = useState('');
    const [userName, setUserName] = useState('');
    const [userNum, setUserNum] = useState('');
    const [userDate, setUserDate] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [classNum, setClassNum] = useState('');

    // 인증 상태
    const [idDuplicateChecked, setIdDuplicateChecked] = useState(false);
    const [numDuplicateChecked, setNumDuplicateChecked] = useState(false);
    const [emailDuplicateChecked, setEmailDuplicateChecked] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [inputCode, setInputCode] = useState('');

    // BaseURL 설정
    let baseURL = '';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://121.139.20.242:8859';
    }

    // 아이디 중복 체크 함수
    const handleCheckuserId = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert('아이디를 입력해 주세요.');
            return;
        }
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(userId)) {
            alert('아이디는 영어와 숫자만 사용할 수 있습니다.');
            return;
        }
        // 서버로 아이디 중복 체크 요청
        try {
            const response = await fetch(`${baseURL}/api/user/checkId`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            const result = await response.json();
            if (result.status === '200') {
                alert(result.message);
                setIdDuplicateChecked(true);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('아이디 중복 체크 오류:', error);
        }
    };

    // 전화번호 중복 체크 함수
    const handleCheckuserNum = async (e) => {
        e.preventDefault();
        const phoneRegex = /^010\d{8}$/;
        if (!phoneRegex.test(userNum)) {
            alert('전화번호는 010으로 시작하고 11자리여야 합니다.');
            return;
        }
        try {
            const response = await fetch(`${baseURL}/api/user/checkNum/${userNum}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.status === '200') {
                alert(result.message);
                setNumDuplicateChecked(true);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('전화번호 중복 체크 오류:', error);
        }
    };

    // 이메일 인증 함수
    const handleCheckuserEmail = async (e) => {
        e.preventDefault();
        if (!userEmail) {
            alert('이메일을 입력해 주세요.');
            return;
        }
        try {
            const response = await fetch(`${baseURL}/api/user/checkEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail }),
            });
            const result = await response.json();
            if (result.status === '200') {
                alert(result.message);
                setEmailDuplicateChecked(true);
                setIsCodeSent(true); // 인증번호 입력란 활성화
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('이메일 인증 오류:', error);
        }
    };

    // 이메일 인증번호 확인 함수
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        if (!inputCode) {
            alert('인증번호를 입력해 주세요.');
            return;
        }
        try {
            const response = await fetch(`${baseURL}/api/user/verificationSignUpEmailCode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail, inputCode }),
            });
            const result = await response.json();
            if (result.status === '200') {
                alert(result.message);
                setIsEmailVerified(true);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('인증코드 확인 오류:', error);
        }
    };

    // 회원가입 제출 함수
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!userId || !userPw || !userConPw || !userName || !userNum || !userEmail || !schoolName || !classNum) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }
        if (!idDuplicateChecked || !numDuplicateChecked || !emailDuplicateChecked || !isEmailVerified) {
            alert('모든 중복 확인 및 인증을 완료해 주세요.');
            return;
        }
        if (userPw !== userConPw) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const response = await fetch(`${baseURL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    userPw,
                    userName,
                    userNum,
                    userDate,
                    userEmail,
                    schoolName,
                    classNum,
                }),
            });
            const result = await response.json();
            if (result.status === '200') {
                alert('회원가입 완료');
                navigate('/');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
        }
    };

    return (
        <div className={styles.container}>
            <img src={MainLogo} alt="TeacHub Logo" className={styles.logo} />

            <form className={styles.form} onSubmit={handleSignUp}>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className={styles.inputField}
                        maxLength={20} // 아이디 최대 20자
                    />
                    <button type="button" className={styles.checkButton} onClick={handleCheckuserId}>
                        중복 확인
                    </button>
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                        className={styles.inputField}
                        maxLength={20} // 비밀번호 최대 20자
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={userConPw}
                        onChange={(e) => setUserConPw(e.target.value)}
                        className={styles.inputField}
                        maxLength={20} // 비밀번호 확인 최대 20자
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="이름"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={styles.inputField}
                        maxLength={5} // 이름 최대 5자
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="전화번호"
                        value={userNum}
                        onChange={(e) => setUserNum(e.target.value)}
                        className={styles.inputField}
                        maxLength={11} // 전화번호 최대 11자 (010-1234-5678)
                    />
                    <button type="button" className={styles.checkButton} onClick={handleCheckuserNum}>
                        중복 확인
                    </button>
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="date"
                        placeholder="생년월일"
                        value={userDate}
                        onChange={(e) => setUserDate(e.target.value)}
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="email"
                        placeholder="이메일"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className={styles.inputField}
                        maxLength={25} // 이메일 최대 25자
                        disabled={isEmailVerified}
                    />
                    {!isEmailVerified && (
                        <button type="button" className={styles.checkButton} onClick={handleCheckuserEmail}>
                            인증하기
                        </button>
                    )}
                </div>

                {isCodeSent && (
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="인증번호"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            className={styles.inputField}
                            maxLength={6} // 인증번호 최대 6자
                        />
                        <button type="button" className={styles.checkButton} onClick={handleVerifyCode}>
                            인증
                        </button>
                    </div>
                )}

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="학교명"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className={styles.inputField}
                        maxLength={15} // 학교명 최대 15자
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="반"
                        value={classNum}
                        onChange={(e) => setClassNum(e.target.value)}
                        className={styles.inputField}
                        maxLength={2} // 반 최대 2자
                    />
                </div>

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.signUpButton}>
                        회원가입
                    </button>
                    <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
                        뒤로가기
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUpPage;
