import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/AIWorkbookPage/AIWorkbookPage.module.css';

const AIWorkbookPage = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>TeacHub</h1>
            </header>
            <main className={styles.main}>
                <section className={styles.section}>
                    <h2>학년 선택</h2>
                    <select className={styles.select}>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}학년
                            </option>
                        ))}
                    </select>
                </section>
                <section className={styles.section}>
                    <h2>문제 리스트</h2>
                    <ul className={styles.list}>
                        <li>기초: 국어, 수학, 영어, 한국사</li>
                        <li>탐구: 사회, 과학</li>
                        <li>체육미술: 체육, 예술(음악/미술)</li>
                        <li>생활교양: 기술·가정, 제2외국어, 한문, 교양</li>
                        <li>기타: 전문교과(예시로 몇개만 추가)</li>
                    </ul>
                </section>
                <section className={styles.section}>
                    <h2>기타 기능</h2>
                    <ul className={styles.list}>
                        <li>문제 제작 페이지</li>
                        <li>AI 문제 제작 페이지</li>
                        <li>문제 등록 페이지</li>
                        <li>문제 오류 신고</li>
                        <li>즐겨찾기</li>
                    </ul>
                </section>
            </main>
            <footer className={styles.footer}>
                <Link to="/mainpage" className={styles.link}>
                    뒤로가기
                </Link>
            </footer>
        </div>
    );
};

export default AIWorkbookPage;
