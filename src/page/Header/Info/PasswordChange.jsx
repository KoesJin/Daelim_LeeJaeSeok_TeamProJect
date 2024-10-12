import React, { useEffect, useState } from 'react';
import styles from '../../../css/Header/PasswordChange/PasswordChange.module.css';
import { useNavigate } from 'react-router-dom';

const PasswordChange = () => {
    // 비밀번호 상태 관리
    const [currentPw, setCurrentPw] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userConPw, setUserConPw] = useState('');

    // userId 상태 관리
    const [userId, setUserId] = useState('');

    // useNavigate 훅
    const navigate = useNavigate();

    // userId 가져오는 useEffect 훅
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // 비밀번호 저장 함수
    const handleSaveChanges = async (e) => {
        e.preventDefault();

        // 비밀번호 유효성 검사 (최소 8자, 영어와 숫자 포함, 한글 미포함)
        if (!currentPw) {
            alert('현재 비밀번호를 입력해 주세요.');
            return;
        }

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

        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (userPw !== userConPw) {
            alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        // 앤드포인트
        try {
            let baseURL = '';
            if (process.env.NODE_ENV === 'development') {
                baseURL = 'http://121.139.20.242:8859';
            }

            const bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const pwbearerToken = localStorage.getItem('PasswordVerAuth') || sessionStorage.getItem('PasswordVerAuth');
            if (!pwbearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const response = await fetch(`${baseURL}/api/user/updatePassword?userId=${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: bearerToken,
                    PasswordVerAuth: pwbearerToken,
                },
                body: JSON.stringify({
                    currentPw,
                    userPw,
                    userConPw,
                }),
            });

            const result = await response.json();

            if (result.status === '200') {
                alert(result.message);
                navigate('/mypage');
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('비밀번호를 변경할 수 없습니다.');
        }
    };

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.InfoContainer}>
                <div className={styles.container}>
                    {/* 제목을 h1으로 변경 */}
                    <h1 className={styles.title}>비밀번호 변경</h1>
                    <form className={styles.form} onSubmit={handleSaveChanges}>
                        {/* 현재 비밀번호 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="currentPw" className={styles.label}>
                                현재 비밀번호
                            </label>
                            <input
                                type="password"
                                id="currentPw"
                                placeholder="현재 비밀번호를 입력해주세요"
                                value={currentPw}
                                onChange={(e) => setCurrentPw(e.target.value)}
                                className={styles.inputText}
                            />
                        </div>

                        {/* 새 비밀번호 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="userPw" className={styles.label}>
                                새 비밀번호
                            </label>
                            <input
                                type="password"
                                id="userPw"
                                placeholder="새 비밀번호를 입력해주세요"
                                value={userPw}
                                onChange={(e) => setUserPw(e.target.value)}
                                className={styles.inputText}
                            />
                        </div>

                        {/* 새 비밀번호 확인 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="userConPw" className={styles.label}>
                                새 비밀번호 확인
                            </label>
                            <input
                                type="password"
                                id="userConPw"
                                placeholder="새 비밀번호를 다시 입력해주세요"
                                value={userConPw}
                                onChange={(e) => setUserConPw(e.target.value)}
                                className={styles.inputText}
                            />
                        </div>

                        {/* 변경 사항 저장 버튼 */}
                        <button type="submit" className={styles.saveButton}>
                            변경 사항 저장
                        </button>
                        {/* 뒤로 가기 버튼 */}
                        <button type="button" className={styles.backButton} onClick={() => navigate('/mypage')}>
                            뒤로 가기
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PasswordChange;
