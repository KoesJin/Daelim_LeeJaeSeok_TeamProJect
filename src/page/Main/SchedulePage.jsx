import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/MainPage/SchedulePage/SchedulePage.module.css';

const SchedulePage = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <h1 className={styles.title}>시간표</h1>
                <div className={styles.table}>
                    <div className={styles.row}>
                        <div className={styles.headerCell}></div>
                        <div className={styles.headerCell}>월요일</div>
                        <div className={styles.headerCell}>화요일</div>
                        <div className={styles.headerCell}>수요일</div>
                        <div className={styles.headerCell}>목요일</div>
                        <div className={styles.headerCell}>금요일</div>
                    </div>

                    {/* 각 시간별 시간표 내용 */}
                    {[...Array(8)].map((_, i) => (
                        <div className={styles.row} key={i}>
                            <div className={styles.timeCell}>{i + 1}교시</div>
                            <div className={styles.cell}>수업</div>
                            <div className={styles.cell}>수업</div>
                            <div className={styles.cell}>수업</div>
                            <div className={styles.cell}>수업</div>
                            <div className={styles.cell}>수업</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;
