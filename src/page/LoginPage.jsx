import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/LoginPage/LoginPage.module.css';
import UserIcon from '../svg/LoginPage/UserIcon';
import PasswordIcon from '../svg/LoginPage/PasswordIcon';
import KakaoIcon from '../svg/LoginPage/KakaoIcon';
import GoogleIcon from '../svg/LoginPage/GoogleIcon';
import NaverIcon from '../svg/LoginPage/NaverIcon';
import AppleIcon from '../svg/LoginPage/AppleIcon';
import { UserContext } from '../utils/context/UserContext';

function LoginPage() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { setUserId: setGlobalUserId } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
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
                body: JSON.stringify({ userId, userPw }), // userIdInput을 userId로 변경
            });

            if (response.ok) {
                const data = await response.json();
                const jwtToken = data.data.accessToken; // 서버로부터 받은 액세스 토큰

                //중복 로그인을 막기위한 코드
                const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
                if (accessToken) {
                    localStorage.removeItem('accessToken');
                    sessionStorage.removeItem('accessToken');
                }

                // JWT 토큰을 로컬 스토리지와 세션 스토리지에 저장
                localStorage.setItem('accessToken', jwtToken);
                sessionStorage.setItem('accessToken', jwtToken);

                //userId를 새로고침해도 남아있게 하기위해 localStorage로 받아옴
                localStorage.setItem('userId', userId);

                setGlobalUserId(userId); // 로그인 성공 시 globalUserId 설정 -> 전역으로 userId 뿌려줌
                navigate('/mainpage');
            } else {
                console.error('로그인 실패:', await response.text());
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.LoginBody}>
                <div className={styles.container}>
                    <h1>TeacHub</h1>

                    <form className={styles.form} onSubmit={handleLogin}>
                        <div className={styles.inputContainer}>
                            <UserIcon />
                            <input
                                type="text"
                                placeholder="아이디"
                                value={userId} //
                                onChange={(e) => setUserId(e.target.value)}
                                className={styles.loginInput}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <PasswordIcon />
                            <input
                                type="password"
                                placeholder="비밀번호"
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
                            />
                            <label htmlFor="rememberMe">아이디 기억하기</label>
                        </div>
                        <button type="submit" className={styles.button}>
                            로그인
                        </button>
                    </form>
                    <div className={styles.links}>
                        <span className={styles.link} onClick={() => navigate('/checksignuppage')}>
                            회원가입
                        </span>{' '}
                        |<span className={styles.link}>계정 찾기</span> |
                        <span className={styles.link}>비밀번호 찾기</span>
                    </div>
                    <div className={styles.socialLoginContainer}>
                        <button className={styles.socialLoginButton}>
                            <KakaoIcon />
                            <span>카카오톡 계정으로 로그인</span>
                        </button>
                        <button className={styles.socialLoginButton}>
                            <GoogleIcon />
                            <span>구글 계정으로 로그인</span>
                        </button>
                        <button className={styles.socialLoginButton}>
                            <NaverIcon />
                            <span>네이버 계정으로 로그인</span>
                        </button>
                        <button className={styles.socialLoginButton}>
                            <AppleIcon />
                            <span>애플 계정으로 로그인</span>
                        </button>
                    </div>
                </div>
                <div className={styles.footer}>
                    <span onClick={() => openModal('terms')}>이용약관</span> |
                    <span onClick={() => openModal('privacy')}>개인정보 처리방침</span> |
                    <span onClick={() => openModal('customer')}>고객센터</span>
                    <div className={styles.corp}>LeeJaeSeok.corp</div>
                </div>

                {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader}>
                                <button className={styles.closeButton} onClick={closeModal}>
                                    x
                                </button>
                            </div>
                            <div className={styles.modalContent}>
                                {modalContent === 'terms' && (
                                    <div>
                                        <h2>이용약관</h2>
                                        <ul>
                                            <li>서비스의 이용에 관한 기본적인 사항을 정합니다.</li>
                                            <li>회원의 의무와 권리를 명확히 규정합니다.</li>
                                            <li>서비스 제공자의 책임을 명시합니다.</li>
                                            <li>회원의 개인정보 보호에 대한 내용을 포함합니다.</li>
                                            <li>서비스 이용 중 발생하는 문제 해결 절차를 안내합니다.</li>
                                        </ul>
                                    </div>
                                )}
                                {modalContent === 'privacy' && (
                                    <div>
                                        <h2>개인정보 처리방침</h2>
                                        <ul>
                                            <li>수집하는 개인정보 항목과 그 목적을 설명합니다.</li>
                                            <li>개인정보의 보유 및 이용 기간을 명시합니다.</li>
                                            <li>개인정보의 제3자 제공에 대한 내용을 포함합니다.</li>
                                            <li>회원의 개인정보 관리 방법을 안내합니다.</li>
                                            <li>개인정보 보호를 위한 기술적/관리적 대책을 설명합니다.</li>
                                        </ul>
                                    </div>
                                )}
                                {modalContent === 'customer' && (
                                    <div>
                                        <h2>고객센터</h2>
                                        <ul>
                                            <li>문의 전화: 123-456-7890</li>
                                            <li>이메일: support@leejaeseok.corp</li>
                                            <li>운영 시간: 평일 9:00 - 18:00</li>
                                            <li>FAQ 페이지에서 자주 묻는 질문을 확인하세요.</li>
                                            <li>1:1 문의 게시판을 통해 문의를 남기실 수 있습니다.</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginPage;
