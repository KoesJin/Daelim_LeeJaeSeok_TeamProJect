import React, { useEffect, useState } from 'react';
import styles from '../css/ChangeInformation/CheckInformation.module.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CheckInformation = () => {
    //로그인 정보
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    // navigate 훅
    const navigate = useNavigate();

    // userId 가져오는 useEffect 훅
    useEffect(() => {
        // 새로고침 시 localStorage에서 userName를 불러오게함
        const storedUserName = localStorage.getItem('userId');
        if (storedUserName) {
            setUserId(storedUserName);
        }
    }, []);

    // 정보 확인 함수
    const handleCkeckPw = async (e) => {
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
                alert('회원 정보 확인되었습니다.');
                navigate('/mainpage');
            } else {
                alert('비밀번호가 일치하지 않습니다');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

    return (
        <div className={styles.CheckInformationContainer}>
            <div className={styles.container}>
                <h2>정보 확인</h2>
                <form>
                    <div className={styles.inputContainer}>
                        <FaUser className={styles.icon} />
                        <div className={styles.userName}>{userId}</div>
                    </div>
                    <div className={styles.inputContainer}>
                        <FaLock className={styles.icon} />
                        <input
                            type="password"
                            className={styles.CheckInformationInput}
                            onChange={(e) => setUserPw(e.target.value)}
                            placeholder="비밀번호"
                        />
                    </div>
                    <button className={styles.saveButton} onClick={handleCkeckPw}>
                        확인
                    </button>
                </form>
                <button className={styles.cancelButton} onClick={() => navigate('/mainpage')}>
                    뒤로가기
                </button>
            </div>
        </div>
    );
};

export default CheckInformation;
