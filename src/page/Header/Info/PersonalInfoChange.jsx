import React, { useEffect, useState } from 'react';
import styles from '../../../css/Header/PersonalInfoChange/PersonalInfoChange.module.css';
import UserIcon from '../../../svg/SignUpPage/UserIcon';
import PasswordIcon from '../../../svg/LoginPage/PasswordIcon';
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

    //모달
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setNewValue('');
        setPassword('');
    };

    const handleModalSubmit = () => {
        // 모달창 제출 로직 추가 (예: 서버에 업데이트 요청)
        closeModal();
    };

    //새로운 값 , 비밀번호
    const [newValue, setNewValue] = useState('');
    const [password, setPassword] = useState('');

    //useNavigate 훅
    const navigate = useNavigate();

    //정보수정 저장 함수
    const handleSaveChanges = async (e) => {
        // 변경 사항 저장 로직 추가
    };

    //회원 정보 불러오는 함수
    const handleTakeInfo = async (e) => {
        try {
            let baseURL = '';
            if (process.env.NODE_ENV === 'development') {
                baseURL = 'http://121.139.20.242:8859';
            }

            const response = await fetch(`${baseURL}/api/user/detail?userId=${userId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
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

    const getIcon = () => {
        switch (modalType) {
            case 'name':
                return <UserIcon />;
            case 'phone':
                return <PhoneIcon />;
            case 'school':
                return <SchoolIcon />;
            case 'class':
                return <ClassIcon />;
            default:
                return null;
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
                            onChange={(e) => setUserId(e.target.value)}
                            className={styles.inputField}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <UserIcon />
                        <input
                            type="text"
                            placeholder="이름"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={styles.inputField}
                            disabled
                        />
                        <button type="button" className={styles.changeButton} onClick={() => openModal('name')}>
                            변경
                        </button>
                    </div>
                    <div className={styles.inputContainer}>
                        <PhoneIcon />
                        <input
                            type="text"
                            placeholder="전화번호"
                            value={userNum}
                            onChange={(e) => setUserNum(e.target.value)}
                            className={styles.inputField}
                            disabled
                        />
                        <button type="button" className={styles.changeButton} onClick={() => openModal('phone')}>
                            변경
                        </button>
                    </div>
                    <div className={styles.inputContainer}>
                        <DateIcon />
                        <input
                            type="date"
                            placeholder="생년월일"
                            value={userDate}
                            onChange={(e) => setUserDate(e.target.value)}
                            className={styles.inputField}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <EmailIcon />
                        <input
                            type="email"
                            placeholder="이메일"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className={styles.inputField}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <SchoolIcon />
                        <input
                            type="text"
                            placeholder="학교명"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className={styles.inputField}
                            disabled
                        />
                        <button type="button" className={styles.changeButton} onClick={() => openModal('school')}>
                            변경
                        </button>
                    </div>
                    <div className={styles.inputContainer}>
                        <ClassIcon />
                        <input
                            type="text"
                            placeholder="반"
                            value={classNum}
                            onChange={(e) => setClassNum(e.target.value)}
                            className={styles.inputField}
                            disabled
                        />
                        <button type="button" className={styles.changeButton} onClick={() => openModal('class')}>
                            변경
                        </button>
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

                {modalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <button className={styles.closeButton} onClick={closeModal}>
                                &times;
                            </button>
                            <h3>{`변경할 ${
                                modalType === 'phone'
                                    ? '전화번호'
                                    : modalType === 'name'
                                    ? '이름'
                                    : modalType === 'school'
                                    ? '학교명'
                                    : '반'
                            }`}</h3>
                            <div className={styles.inputContainer}>
                                {getIcon()}
                                <input
                                    type="text"
                                    placeholder={`변경할 ${
                                        modalType === 'phone'
                                            ? '전화번호'
                                            : modalType === 'name'
                                            ? '이름'
                                            : modalType === 'school'
                                            ? '학교명'
                                            : '반'
                                    }`}
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <PasswordIcon />
                                <input
                                    type="password"
                                    placeholder="비밀번호"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <button className={styles.saveButton} onClick={handleModalSubmit}>
                                확인
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonalInfoChange;
