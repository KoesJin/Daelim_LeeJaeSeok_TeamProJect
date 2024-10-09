import React, { useState, useEffect } from 'react';
import styles from '../../css/MainPage/AIWorkbookPage/AIWorkbookPage.module.css';

// topicData를 컴포넌트 외부로 이동
const topicData = {
    math: {
        '1학년': ['자연수'],
        '2학년': ['두 자리 수 범위 덧셈과 뺄셈', '한 자리 수의 곱셈', '평면도형과 그 구성 요소', '길이', '시각과 시간'],
        '3학년': [
            '3자리 이상 덧셈과 뺄셈',
            '평면도형',
            '나눗셈',
            '곱셈',
            '길이와 시간',
            '분수와 소수',
            '길이',
            '여러가지 도형',
        ],
        '4학년': ['큰 수', '각도', '곱셈과 나눗셈', '평면도형의 이동', '막대그래프', '규칙'],
        '5학년': [
            '자연수의 혼합계산',
            '약수와 배수',
            '규칙과 대응',
            '약분과 통분',
            '분수의 덧셈과 뺄셈',
            '다각형의 둘레와 넓이',
        ],
        '6학년': [
            '분수의 나눗셈',
            '각기둥과 각뿔',
            '소수의 나눗셈',
            '비와 비율',
            '여러가지 그래프',
            '직육면체의 부피와 겉넓이',
        ],
    },
    korea: {
        '1학년': ['받침 없는 글자', '받침 있는 글자', '문장 쓰기', '읽기와 쓰기', '어휘', '문학', '작문'],
        '2학년': ['문장 쓰기', '받침 없는 글자', '받침 있는 글자', '읽기와 쓰기'],
        '3학년': ['단어의 의미', '문장의 구조', '읽기 전략', '글쓰기'],
        '4학년': ['문장의 종류', '글의 구조', '표현 방법', '독해력 향상'],
        '5학년': ['어휘 확장', '문법 기초', '작문 연습', '비판적 읽기'],
        '6학년': ['논술 연습', '문학 감상', '어휘 심화', '창의적 글쓰기'],
    },
};

const AIWorkbookPage = () => {
    // 초기 subject 설정
    const [subject, setSubject] = useState('math');

    // 초기 grade 설정을 subject에 따라 동적으로 설정
    const initialGrade = Object.keys(topicData['math'])[0]; // '1학년'
    const [grade, setGrade] = useState(initialGrade);

    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [fetchType, setFetchType] = useState('selected');
    const [difficulty, setDifficulty] = useState({
        num_easy: 5,
        num_medium: 5,
        num_hard: 5,
    });
    const [allowDuplicates, setAllowDuplicates] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionCount, setQuestionCount] = useState(0);

    // subject 또는 grade가 변경될 때 topics 업데이트
    useEffect(() => {
        if (subject && grade) {
            setTopics(topicData[subject][grade] || []);
        }
    }, [subject, grade]);

    // subject가 변경될 때 grade를 해당 subject의 첫 번째 학년으로 초기화
    useEffect(() => {
        if (subject) {
            const firstGrade = Object.keys(topicData[subject])[0];
            setGrade(firstGrade);
        }
    }, [subject]);

    const fetchQuestions = () => {
        const topicsParam = selectedTopics.join(',');
        const endpoint = fetchType === 'all' ? '/jsl_api/all_questions' : '/jsl_api';

        const params = new URLSearchParams({
            subject,
            grade,
            unit: topicsParam,
            num_easy: difficulty.num_easy,
            num_medium: difficulty.num_medium,
            num_hard: difficulty.num_hard,
            allow_duplicates: allowDuplicates ? '1' : '0',
        }).toString();

        fetch(`https://api.gosky.kr${endpoint}?${params}`)
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data);
                setQuestionCount(data.length);
            })
            .catch((error) => {
                alert('데이터를 가져오는 중 오류가 발생했습니다.');
                setQuestionCount(0);
            });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>문제집 제작</h1>
            </header>
            <main className={styles.main}>
                {/* 선택 섹션 */}
                <div className={styles.selection}>
                    <section className={styles.section}>
                        <label htmlFor="subject">과목 선택</label>
                        <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                            <option value="math">수학</option>
                            <option value="korea">국어</option>
                        </select>
                    </section>

                    <section className={styles.section}>
                        <label htmlFor="grade">학년 선택</label>
                        <select id="grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
                            {Object.keys(topicData[subject]).map((g) => (
                                <option key={g} value={g}>
                                    {g}
                                </option>
                            ))}
                        </select>
                    </section>

                    <section className={styles.section}>
                        <label htmlFor="topic">단원 선택 (드래그로 중복 선택 가능)</label>
                        <select
                            id="topic"
                            multiple
                            value={selectedTopics}
                            onChange={(e) => setSelectedTopics(Array.from(e.target.selectedOptions, (o) => o.value))}
                        >
                            {topics.map((topic) => (
                                <option key={topic} value={topic}>
                                    {topic}
                                </option>
                            ))}
                        </select>
                    </section>

                    <section className={styles.section}>
                        <label>
                            <input
                                type="radio"
                                name="fetchType"
                                value="selected"
                                checked={fetchType === 'selected'}
                                onChange={() => setFetchType('selected')}
                            />
                            랜덤 문제 가져오기
                        </label>
                        <label>
                            <input type="radio" name="fetchType" value="all" onChange={() => setFetchType('all')} />
                            모든 문제 가져오기
                        </label>
                    </section>

                    {fetchType === 'selected' && (
                        <>
                            <section className={styles.section}>
                                <label>쉬운 문제 수</label>
                                <input
                                    type="number"
                                    value={difficulty.num_easy}
                                    onChange={(e) => setDifficulty({ ...difficulty, num_easy: e.target.value })}
                                    min="0"
                                />
                            </section>
                            <section className={styles.section}>
                                <label>중간 난이도 문제 수</label>
                                <input
                                    type="number"
                                    value={difficulty.num_medium}
                                    onChange={(e) => setDifficulty({ ...difficulty, num_medium: e.target.value })}
                                    min="0"
                                />
                            </section>
                            <section className={styles.section}>
                                <label>어려운 문제 수</label>
                                <input
                                    type="number"
                                    value={difficulty.num_hard}
                                    onChange={(e) => setDifficulty({ ...difficulty, num_hard: e.target.value })}
                                    min="0"
                                />
                            </section>
                            <section className={styles.section}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={allowDuplicates}
                                        onChange={() => setAllowDuplicates(!allowDuplicates)}
                                    />
                                    문제 중복 허용
                                </label>
                            </section>
                        </>
                    )}

                    <section className={styles.section}>
                        <button onClick={fetchQuestions}>문제 가져오기</button>
                    </section>
                </div>

                {/* 질문 섹션 */}
                <div className={styles.questionsContainer}>
                    <section className={styles.section}>
                        <div id="questionCount">총 {questionCount}개의 문제가 로드되었습니다.</div>
                        <div id="questions">
                            {questions.map((question) => (
                                <div key={question.problem_number} className={styles.question}>
                                    <p className={styles.questionTitle}>
                                        문제 번호: {question.problem_number} (난이도: {question.difficulty_level})
                                    </p>
                                    <p>
                                        <strong>문제:</strong> {question.problem}
                                    </p>
                                    <p>
                                        <strong>보기:</strong> {question.answer}
                                    </p>
                                    <p>
                                        <strong>해답:</strong> {question.correct_answer_text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <footer className={styles.footer}>&copy; Jsl 문제 은행</footer>
        </div>
    );
};

export default AIWorkbookPage;
