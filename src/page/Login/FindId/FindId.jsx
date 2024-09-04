import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/LoginPage/FindId/FindId.module.css';
import { FaMobileAlt, FaEnvelope } from 'react-icons/fa';

const FindId = () => {
    //userNavigate 훅
    const navigate = useNavigate();

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.FindIdBody}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.logoText}>TeacHub</div>
                    </div>
                    <h2 className={styles.title}>계정을 찾을 방법을 선택해 주세요.</h2>
                    <h3 className={styles.subtitle}>본인인증으로 내 명의가 등록된 계정 찾기</h3>
                    <div className={styles.optionGroup}>
                        <div className={styles.option}>
                            <FaMobileAlt className={styles.icon} />
                            <div className={styles.textContainer}>
                                <span className={styles.mainText}>휴대전화 본인인증</span>
                            </div>
                        </div>
                    </div>
                    <h3 className={styles.subtitle}>계정에 등록된 정보로 찾기</h3>
                    <div className={styles.optionGroup}>
                        <div className={styles.option}>
                            <FaMobileAlt className={styles.icon} />
                            <div className={styles.textContainer}>
                                <span className={styles.mainText}>닉네임 또는 이름, 전화번호</span>
                            </div>
                        </div>
                        <div className={styles.option}>
                            <FaEnvelope className={styles.icon} />
                            <div className={styles.textContainer}>
                                <span className={styles.mainText}>닉네임 또는 이름, 이메일</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.backButtonContainer}>
                        <button className={styles.backButton} onClick={() => navigate(-1)}>
                            뒤로가기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindId;
