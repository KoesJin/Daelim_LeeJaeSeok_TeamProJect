import React from 'react';
import styles from '../../css/Header/TestHeader.module.css';
import ChatIcon from '../../svg/MainPage/Chat/ChatIcon';
import MainTitle from '../../img/TeacHub.png';

const TestHeader = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.leftSection}>
                <div className={styles.leftBar} />
                <div className={styles.leftBar} />
                <div className={styles.leftBar} />
            </div>
            <img src={MainTitle} alt="MainTitle" className={styles.mainTitle} />
            <div className={styles.teacherInfo}>
                <span className={styles.teacherName}>최예진</span>
                <span className={styles.teacherTitle}>선생님</span>
                <div className={styles.chatIcon}>
                    <ChatIcon />
                </div>
            </div>
        </div>
    );
};

export default TestHeader;
