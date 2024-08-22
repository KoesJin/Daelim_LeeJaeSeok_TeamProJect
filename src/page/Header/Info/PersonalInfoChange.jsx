import React from 'react';
import styles from '../../../css/Header/PersonalInfoChange/PersonalInfoChange.module.css';

const PersonalInfoChange = () => {
    return (
        <div className={styles.PersonalInfoChangeContainer}>
            <div className={styles.container}>
                <h2>개인정보 변경</h2>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>아이디</label>
                    <input type="text" className={styles.inputField} placeholder="아이디" />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>이름</label>
                    <input type="text" className={styles.inputField} placeholder="이름" />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>전화번호</label>
                    <input type="text" className={styles.inputField} placeholder="전화번호" />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>생년월일</label>
                    <input type="text" className={styles.inputField} placeholder="생년월일" />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>이메일</label>
                    <input type="email" className={styles.inputField} placeholder="이메일" />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>학교명</label>
                    <input type="text" className={styles.inputField} placeholder="학교명" />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>반</label>
                    <input type="text" className={styles.inputField} placeholder="반" />
                </div>
                <button className={styles.saveButton}>변경 사항 저장</button>
            </div>
        </div>
    );
};

export default PersonalInfoChange;
