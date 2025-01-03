import React, { useEffect, useState } from 'react';
import styles from '../../../css/Header/MyPage/MyPage.module.css';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    // 회원 정보
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    // userId 가져오기
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // useNavigate 훅
    const navigate = useNavigate();

    // 모달창
    const [showModal, setShowModal] = useState(false);
    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // 체크박스 상태 관리
    const [isChecked, setIsChecked] = useState(false);

    // 회원정보 삭제 함수
    const handleConfirmDelete = async (e) => {
        e.preventDefault();

        // 비밀번호 빈칸 체크 확인
        if (!userPw) {
            alert('비밀번호를 입력해 주세요.');
            return;
        }

        // 동의 버튼 체크 유무 확인
        if (!isChecked) {
            alert('탈퇴를 위해 동의 버튼을 눌러주세요.');
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

            // // /user/delete ,/user/update, /user/updatepassword 포함된 앤드포인트에 사용 해야함
            const pwbearerToken = localStorage.getItem('PasswordVerAuth') || sessionStorage.getItem('PasswordVerAuth');
            if (!pwbearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const response = await fetch(`${baseURL}/api/user/delete?userId=${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: bearerToken, // /user 포함된 앤드포인트에 사용 해야함
                    PasswordVerAuth: pwbearerToken, // /user/delete ,/user/update, /user/updatepassword 포함된 앤드포인트에 사용 해야함
                },
                body: JSON.stringify({
                    userPw,
                }),
            });

            const result = await response.json();

            if (result.status === '200') {
                alert(result.message);
                navigate('/');

                localStorage.removeItem('Authorization');
                sessionStorage.removeItem('Authorization');
                localStorage.removeItem('PasswordVerAuth');
                sessionStorage.removeItem('PasswordVerAuth');
                localStorage.removeItem('userName');
                localStorage.removeItem('userId');
                localStorage.removeItem('studentId');
                sessionStorage.removeItem('studentId');
                localStorage.removeItem('grade');
                sessionStorage.removeItem('grade');
                localStorage.removeItem('classNum');
                sessionStorage.removeItem('classNum');
                localStorage.removeItem('schoolName');
                sessionStorage.removeItem('schoolName');
                localStorage.removeItem('chatRoomId');
                sessionStorage.removeItem('chatRoomId');
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('회원 탈퇴를 할 수 없습니다.');
        }
    };

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.SettingsContainer}>
                <div className={styles.container}>
                    <h1 className={styles.title}>마이페이지</h1>
                    <div className={styles.buttonContainer}>
                        <button className={styles.optionButton} onClick={() => navigate('/personalinfo')}>
                            개인정보 변경
                        </button>
                        <button className={styles.optionButton} onClick={() => navigate('/passwordchange')}>
                            비밀번호 변경
                        </button>
                        <button
                            className={styles.optionButton}
                            onClick={() => alert('준비중입니다.')}
                            // onClick={() => navigate('')}
                        >
                            출석표
                        </button>
                        <button className={styles.optionButton} onClick={() => navigate('')}>
                            빈칸
                        </button>
                        <button className={styles.deleteButton} onClick={handleDeleteClick}>
                            회원 탈퇴
                        </button>
                    </div>
                </div>

                {showModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <button className={styles.closeButton} onClick={handleCloseModal}>
                                &times;
                            </button>
                            <h2 className={styles.modalTitle}>회원 탈퇴</h2>
                            <p className={styles.modalText}>계정을 삭제하려면 현재 사용중인 비밀번호를 입력하세요</p>
                            <form onSubmit={handleConfirmDelete}>
                                <input
                                    type="password"
                                    value={userPw}
                                    onChange={(e) => setUserPw(e.target.value)}
                                    placeholder="비밀번호를 입력하세요"
                                    className={styles.modalInput}
                                />
                                <div className={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => setIsChecked(!isChecked)}
                                        id="agree"
                                    />
                                    <label htmlFor="agree">동의합니다.</label>
                                </div>
                                <p className={styles.warningText}>계정삭제 모든 정보가 삭제되며 복구 불가능합니다.</p>
                                <button className={styles.deleteButton}>탈퇴 하기</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPage;
