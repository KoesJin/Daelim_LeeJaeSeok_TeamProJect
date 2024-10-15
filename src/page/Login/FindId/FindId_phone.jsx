import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//FindPw css 와 동일하기 때문에 중복 사용
import styles from '../../../css/LoginPage/FindPassword/FindPassword.module.css';
import MainTitle from '../../../img/TeacHub.png'; // 메인 로고 이미지 import

function FindId_phone() {
    // 회원가입 정보

    const [userNum, setUserNum] = useState('');

    // navigate 훅
    const navigate = useNavigate();

    // baseURL 설정
    let baseURL = '';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://121.139.20.242:8859';
    }

    // 아이디 찾기 함수
    const handleFindId = async (e) => {
        // 전화번호가 비어있는지 확인
        if (!userNum) {
            alert('전화번호를 입력해 주세요.');
            return;
        }

        // 전화번호가 11자리이며, 숫자로만 이루어져 있는지 확인
        const phoneRegex = /^010\d{8}$/;
        if (!phoneRegex.test(userNum)) {
            alert('전화번호는 010으로 시작하고, "-"를 제외한 11자리 숫자로만 이루어져야 합니다. 예: 01012345678');
            return;
        }

        e.preventDefault();

        try {
            // 이메일 인증 요청
            const response = await fetch(`${baseURL}/api/user/findUserIdBySmsCode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    userNum,
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
            <p className={styles.instructionText}>아이디를 찾기 위한 전화번호를 입력해주세요.</p>

            <form className={styles.form}>
                {/* 이메일 입력 필드 */}
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        전화번호
                    </label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="email"
                            placeholder="전화번호를 입력해주세요"
                            value={userNum}
                            onChange={(e) => setUserNum(e.target.value)}
                            className={styles.inputTextWithButton}
                            maxLength="11"
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

export default FindId_phone;
