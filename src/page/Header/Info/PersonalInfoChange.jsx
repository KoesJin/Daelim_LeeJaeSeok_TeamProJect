import React, { useEffect, useState } from 'react';
import styles from '../../../css/Header/PersonalInfoChange/PersonalInfoChange.module.css';
import { FaUser, FaPhone, FaCalendarAlt, FaEnvelope, FaSchool, FaChalkboardTeacher } from 'react-icons/fa'; // Font Awesome 아이콘 import
import { useNavigate } from 'react-router-dom';

const PersonalInfoChange = () => {
    // 회원정보
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userNum, setUserNum] = useState('');
    const [userDate, setUserDate] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [classNum, setClassNum] = useState('');

    // userId 가져오는 useEffect 훅
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId && userId !== storedUserId) {
            setUserId(storedUserId);
        }
    }, []); // 한번만 실행

    // userId가 있을시에 handleTakeInfo 실행시키는 useEffect 훅
    useEffect(() => {
        if (userId) {
            handleTakeInfo();
        }
    }, [userId]); // userId가 변경될 때만 handleTakeInfo 실행

    //useNavigate 훅
    const navigate = useNavigate();

    //정보수정 저장 함수
    const handleSaveChanges = async (e) => {
        e.preventDefault();

        // 유효성 검사
        const nameRegex = /^[가-힣]{2,4}$/;
        if (!nameRegex.test(userName)) {
            alert('이름은 2자에서 4자 사이의 한글만 입력 가능합니다.');
            return;
        }

        const phoneRegex = /^010\d{8}$/;
        if (!phoneRegex.test(userNum)) {
            alert('전화번호는 010으로 시작하고, "-"를 제외한 11자리 숫자로만 이루어져야 합니다. 예: 01012345678');
            return;
        }

        const schoolRegex = /^[가-힣]{5,15}$/;
        if (!schoolRegex.test(schoolName)) {
            alert('학교이름은 5자에서 15자 사이의 한글만 입력 가능합니다.');
            return;
        }

        const classRegex = /^\d{1,2}$/;
        if (!classRegex.test(classNum)) {
            alert('반은 1~2자리 숫자로만 이루어져 있어야 합니다.');
            return;
        }

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

            const response = await fetch(`${baseURL}/api/user/update?userId=${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: bearerToken,
                    PasswordVerAuth: pwbearerToken,
                },
                body: JSON.stringify({
                    userName,
                    userNum,
                    schoolName,
                    classNum,
                }),
            });

            const result = await response.json();

            if (result.status === '200') {
                alert(result.message);
                localStorage.setItem('userName', userName);
                window.location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('정보를 변경할 수 없습니다.');
        }
    };

    //회원 정보 불러오는 함수
    const handleTakeInfo = async () => {
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

            const response = await fetch(`${baseURL}/api/user/detail?userId=${userId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: bearerToken,
                },
            });

            const result = await response.json();

            if (result.status === '200') {
                const userData = result.data[0]; // 데이터가 배열로 되어있음
                setUserId(userData.userId);
                setUserName(userData.userRealName);
                setUserNum(userData.userNum);
                setUserDate(userData.userDate);
                setUserEmail(userData.userEmail);
                setSchoolName(userData.schoolName);
                setClassNum(userData.classNum);
            } else {
                alert('회원정보를 불러오지 못하였습니다.');
            }
        } catch (error) {
            alert('회원정보를 불러올 수 없습니다');
        }
    };

    return (
        <div className={styles.PersonalInfoChangeContainer}>
            <div className={styles.container}>
                <h2>개인정보 변경</h2>
                <form className={styles.form} onSubmit={handleSaveChanges}>
                    <div className={styles.inputContainer}>
                        <FaUser className={styles.icon} />
                        <input
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            className={styles.disabledInputField}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaUser className={styles.icon} />
                        <input
                            type="text"
                            placeholder="이름"
                            defaultValue={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={styles.inputField}
                            maxLength={4}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaPhone className={styles.icon} />
                        <input
                            type="text"
                            placeholder="전화번호"
                            defaultValue={userNum}
                            onChange={(e) => setUserNum(e.target.value)}
                            className={styles.inputField}
                            maxLength={11}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaCalendarAlt className={styles.icon} />
                        <input
                            type="date"
                            placeholder="생년월일"
                            value={userDate}
                            className={styles.disabledInputField}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaEnvelope className={styles.icon} />
                        <input
                            type="email"
                            placeholder="이메일"
                            value={userEmail}
                            className={styles.disabledInputField}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaSchool className={styles.icon} />
                        <input
                            type="text"
                            placeholder="학교명"
                            defaultValue={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className={styles.inputField}
                            maxLength={15}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaChalkboardTeacher className={styles.icon} />
                        <input
                            type="text"
                            placeholder="반"
                            defaultValue={classNum}
                            onChange={(e) => setClassNum(e.target.value)}
                            className={styles.inputField}
                            maxLength={2}
                        />
                    </div>
                    <button type="submit" className={styles.saveButton}>
                        변경 사항 저장
                    </button>
                    <button
                        type="button"
                        className={styles.saveButton}
                        onClick={() => {
                            navigate('/mypage');
                        }}
                    >
                        뒤로가기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PersonalInfoChange;
