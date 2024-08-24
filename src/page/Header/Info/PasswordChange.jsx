import React, { useState } from 'react';
import styles from '../../../css/Header/PasswordChange/PasswordChange.module.css';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PasswordChange = () => {
    const [userPw, setUserPw] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userConPw, setUserConPw] = useState('');

    const navigate = useNavigate();

    return (
        <div className={styles.PasswordChangeContainer}>
            <div className={styles.container}>
                <h2>비밀번호 변경</h2>
                <form>
                    <div className={styles.inputContainer}>
                        <FaLock className={styles.icon} />
                        <input
                            type="password"
                            className={styles.inputField}
                            placeholder="비밀번호"
                            value={userPw}
                            onChange={(e) => setUserPw(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaLock className={styles.icon} />
                        <input
                            type="password"
                            className={styles.inputField}
                            placeholder="새 비밀번호"
                            value={userConPw}
                            onChange={(e) => setUserConPw(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaLock className={styles.icon} />
                        <input
                            type="password"
                            className={styles.inputField}
                            placeholder="새 비밀번호 확인"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button className={styles.saveButton}>변경 사항 저장</button>
                </form>
                <button
                    className={styles.saveButton}
                    onClick={() => {
                        navigate('/setting');
                    }}
                >
                    뒤로 가기
                </button>
            </div>
        </div>
    );
};

export default PasswordChange;
