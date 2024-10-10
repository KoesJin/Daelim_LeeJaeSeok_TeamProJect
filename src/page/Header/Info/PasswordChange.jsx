import React, { useEffect, useState } from 'react';
import styles from '../../../css/Header/PasswordChange/PasswordChange.module.css';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PasswordChange = () => {
    // 비밀번호 , 변경할 비밀번호 , 변경할 비밀번호 확인 정보
    const [currentPw, setCurrentPw] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userConPw, setUserConPw] = useState('');

    // 앤드포인트의 userId 받아오기 위한 정보
    const [userId, setUserId] = useState('');

    //useNavigate 훅
    const navigate = useNavigate();

    // userId 가져오는 useEffect 훅
    useEffect(() => {
        // 새로고침 시에도 localStorage에서 userName를 불러오게함
        const storedUserName = localStorage.getItem('userId');
        if (storedUserName) {
            setUserId(storedUserName);
        }
    }, []);

    //비밀번호 저장 함수
    const handleSaveChanges = async (e) => {
        e.preventDefault();

        // 비밀번호 유효성 검사 (최소 8자, 영어와 숫자 포함, 한글 미포함)

        if (!currentPw) {
            alert('비밀번호를 입력해 주세요.');
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

        //앤드포인트
        try {
            let baseURL = '';
            if (process.env.NODE_ENV === 'development') {
                baseURL = 'http://121.139.20.242:8859';
            }

            // /user 포함된 앤드포인트에 사용 해야함
            const bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            // /user/delete ,/user/update, /user/updatepassword 포함된 앤드포인트에 사용 해야함
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
                    Authorization: bearerToken, // /user 포함된 앤드포인트에 사용 해야함
                    PasswordVerAuth: pwbearerToken, // /user/delete ,/user/update, /user/updatepassword 포함된 앤드포인트에 사용 해야함
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
                navigate('/setting');
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('정보를 변경할 수 없습니다.');
        }
    };

    return (
        <div className={styles.PasswordChangeContainer}>
            <div className={styles.container}>
                <h2>비밀번호 변경</h2>
                <form onSubmit={handleSaveChanges}>
                    <div className={styles.inputContainer}>
                        <FaLock className={styles.icon} />
                        <input
                            type="password"
                            className={styles.inputField}
                            placeholder="비밀번호"
                            value={currentPw}
                            onChange={(e) => setCurrentPw(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaLock className={styles.icon} />
                        <input
                            type="password"
                            className={styles.inputField}
                            placeholder="새 비밀번호"
                            value={userPw}
                            onChange={(e) => setUserPw(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaLock className={styles.icon} />
                        <input
                            type="password"
                            className={styles.inputField}
                            placeholder="새 비밀번호 확인"
                            value={userConPw}
                            onChange={(e) => setUserConPw(e.target.value)}
                        />
                    </div>
                    <button className={styles.saveButton}>변경 사항 저장</button>
                </form>
                <button className={styles.saveButton} onClick={() => navigate('/setting')}>
                    뒤로 가기
                </button>
            </div>
        </div>
    );
};

export default PasswordChange;
