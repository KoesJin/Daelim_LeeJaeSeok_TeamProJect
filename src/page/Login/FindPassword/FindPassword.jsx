import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/LoginPage/FindPassword/FindPassword.module.css'; // CSS 모듈 import
import MainTitle from '../../../img/TeacHub.png'; // 메인 로고 이미지 import

function FindPassword() {
    // 회원가입 정보
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userConPw, setUserConPw] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // 인증번호
    const [inputCode, setInputCode] = useState('');

    // 인증번호 요청 상태
    const [isCodeSent, setIsCodeSent] = useState(false);

    // 이메일 인증 완료 상태
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    // navigate 훅
    const navigate = useNavigate();

    // baseURL 설정
    let baseURL = '';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://121.139.20.242:8859';
    }

    // 이메일 인증 함수
    const handleCheckuserEmail = async (e) => {
        e.preventDefault();

        // 이메일이 비어있는지 확인
        if (!userEmail) {
            alert('이메일을 입력해 주세요.');
            return;
        }

        try {
            // 이메일 인증 요청
            const response = await fetch(`${baseURL}/api/user/sendEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                    userId,
                }),
            });

            // 응답 결과 처리
            const result = await response.json();
            console.log(result);

            if (result.status === '200') {
                alert(result.message);
                setIsCodeSent(true); // 인증번호 입력란 활성화
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('이메일 인증 도중 오류 발생:', error);
            alert('이메일 인증 도중 오류가 발생했습니다.');
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
            // 인증코드 확인 요청
            const response = await fetch(`${baseURL}/api/user/verificationEmailCode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    userEmail,
                    inputCode,
                }),
            });

            // 응답 결과 처리
            const result = await response.json();
            console.log(result);

            if (result.status === '200') {
                const jwtToken = result.data.accessEmailToken;

                // JWT 토큰을 로컬 및 세션 스토리지에 저장
                const bearerToken = `Bearer ${jwtToken}`;
                localStorage.setItem('EmailVerAuth', bearerToken);
                sessionStorage.setItem('EmailVerAuth', bearerToken);

                alert(result.message);
                setIsEmailVerified(true);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('인증코드 인증 도중 오류 발생:', error);
            alert('인증코드 인증 도중 오류가 발생했습니다.');
        }
    };

    // 비밀번호 변경 함수
    const handleFindPassword = async (e) => {
        e.preventDefault();

        // 비밀번호 유효성 검사
        if (!userPw) {
            alert('새 비밀번호를 입력해 주세요.');
            return;
        }

        if (!userConPw) {
            alert('새 비밀번호 확인을 입력해 주세요.');
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+~`|}{[\]:;?\/><.,]{8,}$/;
        const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        if (!passwordRegex.test(userPw)) {
            alert('비밀번호는 최소 8자 이상이어야 하며, 영어와 숫자를 포함해야 합니다.');
            return;
        }

        if (koreanRegex.test(userPw)) {
            alert('비밀번호에 한글은 포함될 수 없습니다.');
            return;
        }

        // 비밀번호 확인
        if (userPw !== userConPw) {
            alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        try {
            // 이메일 검증 토큰 확인
            const EmailbearerToken = localStorage.getItem('EmailVerAuth') || sessionStorage.getItem('EmailVerAuth');
            if (!EmailbearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            // 비밀번호 변경 요청
            const response = await fetch(`${baseURL}/api/user/findPassword`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    EmailVerAuth: EmailbearerToken,
                },
                body: JSON.stringify({
                    userId,
                    userPw,
                    userConPw,
                }),
            });

            const result = await response.json();

            if (result.status === '200') {
                alert(result.message);
                navigate('/');
                localStorage.removeItem('EmailVerAuth');
                sessionStorage.removeItem('EmailVerAuth');
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('비밀번호를 변경할 수 없습니다.');
        }
    };

    // 엔터 키 입력 막기
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <div className={styles.container} onKeyDown={handleKeyPress}>
            {/* 로고 이미지 */}
            <img src={MainTitle} alt="TeacHub 로고" className={styles.logo} />

            {/* 안내문구 */}
            <p className={styles.instructionText}>비밀번호를 찾기 위한 아이디와 메일 주소를 입력해주세요.</p>

            <form onSubmit={handleFindPassword} className={styles.form}>
                {/* 아이디 입력 필드 */}
                <div className={styles.formGroup}>
                    <label htmlFor="userId" className={styles.label}>
                        아이디
                    </label>
                    <input
                        type="text"
                        id="userId"
                        placeholder="아이디를 입력해주세요"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className={styles.inputText}
                        maxLength="20"
                        disabled={isEmailVerified}
                    />
                </div>

                {/* 이메일 입력 필드 */}
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        이메일
                    </label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="email"
                            id="email"
                            placeholder="이메일 주소를 입력해주세요"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className={styles.inputTextWithButton}
                            maxLength="25"
                            disabled={isEmailVerified}
                        />
                        {!isEmailVerified && (
                            <button type="button" onClick={handleCheckuserEmail} className={styles.verifyButtonInside}>
                                인증하기
                            </button>
                        )}
                    </div>
                </div>

                {/* 인증번호 입력칸 및 인증 버튼 */}
                {isCodeSent && (
                    <div className={styles.formGroup}>
                        <label htmlFor="inputCode" className={styles.label}>
                            인증번호
                        </label>
                        <div className={styles.inputWithButton}>
                            <input
                                type="text"
                                id="inputCode"
                                placeholder="인증번호 입력"
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value)}
                                className={styles.inputTextWithButton}
                                disabled={isEmailVerified}
                            />
                            {!isEmailVerified && (
                                <button type="button" onClick={handleVerifyCode} className={styles.verifyButtonInside}>
                                    인증
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* 이메일 인증 완료 메시지 */}
                {isEmailVerified && <p className={styles.successMessage}>이메일 인증이 완료되었습니다.</p>}

                {/* 새 비밀번호 입력 필드 */}
                {isEmailVerified && (
                    <>
                        <div className={styles.formGroup}>
                            <label htmlFor="userPw" className={styles.label}>
                                새 비밀번호
                            </label>
                            <input
                                type="password"
                                id="userPw"
                                placeholder="새 비밀번호"
                                value={userPw}
                                onChange={(e) => setUserPw(e.target.value)}
                                className={styles.inputText}
                                maxLength="20"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="userConPw" className={styles.label}>
                                새 비밀번호 확인
                            </label>
                            <input
                                type="password"
                                id="userConPw"
                                placeholder="새 비밀번호 확인"
                                value={userConPw}
                                onChange={(e) => setUserConPw(e.target.value)}
                                className={styles.inputText}
                                maxLength="20"
                            />
                            <button type="submit" className={styles.changeButton}>
                                변경하기
                            </button>
                        </div>
                    </>
                )}
            </form>

            {/* 뒤로가기 버튼 */}
            <button type="button" onClick={() => navigate('/')} className={styles.backButton}>
                뒤로가기
            </button>
        </div>
    );
}

export default FindPassword;
