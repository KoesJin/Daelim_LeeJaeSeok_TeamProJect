/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styles from '../../../css/Header/PersonalInfoChange/PersonalInfoChange.module.css';
import { useNavigate } from 'react-router-dom';

const PersonalInfoChange = () => {
    // 회원정보 상태 관리
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userNum, setUserNum] = useState('');
    const [userDate, setUserDate] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [grade, setGrade] = useState();
    const [classNum, setClassNum] = useState('');

    // userId 가져오는 useEffect 훅
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId && userId !== storedUserId) {
            setUserId(storedUserId);
        }
    }, []); // 한번만 실행

    // userId가 있을 시 정보 가져오기
    useEffect(() => {
        if (userId) {
            handleTakeInfo();
        }
    }, [userId]);

    const navigate = useNavigate();

    // 정보수정 저장 함수
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

        const gradeRegex = /^\d{1,2}$/;
        if (!gradeRegex.test(classNum)) {
            alert('학년은 1~99의 숫자로만 이루어져 있어야 합니다.');
            return;
        }

        const classRegex = /^\d{1,2}$/;
        if (!classRegex.test(classNum)) {
            alert('반은 1~99의 숫자로만 이루어져 있어야 합니다.');
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

    // 회원 정보 불러오는 함수
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
                // setUserId(userData.userId);
                setUserName(userData.userRealName);
                setUserNum(userData.userNum);
                setUserDate(userData.userDate);
                setUserEmail(userData.userEmail);
                setSchoolName(userData.schoolName);
                setGrade(userData.grade);
                setClassNum(userData.classNum);
            } else {
                alert('회원정보를 불러오지 못하였습니다.');
            }
        } catch (error) {
            alert('회원정보를 불러올 수 없습니다');
        }
    };

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.InfoContainer}>
                <div className={styles.container}>
                    <h1 className={styles.title}>개인정보 변경</h1>
                    <form className={styles.form} onSubmit={handleSaveChanges}>
                        {/* 아이디 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="userId" className={styles.label}>
                                아이디
                            </label>
                            <input
                                type="text"
                                id="userId"
                                placeholder="아이디"
                                value={userId}
                                className={styles.disabledInputField}
                                disabled
                            />
                        </div>

                        {/* 이름 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="userName" className={styles.label}>
                                이름
                            </label>
                            <input
                                type="text"
                                id="userName"
                                placeholder="이름을 입력해주세요"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className={styles.inputText}
                                maxLength={4}
                            />
                        </div>

                        {/* 전화번호 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="userNum" className={styles.label}>
                                전화번호
                            </label>
                            <input
                                type="text"
                                id="userNum"
                                placeholder="전화번호를 입력해주세요"
                                value={userNum}
                                onChange={(e) => setUserNum(e.target.value)}
                                className={styles.inputText}
                                maxLength={11}
                            />
                        </div>

                        {/* 생년월일 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="userDate" className={styles.label}>
                                생년월일
                            </label>
                            <input
                                type="date"
                                id="userDate"
                                placeholder="생년월일"
                                value={userDate}
                                className={styles.disabledInputField}
                                disabled
                            />
                        </div>

                        {/* 이메일 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="userEmail" className={styles.label}>
                                이메일
                            </label>
                            <input
                                type="email"
                                id="userEmail"
                                placeholder="이메일을 입력해주세요"
                                value={userEmail}
                                className={styles.disabledInputField}
                                disabled
                            />
                        </div>

                        {/* 학교명 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="schoolName" className={styles.label}>
                                학교명
                            </label>
                            <input
                                type="text"
                                id="schoolName"
                                placeholder="학교명을 입력해주세요"
                                value={schoolName}
                                onChange={(e) => setSchoolName(e.target.value)}
                                className={styles.inputText}
                                maxLength={15}
                            />
                        </div>

                        {/* 학년 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="grade" className={styles.label}>
                                담당 학년
                            </label>
                            <input
                                type="text"
                                placeholder="학년"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                className={styles.inputText}
                                maxLength={2} // 학년 최대 2자
                            />
                        </div>

                        {/* 반 입력 필드 */}
                        <div className={styles.formGroup}>
                            <label htmlFor="classNum" className={styles.label}>
                                담당 반
                            </label>
                            <input
                                type="text"
                                id="classNum"
                                placeholder="반을 입력해주세요"
                                value={classNum}
                                onChange={(e) => setClassNum(e.target.value)}
                                className={styles.inputText}
                                maxLength={2}
                            />
                        </div>

                        {/* 변경 사항 저장 버튼 */}
                        <button type="submit" className={styles.saveButton}>
                            변경 사항 저장
                        </button>

                        {/* 뒤로가기 버튼 */}
                        <button type="button" className={styles.backButton} onClick={() => navigate('/mypage')}>
                            뒤로가기
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoChange;
