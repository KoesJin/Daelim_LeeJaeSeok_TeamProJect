import React, { useEffect, useState } from 'react';
import styles from '../../css/MainPage/Main.module.css';
import NoticeIcon from '../../svg/MainPage/NoticeIcon';
import PlusIcon from '../../svg/MainPage/PlusIcon';
import TeacherIcon from '../../svg/MainPage/TeacherIcon';
import { useNavigate } from 'react-router-dom';
import TeachCong from '../../svg/MainPage/TeachCong';

const Main = () => {
    // 이름 정보
    const [userName, setUserName] = useState('');

    // useNavigate 훅
    const navigate = useNavigate();

    // userName 가져오는 useEffect 훅
    useEffect(() => {
        // 새로고침 시 localStorage에서 userName를 불러오게 함
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);
    return (
        <>
            <div className={styles.ScrollContainer}>
                <div className={styles.container}>
                    <div className={styles.notice}>
                        <div className={styles.noticeHeader}>
                            <div className={styles.titleWithIcon}>
                                <span className={styles.noticeTitle} onClick={() => alert('준비중입니다.')}>
                                    학급 알림장
                                </span>
                                <NoticeIcon className={styles.icon} />
                            </div>
                            <div onClick={() => alert('준비중입니다.')}>
                                <PlusIcon className={styles.plusIcon} />
                            </div>
                        </div>
                        <div className={styles.noticeBody}>
                            <div className={styles.noticeItem}>
                                <span>우유 급식 관련 공지</span>
                                <span className={styles.noticeDate}>2024.10.21</span>
                            </div>
                            <div className={styles.noticeItem}>
                                <span>교실 내 탕후루 금지합니다.</span>
                                <span className={styles.noticeDate}>2024.01.01</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.welcomeSection}>
                        <div className={styles.teacherInfoWrapper}>
                            <TeacherIcon className={styles.teacherIcon} />
                            <div className={styles.teacherInfo}>
                                <p className={styles.welcomeText}>환영합니다,</p>
                                <div className={styles.teacherNameTitle}>
                                    <span className={styles.teacherName}>{userName}</span>
                                    <span className={styles.teacherTitle}>선생님</span>
                                </div>
                                <div className={styles.buttons}>
                                    <div className={styles.button} onClick={() => navigate('/checkinfo')}>
                                        마이페이지
                                    </div>
                                    <div className={styles.button} onClick={() => alert('준비중입니다.')}>
                                        내 쪽지함
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.helpSection}>
                    <p className={styles.helpText}>어떤 도움이 필요하세요?</p>
                </div>
                <div className={styles.teachCongSection}>
                    <div className={styles.teachCongItem} onClick={() => navigate('/studentmanagement')}>
                        <TeachCong />
                        <p>학생관리</p>
                    </div>
                    <div className={styles.teachCongItem} onClick={() => navigate('/ai-workbook')}>
                        <TeachCong />
                        <p>AI 문제집</p>
                    </div>
                    <div className={styles.teachCongItem} onClick={() => navigate('/schedule')}>
                        <TeachCong />
                        <p>시간표</p>
                    </div>
                    <div className={styles.teachCongItem} onClick={() => navigate('/tool')}>
                        <TeachCong />
                        <p>수업도구</p>
                    </div>
                    <div className={styles.teachCongItem} onClick={() => navigate('/send-message')}>
                        <TeachCong />
                        <p>문자 발송</p>
                    </div>
                    {/* <div className={styles.teachCongItem} onClick={() => navigate('/seat-assignment')}>
                        <TeachCong />
                        <p>자리선정</p>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Main;
