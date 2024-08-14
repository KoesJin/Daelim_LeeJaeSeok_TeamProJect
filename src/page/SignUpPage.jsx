import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/SignUpPage/SignUpPage.module.css'; // CSS 모듈 import
import UserIcon from '../svg/SignUpPage/UserIcon'; // User 아이콘 import
import EmailIcon from '../svg/SignUpPage/EmailIcon'; // Email 아이콘 import
import PasswordIcon from '../svg/SignUpPage/PasswordIcon'; // Password 아이콘 import
import PhoneIcon from '../svg/SignUpPage/PhoneIcon'; // Phone 아이콘 import
import DateIcon from '../svg/SignUpPage/DateIcon'; // Date 아이콘 import
import SchoolIcon from '../svg/SignUpPage/SchoolIcon'; // School 아이콘 import
import ClassIcon from '../svg/SignUpPage/ClassIcon'; // Class 아이콘 import

function SignUpPage() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userConPw, setUserConPw] = useState('');
    const [userName, setUserName] = useState('');
    const [userNum, setUserNum] = useState('');
    const [userDate, setUserDate] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [classNum, setClassNum] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert('아이디를 입력하세요.');
            return;
        }
        if (!userPw) {
            alert('비밀번호를 입력하세요.');
            return;
        }
        if (userPw !== userConPw) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!userName) {
            alert('이름을 입력하세요.');
            return;
        }
        if (!userNum) {
            alert('전화번호를 입력하세요.');
            return;
        }
        if (!userDate) {
            alert('생년월일을 입력하세요.');
            return;
        }
        if (!userEmail) {
            alert('이메일을 입력하세요.');
            return;
        }
        if (!schoolName) {
            alert('학교명을 입력하세요.');
            return;
        }
        if (!classNum) {
            alert('반을 입력하세요.');
            return;
        }

        // 회원가입 로직

        try {
            let baseURL = '';
            if (process.env.NODE_ENV === 'development') {
                baseURL = 'http://121.139.20.242:8859';
            }

            const response = await fetch(`${baseURL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    userPw,
                    userConPw,
                    userName,
                    userNum,
                    userDate,
                    userEmail,
                    schoolName,
                    classNum,
                }),
            });
            if (response.ok) {
                navigate('/'); // 회원가입 성공 시 로그인 페이지로 이동
                alert('회원 생성이 완료되었습니다.');
            } else {
                alert('회원가입 실패');
            }
        } catch (error) {
            alert('회원가입에 실패하였습니다.');
        }
    };

    return (
        <div className={styles.SignUpBody}>
            <div className={styles.logo}>
                <h1>TeacHub</h1>
            </div>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSignUp}>
                    <div className={styles.inputContainer}>
                        <UserIcon />
                        <input
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className={styles.signUpInput}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <PasswordIcon />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={userPw}
                            onChange={(e) => setUserPw(e.target.value)}
                            className={styles.signUpInput}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <PasswordIcon />
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={userConPw}
                            onChange={(e) => setUserConPw(e.target.value)}
                            className={styles.signUpInput}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <UserIcon />
                        <input
                            type="text"
                            placeholder="이름"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={styles.signUpInput}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <PhoneIcon />
                        <input
                            type="text"
                            placeholder="전화번호"
                            value={userNum}
                            onChange={(e) => setUserNum(e.target.value)}
                            className={styles.signUpInput}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <DateIcon />
                        <input
                            type="date"
                            placeholder="생년월일"
                            value={userDate}
                            onChange={(e) => setUserDate(e.target.value)}
                            className={styles.signUpInput}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <EmailIcon />
                        <input
                            type="email"
                            placeholder="이메일"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className={styles.signUpInput}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <SchoolIcon />
                        <input
                            type="text"
                            placeholder="학교명"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className={styles.signUpInput}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <ClassIcon />
                        <input
                            type="text"
                            placeholder="반"
                            value={classNum}
                            onChange={(e) => setClassNum(e.target.value)}
                            className={styles.signUpInput}
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        회원가입
                    </button>
                </form>
                <div className={styles.button}>
                    <span className={styles.link} onClick={() => navigate('/')}>
                        로그인
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
