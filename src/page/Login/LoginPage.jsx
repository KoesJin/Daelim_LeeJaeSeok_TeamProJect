import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/LoginPage/LoginPage.module.css';
import { FaUser, FaLock } from 'react-icons/fa';

// 이미지 및 아이콘 import
import MainTitle from '../../img/TeacHub.png';
// import KakaoIcon from '../../svg/LoginPage/KakaoIcon';
import GoogleIcon from '../../svg/LoginPage/GoogleIcon';
import NaverIcon from '../../svg/LoginPage/NaverIcon';
import AppleIcon from '../../svg/LoginPage/AppleIcon';

function LoginPage() {
    // 로그인 정보 상태 관리
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // 페이지 이동을 위한 navigate 훅
    const navigate = useNavigate();

    // 로그인 함수
    const handleLogin = async (e) => {
        e.preventDefault();

        // 유효성 검사
        if (!userId && !userPw) {
            alert('아이디 또는 비밀번호를 입력하세요.');
            return;
        } else if (!userId) {
            alert('아이디를 입력하세요.');
            return;
        } else if (!userPw) {
            alert('비밀번호를 입력하세요.');
            return;
        }

        try {
            let baseURL = '';
            if (process.env.NODE_ENV === 'development') {
                baseURL = 'http://121.139.20.242:8859';
            }

            const response = await fetch(`${baseURL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ userId, userPw }),
            });

            const result = await response.json();

            if (result.status === '200') {
                const jwtToken = result.data.jwtToken.accessToken; // 서버로부터 받은 액세스 토큰
                const jslName = result.data.userName; // userName 받아옴

                // 중복 로그인을 막기 위한 코드
                const existingToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
                if (existingToken) {
                    localStorage.removeItem('Authorization');
                    sessionStorage.removeItem('Authorization');
                }

                // 'Bearer ' 접두사를 추가하여 JWT 토큰을 로컬 스토리지와 세션 스토리지에 저장
                const bearerToken = `Bearer ${jwtToken}`;
                localStorage.setItem('Authorization', bearerToken);
                sessionStorage.setItem('Authorization', bearerToken);

                // userId 설정
                localStorage.setItem('userId', userId);
                // userName 설정
                localStorage.setItem('userName', jslName);

                navigate('/mainpage');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.LoginBody}>
                <div className={styles.container}>
                    {/* 메인 로고 */}
                    <img src={MainTitle} alt="TeacHub" className={styles.mainLogo} />

                    {/* 로그인 폼 */}
                    <form className={styles.form} onSubmit={handleLogin}>
                        <div className={styles.inputContainer}>
                            <FaUser className={styles.icon} /> {/* 아이디 아이콘 */}
                            <input
                                type="text"
                                placeholder="아이디를 입력해주세요"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className={styles.loginInput}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <FaLock className={styles.icon} /> {/* 비밀번호 아이콘 */}
                            <input
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                value={userPw}
                                onChange={(e) => setUserPw(e.target.value)}
                                className={styles.loginInput}
                            />
                        </div>
                        <div className={styles.rememberMeContainer}>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className={styles.checkbox}
                            />
                            <label htmlFor="rememberMe" className={styles.rememberMeLabel}>
                                아이디 기억하기
                            </label>
                        </div>
                        <button type="submit" className={styles.loginButton}>
                            로그인
                        </button>
                    </form>

                    {/* 링크들 */}
                    <div className={styles.links}>
                        <span className={styles.link} onClick={() => navigate('/checkfindid')}>
                            아이디 찾기
                        </span>
                        <span className={styles.separator}>|</span>
                        <span className={styles.link} onClick={() => navigate('/checkfindpassword')}>
                            비밀번호 찾기
                        </span>
                        <span className={styles.separator}>|</span>
                        <span className={styles.link} onClick={() => navigate('/checksignuppage')}>
                            회원가입
                        </span>
                    </div>

                    {/* 구분선 */}
                    <div className={styles.divider}></div>

                    {/* 소셜 로그인 제목 (480px 이하에서만 보임) */}
                    <div className={styles.socialLoginTitle}>소셜 로그인 하기</div>

                    {/* 소셜 로그인 버튼들 */}
                    <div className={styles.socialLoginContainer}>
                        {/* <button className={styles.socialLoginButton} data-label="카카오톡">
                            <KakaoIcon className={styles.socialIcon} />
                            <span className={styles.socialText} onClick={() => alert('준비중입니다.')}>
                                카카오 계정으로 로그인
                            </span>
                        </button> */}
                        <button className={styles.socialLoginButton} data-label="구글">
                            <GoogleIcon className={styles.socialIcon} />
                            <span className={styles.socialText} onClick={() => alert('준비중입니다.')}>
                                구글 계정으로 로그인
                            </span>
                        </button>
                        <button className={styles.socialLoginButton} data-label="네이버">
                            <NaverIcon className={styles.socialIcon} />
                            <span className={styles.socialText} onClick={() => alert('준비중입니다.')}>
                                네이버 계정으로 로그인
                            </span>
                        </button>
                        <button className={styles.socialLoginButton} data-label="애플">
                            <AppleIcon className={styles.socialIcon} />
                            <span className={styles.socialText} onClick={() => alert('준비중입니다.')}>
                                애플 계정으로 로그인
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
