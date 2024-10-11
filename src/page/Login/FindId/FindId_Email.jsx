import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//FindPw css 와 동일하기 때문에 중복 사용
import styles from '../../../css/LoginPage/FindPassword/FindPassword.module.css';
import MainTitle from '../../../img/TeacHub.png'; // 메인 로고 이미지 import

function FindId_email() {
    // 회원가입 정보

    const [userEmail, setUserEmail] = useState('');

    // navigate 훅
    const navigate = useNavigate();

    // baseURL 설정
    let baseURL = '';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://121.139.20.242:8859';
    }

    // 아이디 찾기 함수
    const handleFindId = async (e) => {
        if (!userEmail) {
            alert('이메일을 입력해 주세요.');
            return;
        }

        // 이메일 유효성 검사 정규식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 이메일 유효성 검사
        if (!emailRegex.test(userEmail)) {
            alert('유효한 이메일 주소를 입력해 주세요.');
            return;
        }
        e.preventDefault();

        try {
            // 이메일 인증 요청
            const response = await fetch(`${baseURL}/api/user/findUserIdByUserEmailCode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                }),
            });

            // 응답 결과 처리
            const result = await response.json();
            console.log(result);

            if (result.status === '200') {
                alert(result.message);
                navigate('/');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('이메일 인증 도중 오류 발생:', error);
            alert('아이디 찾기 도중 오류가 발생했습니다.');
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
            <p className={styles.instructionText}>아이디를 찾기 위한 메일 주소를 입력해주세요.</p>

            <form className={styles.form}>
                {/* 이메일 입력 필드 */}
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        이메일
                    </label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="email"
                            placeholder="이메일 주소를 입력해주세요"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className={styles.inputTextWithButton}
                            maxLength="25"
                        />
                        <button type="button" onClick={handleFindId} className={styles.verifyButtonInside}>
                            인증하기
                        </button>
                    </div>
                </div>
            </form>

            {/* 뒤로가기 버튼 */}
            <button type="button" onClick={() => navigate('/checkfindid')} className={styles.backButton}>
                뒤로가기
            </button>
        </div>
    );
}

export default FindId_email;
