import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../css/MainPage/ToolPage/ToolPage.module.css'; // CSS Module import

// SVG 아이콘 import
import VoteIcon from '../../svg/MainPage/ToolPage/VoteIcon';
import LadderIcon from '../../svg/MainPage/ToolPage/LadderIcon';
import QuizIcon from '../../svg/MainPage/ToolPage/QuizIcon';
import RandomPickerIcon from '../../svg/MainPage/ToolPage/RandomPickerIcon';
import SeatIcon from '../../svg/MainPage/ToolPage/SeatIcon'; // 자리 선정 아이콘 추가

const ToolPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>수업 도구</h1>

                <div className={styles.toolGrid}>
                    {/* 투표 도구 */}
                    <div
                        className={styles.toolItem}
                        // onClick={() => navigate('/vote')}
                        onClick={() => alert('준비중입니다.')}
                    >
                        <VoteIcon className={styles.icon} />
                        <p className={styles.toolName}>투표</p>
                    </div>

                    {/* 사다리타기 도구 */}
                    <div
                        className={styles.toolItem}
                        // onClick={() => navigate('/ladder')}
                        onClick={() => alert('준비중입니다.')}
                    >
                        <LadderIcon className={styles.icon} />
                        <p className={styles.toolName}>사다리타기</p>
                    </div>

                    {/* 퀴즈 도구 */}
                    <div
                        className={styles.toolItem}
                        // onClick={() => navigate('/quiz')}
                        onClick={() => alert('준비중입니다.')}
                    >
                        <QuizIcon className={styles.icon} />
                        <p className={styles.toolName}>퀴즈</p>
                    </div>

                    {/* 랜덤 추첨기 도구 */}
                    <div
                        className={styles.toolItem}
                        // onClick={() => navigate('/random-picker')}
                        onClick={() => alert('준비중입니다.')}
                    >
                        <RandomPickerIcon className={styles.icon} />
                        <p className={styles.toolName}>랜덤 추첨기</p>
                    </div>

                    {/* 자리 선정 도구 */}
                    <div className={styles.toolItem} onClick={() => alert('준비중입니다.')}>
                        <SeatIcon className={styles.icon} />
                        <p className={styles.toolName}>자리 선정</p>
                    </div>
                </div>

                {/* <div className={styles.backButtonWrapper}>
                    <Link to="/mainpage" className={styles.backButton}>
                        뒤로가기
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default ToolPage;
