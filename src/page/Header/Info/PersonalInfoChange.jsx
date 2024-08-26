import React, { useEffect, useState } from 'react';
import styles from '../../../css/Header/PersonalInfoChange/PersonalInfoChange.module.css';
import UserIcon from '../../../svg/SignUpPage/UserIcon';
import PhoneIcon from '../../../svg/SignUpPage/PhoneIcon';
import DateIcon from '../../../svg/SignUpPage/DateIcon';
import EmailIcon from '../../../svg/SignUpPage/EmailIcon';
import SchoolIcon from '../../../svg/SignUpPage/SchoolIcon';
import ClassIcon from '../../../svg/SignUpPage/ClassIcon';
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

    // userId 가져오는 useEffect 훅 -> 앤드포인트에서 useId가 있어야만 detail이 가져와지기 떄문
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

        // 이름 유효성 검사
        // 전화번호가 비어있는지 확인
        if (!userName) {
            alert('이름을 입력해 주세요.');
            return;
        }
        const nameRegex = /^[가-힣]{2,5}$/;
        if (!nameRegex.test(userName)) {
            alert('이름은 2자에서 5자 사이의 한글만 입력 가능합니다.');
            return;
        }

        // 전화번호 유효성 검사
        // 전화번호가 비어있는지 확인
        if (!userNum) {
            alert('전화번호를 입력해 주세요.');
            return;
        }

        // // 전화번호가 11자리이며, 숫자로만 이루어져 있는지 확인
        const phoneRegex = /^010\d{8}$/;
        if (!phoneRegex.test(userNum)) {
            alert('전화번호는 010으로 시작하고, "-"를 제외한 11자리 숫자로만 이루어져야 합니다. 예: 01012345678');
            return;
        }

        // 학교명 유효성 검사
        // 학교명이 비어있는지 확인
        if (!schoolName) {
            alert('학교 이름을 입력해 주세요.');
            return;
        }

        const schoolRegex = /^[가-힣]{5,15}$/;
        if (!schoolRegex.test(schoolName)) {
            alert('학교이름은 5자에서 15자 사이의 한글만 입력 가능합니다.');
            return;
        }

        // 반 유효성 검사
        // 반이 비어있는지 확인
        if (!classNum) {
            alert('반을 입력해 주세요.');
            return;
        }

        const classRegex = /^\d{1,2}$/;
        if (!classRegex.test(classNum)) {
            alert('반은 1~2자리 숫자로만 이루어져 있어야 합니다.');
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

            // /user/update, /user/updatepassword 포함된 앤드포인트에 사용 해야함
            const pwbearerToken = localStorage.getItem('PasswordVerAuth') || sessionStorage.getItem('PasswordVerAuth');
            if (!pwbearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const response = await fetch(`${baseURL}/api/user/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: bearerToken, // /user 포함된 앤드포인트에 사용 해야함
                    PasswordVerAuth: pwbearerToken, // /user/update, /user/updatepassword 포함된 앤드포인트에 사용 해야함
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
                // Header에 있는 userName localStorage를 변경해주기 위해 사용
                localStorage.setItem('userName', userName);
                // Header에 있는 userName이 바로 변경되지 않아 사용
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
                        <UserIcon />
                        <input
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            className={styles.disabledInputField}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <UserIcon />
                        <input
                            type="text"
                            placeholder="이름"
                            defaultValue={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <PhoneIcon />
                        <input
                            type="text"
                            placeholder="전화번호"
                            defaultValue={userNum}
                            onChange={(e) => setUserNum(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <DateIcon />
                        <input
                            type="date"
                            placeholder="생년월일"
                            value={userDate}
                            className={styles.disabledInputField}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <EmailIcon />
                        <input
                            type="email"
                            placeholder="이메일"
                            value={userEmail}
                            className={styles.disabledInputField}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <SchoolIcon />
                        <input
                            type="text"
                            placeholder="학교명"
                            defaultValue={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <ClassIcon />
                        <input
                            type="text"
                            placeholder="반"
                            defaultValue={classNum}
                            onChange={(e) => setClassNum(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                    <button type="submit" className={styles.saveButton}>
                        변경 사항 저장
                    </button>
                    <button
                        type="button"
                        className={styles.saveButton}
                        onClick={() => {
                            navigate('/setting');
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
