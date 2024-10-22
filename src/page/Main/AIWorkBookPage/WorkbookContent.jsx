/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styles from '../../../css/MainPage/AIWorkbookPage/AIWorkbookPage.module.css';
import DetailView from './DetailView';

const WorkbookContent = ({ addQuestion }) => {
    const [datasets] = useState([
        { value: 'Training_3', label: '3학년 문제' },
        { value: 'Training_4', label: '4학년 문제' },
        { value: 'Training_5', label: '5학년 문제' },
        { value: 'Training_6', label: '6학년 문제' },
    ]);
    const [currentDataset, setCurrentDataset] = useState('all');
    const [allTopics, setAllTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [detail, setDetail] = useState(null);
    const [loadingTopics, setLoadingTopics] = useState(false);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentDataset) {
            fetchTopics(currentDataset);
        } else {
            resetState();
        }
    }, [currentDataset]);

    useEffect(() => {
        if (selectedTopic) {
            fetchQuestions(selectedTopic);
        } else {
            setQuestions([]);
            setSelectedQuestion(null);
            setDetail(null);
        }
    }, [selectedTopic]);

    useEffect(() => {
        if (selectedQuestion) {
            fetchQuestionDetail(selectedQuestion);
        } else {
            setDetail(null);
        }
    }, [selectedQuestion]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredTopics(allTopics);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = allTopics.filter((topic) => topic.toLowerCase().includes(query));
            setFilteredTopics(filtered);
        }
    }, [searchQuery, allTopics]);

    const fetchTopics = async (dataset) => {
        setLoadingTopics(true);
        setError(null);

        try {
            if (dataset === 'all') {
                const allTopicsData = [];
                for (const ds of datasets) {
                    const response = await fetch(
                        `https://api.gosky.kr/jsl_apii/api/${encodeURIComponent(ds.value)}/topics`
                    );
                    if (!response.ok) throw new Error('Error fetching topics');

                    const topicsData = await response.json();
                    allTopicsData.push(...topicsData);
                }
                setAllTopics(allTopicsData);
                setFilteredTopics(allTopicsData);
            } else {
                const response = await fetch(`https://api.gosky.kr/jsl_apii/api/${encodeURIComponent(dataset)}/topics`);
                if (!response.ok) throw new Error('Error fetching topics');

                const topicsData = await response.json();
                setAllTopics(topicsData);
                setFilteredTopics(topicsData);
            }
            setSearchQuery('');
        } catch (err) {
            setError('토픽을 로딩하는 중 오류가 발생했습니다.');
            setAllTopics([]);
            setFilteredTopics([]);
        } finally {
            setLoadingTopics(false);
        }
    };

    const fetchQuestions = async (topic) => {
        setLoadingQuestions(true);
        setError(null);
        setQuestions([]);
        setSelectedQuestion(null);
        setDetail(null);

        try {
            if (currentDataset === 'all') {
                const allQuestionsData = [];
                for (const ds of datasets) {
                    const url = `https://api.gosky.kr/jsl_apii/api/${encodeURIComponent(
                        ds.value
                    )}/topics/${encodeURIComponent(topic)}`;
                    const response = await fetch(url);
                    if (!response.ok) throw new Error('Error fetching questions');

                    const questionsData = await response.json();
                    // 학년 정보를 포함해 저장
                    const questionsWithDataset = questionsData.map((q) => ({ ...q, dataset: ds.value }));
                    allQuestionsData.push(...questionsWithDataset);
                }
                setQuestions(allQuestionsData);
            } else {
                const url = `https://api.gosky.kr/jsl_apii/api/${encodeURIComponent(
                    currentDataset
                )}/topics/${encodeURIComponent(topic)}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Error fetching questions');

                const questionsData = await response.json();
                setQuestions(questionsData.map((q) => ({ ...q, dataset: currentDataset }))); // 학년 정보 포함
            }
        } catch (err) {
            setError('질문을 로딩하는 중 오류가 발생했습니다.');
            setQuestions([]);
        } finally {
            setLoadingQuestions(false);
        }
    };

    const fetchQuestionDetail = async (questionId) => {
        setLoadingDetail(true);
        setError(null);
        setDetail(null);

        try {
            const question = questions.find((q) => q.id === questionId); // 선택된 질문 찾기
            if (!question) throw new Error('질문을 찾을 수 없습니다.');

            const url = `https://api.gosky.kr/jsl_apii/api/${encodeURIComponent(
                question.dataset
            )}/data/${encodeURIComponent(questionId)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error fetching question detail.');

            const detailData = await response.json();
            setDetail(detailData);
        } catch (err) {
            setError('질문 상세 정보를 로딩하는 중 오류가 발생했습니다.');
            setDetail(null);
        } finally {
            setLoadingDetail(false);
        }
    };

    const resetState = () => {
        setAllTopics([]);
        setFilteredTopics([]);
        setSearchQuery('');
        setSelectedTopic(null);
        setQuestions([]);
        setSelectedQuestion(null);
        setDetail(null);
        setError(null);
    };

    const handleBackToTopics = () => {
        setSelectedTopic(null);
        setQuestions([]);
        setDetail(null);
    };

    const handleBackToQuestions = () => {
        setSelectedQuestion(null);
        setDetail(null);
    };

    return (
        <div className={styles.app}>
            <h2>문제집 데이터셋 사전</h2>

            {!selectedTopic && (
                <>
                    <div className={styles.datasetSelector}>
                        <label htmlFor="dataset-select">학년 선택</label>
                        <select
                            id="dataset-select"
                            value={currentDataset}
                            onChange={(e) => setCurrentDataset(e.target.value)}
                        >
                            <option value="all">모든 학년</option> {/* '모든 학년' 옵션 추가 */}
                            {datasets.map((ds) => (
                                <option key={ds.value} value={ds.value}>
                                    {ds.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="토픽 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {loadingTopics ? (
                        <p>토픽 로딩 중...</p>
                    ) : error ? (
                        <p className={styles.error}>{error}</p>
                    ) : (
                        <ul className={styles.topicList} role="listbox" aria-label="Dataset Topics">
                            {filteredTopics.length > 0 ? (
                                filteredTopics.map((topic, index) => (
                                    <li
                                        key={index}
                                        className={`${styles.listItem} ${selectedTopic === topic ? styles.active : ''}`}
                                        tabIndex="0"
                                        role="option"
                                        aria-selected={selectedTopic === topic}
                                        onClick={() => setSelectedTopic(topic)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                setSelectedTopic(topic);
                                            }
                                        }}
                                    >
                                        {topic}
                                    </li>
                                ))
                            ) : (
                                <li className={styles.noResult}>일치하는 데이터가 없습니다.</li>
                            )}
                        </ul>
                    )}
                </>
            )}

            {selectedTopic && !selectedQuestion && (
                <>
                    <button className={styles.backButton} onClick={handleBackToTopics}>
                        뒤로가기
                    </button>

                    {loadingQuestions ? (
                        <p>문제 로딩 중...</p>
                    ) : error ? (
                        <p className={styles.error}>{error}</p>
                    ) : questions.length > 0 ? (
                        <ul className={styles.fileList} role="listbox" aria-label="Questions">
                            {questions.map((question) => (
                                <li
                                    key={question.id}
                                    className={`${styles.fileItem} ${
                                        selectedQuestion === question.id ? styles.active : ''
                                    }`}
                                    tabIndex="0"
                                    role="option"
                                    aria-selected={selectedQuestion === question.id}
                                    onClick={() => setSelectedQuestion(question.id)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelectedQuestion(question.id);
                                        }
                                    }}
                                >
                                    <div className={styles.fileIcon}>
                                        <span>📄</span>
                                    </div>
                                    <div className={styles.fileName}>문제 ID: {question.id}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>이 토픽에 해당하는 문제가 없습니다.</p>
                    )}
                </>
            )}

            {selectedQuestion && detail && !loadingDetail && (
                <>
                    <button className={styles.backButton} onClick={handleBackToQuestions}>
                        뒤로가기
                    </button>
                    <DetailView detail={detail} addQuestion={() => addQuestion({ ...detail, topic: selectedTopic })} />{' '}
                    {/* 토픽 정보 전달 */}
                </>
            )}

            {selectedQuestion && loadingDetail && <p>상세 정보 로딩 중...</p>}
        </div>
    );
};

export default WorkbookContent;
