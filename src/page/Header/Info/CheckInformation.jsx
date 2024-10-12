import React, { useEffect, useState } from 'react';
import styles from '../../../css/Header/CheckInformation/CheckInformation.module.css';
import { useNavigate } from 'react-router-dom';

const CheckInformation = () => {
    // 로그인 정보 상태 관리
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    // navigate 훅
    const navigate = useNavigate();

    // userId 가져오는 useEffect 훅
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // 정보 확인 함수
    const handleCheckPw = async (e) => {
        e.preventDefault();

        if (!userPw) {
            alert('비밀번호를 입력하세요.');
            return;
        }

        try {
            let baseURL = '';
            if (process.env.NODE_ENV === 'development') {
                baseURL = 'http://121.139.20.242:8859';
            }

            // /user 포함된 앤드포인트에 사용
            const bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const response = await fetch(`${baseURL}/api/user/confirmPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: bearerToken, // /user 포함된 앤드포인트에 사용
                },
                body: JSON.stringify({ userId, userPw }),
            });

            const result = await response.json();

            if (result.status === '200') {
                // JWT 토큰 설정
                const jwtToken = result.data.accessPwToken;

                // 'Bearer ' 접두사를 추가하여 JWT 토큰을 로컬 스토리지와 세션 스토리지에 저장
                const passwordAuthToken = `Bearer ${jwtToken}`;
                localStorage.setItem('PasswordVerAuth', passwordAuthToken);
                sessionStorage.setItem('PasswordVerAuth', passwordAuthToken);

                alert(result.message);
                navigate('/mypage');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error confirming password:', error);
            alert('비밀번호가 잘못되었습니다.');
        }
    };

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.checkInfoContainer}>
                <div className={styles.container}>
                    {/* 제목을 h1으로 변경 */}
                    <h1 className={styles.title}>정보 확인</h1>
                    <form onSubmit={handleCheckPw} className={styles.form}>
                        {/* 아이디 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="userId" className={styles.label}>
                                아이디
                            </label>
                            <input
                                type="text"
                                id="userId"
                                value={userId}
                                placeholder="아이디를 입력해주세요"
                                className={styles.inputField}
                                disabled
                            />
                        </div>

                        {/* 비밀번호 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="userPw" className={styles.label}>
                                비밀번호
                            </label>
                            <input
                                type="password"
                                id="userPw"
                                value={userPw}
                                onChange={(e) => setUserPw(e.target.value)}
                                placeholder="비밀번호를 입력해주세요"
                                className={styles.inputField}
                            />
                        </div>

                        {/* 확인 버튼 */}
                        <button type="submit" className={styles.saveButton}>
                            확인
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckInformation;
