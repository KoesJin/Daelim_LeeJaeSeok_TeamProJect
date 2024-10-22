import React, { useState } from 'react';
import styles from '../../../css/MainPage/AIWorkbookPage/AIRecommendationPage.module.css'; // 모듈화된 CSS 파일 임포트

const AIRecommendationPage = ({ addQuestion }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const mapDifficulty = (difficulty) => {
        const map = {
            1: '낮음',
            2: '중간',
            3: '높음',
        };
        return map[difficulty] || difficulty;
    };

    const getRecommendations = () => {
        if (!query.trim()) {
            alert('질문을 입력해주세요.');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        fetch('https://api.gosky.kr/ai_recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`서버 응답 오류: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                if (data.error) {
                    setError(data.error);
                } else if (data.message) {
                    setError(data.message);
                } else {
                    setResult(data);
                }
            })
            .catch((error) => {
                setLoading(false);
                setError(`에러 발생: ${error.message}`);
            });
    };

    // 문제를 추가할 때 필요한 정보만 전달
    const handleAddQuestion = (question) => {
        if (!question['학년'] || !question['질문 파일'] || !question['문제번호']) {
            console.error('필요한 필드가 누락되었습니다:', question);
            alert('선택한 문제의 필수 정보가 누락되었습니다.');
            return;
        }

        const newQuestion = {
            id: question['문제번호'],
            topic: question['주제'] || '토픽 정보 없음',
            question_filename: question['질문 파일'],
            grade: question['학년'],
        };

        addQuestion(newQuestion);
    };

    // 모든 문제를 추가하는 함수
    const addAllQuestions = () => {
        if (!result || !result['추천된 문제']) return;

        result['추천된 문제'].forEach((question) => {
            handleAddQuestion(question); // 각 문제를 개별적으로 추가
        });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.h2}>문제 추천 시스템</h2>
            <p className={styles.p}>질문을 입력하세요 (예: "초등학생 3학년이 풀 뺄셈 문제 5문제 추천해줘"):</p>
            <input
                type="text"
                value={query}
                className={styles.questionInput}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="질문을 입력하세요"
                disabled={loading}
            />
            <button className={styles.button} onClick={getRecommendations} disabled={loading}>
                문제 추천 받기
            </button>

            {loading && (
                <div className={styles.result}>
                    <p>생각하는 중...</p>
                    <div className={styles.spinner}></div>
                </div>
            )}

            {error && (
                <div className={styles.result}>
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            )}

            {result && (
                <div className={styles.result}>
                    <h3>추출된 정보:</h3>
                    <ul>
                        <li>
                            <strong className={styles.strong}>학년:</strong>{' '}
                            {result.extracted_info.grade || '모든 학년'}
                        </li>
                        <li>
                            <strong className={styles.strong}>주제 키워드:</strong>{' '}
                            {result.extracted_info.topic_keywords?.join(', ') || '모든 주제'}
                        </li>
                        <li>
                            <strong className={styles.strong}>난이도:</strong>{' '}
                            {mapDifficulty(result.extracted_info.difficulty) || '모든 난이도'}
                        </li>
                        <li>
                            <strong className={styles.strong}>문제 유형:</strong>{' '}
                            {result.extracted_info.question_types?.join(', ') || '모든 유형'}
                        </li>
                        <li>
                            <strong className={styles.strong}>문제 개수:</strong> {result.extracted_info.num_questions}
                        </li>
                    </ul>

                    <h3>추천된 문제:</h3>
                    {result['추천된 문제'].length === 0 ? (
                        <p>조건에 맞는 문제가 없습니다.</p>
                    ) : (
                        <>
                            <button onClick={addAllQuestions} className={styles.addButton}>
                                모든 문제 시험지에 추가
                            </button>
                            <ul className={styles.questionList}>
                                {result['추천된 문제'].map((question, index) => {
                                    const trainingSuffix = question['학년'] ? question['학년'].slice(-1) : '3';
                                    const trainingDir = `Training_${trainingSuffix}`;
                                    const imageUrl = `https://api.gosky.kr/ai_recommend/images/${trainingDir}/${encodeURIComponent(
                                        question['질문 파일']
                                    )}`;

                                    return (
                                        <li key={index} className={styles.questionListItem}>
                                            <strong className={styles.strong}>문제 {question['문제번호']}:</strong>
                                            <br />
                                            학년: {question['학년']}
                                            <br />
                                            단원: {question['단원']}
                                            <br />
                                            주제: {question['주제']}
                                            <br />
                                            난이도: {mapDifficulty(question['난이도'])}
                                            <br />
                                            문제 유형: {question['문제 유형']}
                                            <br />
                                            파일: {question['질문 파일']}
                                            <br />
                                            <img src={imageUrl} alt="문제 이미지" className={styles.img} />
                                            <button
                                                onClick={() => handleAddQuestion(question)}
                                                className={styles.addButton}
                                            >
                                                시험지에 추가
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AIRecommendationPage;
