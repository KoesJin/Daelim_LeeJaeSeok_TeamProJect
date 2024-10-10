// src/components/MainPage/AIWorkbookPage/AIWorkbookPage.jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '../../utils/DownloadFile/MyDocument'; // 기존 PDF 생성 컴포넌트
import MyWordDocument from '../../utils/DownloadFile/MyWordDocument'; // 새 워드 생성 컴포넌트
import styles from '../../css/MainPage/AIWorkbookPage/AIWorkbookPage.module.css';

// topicData 외부로 이동
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

    // 시험지에 추가된 문제들
    const [testPaper, setTestPaper] = useState([]);

    // 반 정보 상태
    const [className, setClassName] = useState(''); // 반 정보
    const [studentName, setStudentName] = useState(''); // 학생 이름

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

    // 문제 가져오기 함수
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

    // 드래그 종료 시 호출되는 함수
    const onDragEnd = (result) => {
        const { source, destination } = result;

        // 목적지가 없으면 아무 작업도 수행하지 않음
        if (!destination) return;

        // 소스와 목적지가 동일한 경우 순서 변경
        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === 'availableQuestions') {
                const reordered = Array.from(questions);
                const [moved] = reordered.splice(source.index, 1);
                reordered.splice(destination.index, 0, moved);
                setQuestions(reordered);
            } else if (source.droppableId === 'testPaper') {
                const reordered = Array.from(testPaper);
                const [moved] = reordered.splice(source.index, 1);
                reordered.splice(destination.index, 0, moved);
                setTestPaper(reordered);
            }
        } else {
            // 소스와 목적지가 다르면 이동
            if (source.droppableId === 'availableQuestions' && destination.droppableId === 'testPaper') {
                const sourceClone = Array.from(questions);
                const destClone = Array.from(testPaper);
                const [moved] = sourceClone.splice(source.index, 1);
                // 중복 허용 여부 확인
                if (!allowDuplicates && destClone.find((q) => q.problem_number === moved.problem_number)) {
                    alert('이미 시험지에 추가된 문제입니다.');
                    return;
                }
                destClone.splice(destination.index, 0, moved);
                setQuestions(sourceClone);
                setTestPaper(destClone);
            } else if (source.droppableId === 'testPaper' && destination.droppableId === 'availableQuestions') {
                const sourceClone = Array.from(testPaper);
                const destClone = Array.from(questions);
                const [moved] = sourceClone.splice(source.index, 1);
                destClone.splice(destination.index, 0, moved);
                setTestPaper(sourceClone);
                setQuestions(destClone);
            }
        }
    };

    // 클릭하여 시험지에 추가하는 함수
    const handleAddQuestion = (question) => {
        if (!allowDuplicates && testPaper.find((q) => q.problem_number === question.problem_number)) {
            alert('이미 시험지에 추가된 문제입니다.');
            return;
        }
        // 시험지에 추가
        setTestPaper((prev) => [...prev, question]);
        // 사용 가능한 문제에서 제거
        setQuestions((prev) => prev.filter((q) => q.problem_number !== question.problem_number));
    };

    // 클릭하여 시험지에서 제거하는 함수
    const handleRemoveQuestion = (question) => {
        // 시험지에서 제거
        setTestPaper((prev) => prev.filter((q) => q.problem_number !== question.problem_number));
        // 사용 가능한 문제에 추가
        setQuestions((prev) => [...prev, question]);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>문제집 제작</h1>
            </header>
            <main className={styles.main}>
                {/* 선택 섹션 */}
                <div className={styles.selection}>
                    {/* 과목 선택 섹션 */}
                    <section className={styles.section}>
                        <label htmlFor="subject">과목 선택</label>
                        <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                            <option value="math">수학</option>
                            <option value="korea">국어</option>
                        </select>
                    </section>

                    {/* 학년 선택 섹션 */}
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

                    {/* 단원 선택 섹션 */}
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

                    {/* 문제 가져오기 타입 섹션 */}
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
                            <input
                                type="radio"
                                name="fetchType"
                                value="all"
                                checked={fetchType === 'all'}
                                onChange={() => setFetchType('all')}
                            />
                            모든 문제 가져오기
                        </label>
                    </section>

                    {/* 난이도 설정 섹션 (fetchType이 'selected'일 때 표시) */}
                    {fetchType === 'selected' && (
                        <>
                            <section className={styles.section}>
                                <label>쉬운 문제 수</label>
                                <input
                                    type="number"
                                    value={difficulty.num_easy}
                                    onChange={(e) =>
                                        setDifficulty({ ...difficulty, num_easy: parseInt(e.target.value, 10) || 0 })
                                    }
                                    min="0"
                                />
                            </section>
                            <section className={styles.section}>
                                <label>중간 난이도 문제 수</label>
                                <input
                                    type="number"
                                    value={difficulty.num_medium}
                                    onChange={(e) =>
                                        setDifficulty({ ...difficulty, num_medium: parseInt(e.target.value, 10) || 0 })
                                    }
                                    min="0"
                                />
                            </section>
                            <section className={styles.section}>
                                <label>어려운 문제 수</label>
                                <input
                                    type="number"
                                    value={difficulty.num_hard}
                                    onChange={(e) =>
                                        setDifficulty({ ...difficulty, num_hard: parseInt(e.target.value, 10) || 0 })
                                    }
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

                    {/* 반 입력 섹션 */}
                    <section className={styles.section}>
                        <label htmlFor="className">반 선택</label>
                        <input
                            id="className"
                            type="text"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            placeholder="예: 1반"
                        />
                    </section>

                    {/* 학생 이름 입력 섹션 */}
                    <section className={styles.section}>
                        <label htmlFor="studentName">학생 이름</label>
                        <input
                            id="studentName"
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="예: 홍길동"
                        />
                    </section>

                    {/* 문제 가져오기 버튼 섹션 */}
                    <section className={styles.section}>
                        <button onClick={fetchQuestions}>문제 가져오기</button>
                    </section>

                    {/* PDF 및 워드 다운로드 버튼 섹션 */}
                    <section className={styles.section}>
                        {testPaper.length > 0 && (
                            <>
                                <PDFDownloadLink
                                    document={
                                        <MyDocument
                                            testPaper={testPaper}
                                            grade={grade}
                                            className={className}
                                            studentName={studentName}
                                        />
                                    }
                                    fileName="test_paper.pdf"
                                    className={styles.pdfButton}
                                >
                                    {({ loading }) => (loading ? 'PDF 생성 중...' : '시험지 PDF 다운로드')}
                                </PDFDownloadLink>
                                <MyWordDocument
                                    testPaper={testPaper}
                                    grade={grade}
                                    className={className}
                                    studentName={studentName}
                                />
                            </>
                        )}
                    </section>
                </div>

                {/* 질문 섹션 */}
                <div className={styles.questionsContainer}>
                    {/* 드래그 앤 드롭 컨테이너 */}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className={styles.dragDropContainer}>
                            {/* 사용 가능한 문제 영역 */}
                            <Droppable droppableId="availableQuestions">
                                {(provided) => (
                                    <div
                                        className={styles.availableQuestions}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h2>사용 가능한 문제</h2>
                                        <div className={styles.count}>
                                            <span>총 {questionCount}개의 문제</span>
                                        </div>
                                        {questions.map((question, index) => (
                                            <Draggable
                                                key={question.problem_number}
                                                draggableId={question.problem_number.toString()}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        className={styles.questionItem}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        onClick={() => handleAddQuestion(question)}
                                                        role="button"
                                                        tabIndex={0}
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                handleAddQuestion(question);
                                                            }
                                                        }}
                                                    >
                                                        <p>
                                                            <strong>번호:</strong> {question.problem_number}
                                                        </p>
                                                        <p>
                                                            <strong>난이도:</strong> {question.difficulty_level}
                                                        </p>
                                                        <p>
                                                            <strong>문제:</strong> {question.problem}
                                                        </p>
                                                        {['multiple choice', 'true/false'].includes(
                                                            question.question_type
                                                        ) && (
                                                            <p>
                                                                <strong>보기:</strong> {question.answer}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {/* 시험지 영역 */}
                            <Droppable droppableId="testPaper">
                                {(provided) => (
                                    <div
                                        className={styles.testPaper}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h2>시험지</h2>
                                        <div className={styles.count}>
                                            <span>추가된 문제 수: {testPaper.length}</span>
                                        </div>
                                        {testPaper.map((question, index) => (
                                            <Draggable
                                                key={`test-${question.problem_number}-${index}`} // 중복 방지를 위해 index 추가
                                                draggableId={`test-${question.problem_number}-${index}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        className={styles.questionItem}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        onClick={() => handleRemoveQuestion(question)}
                                                        role="button"
                                                        tabIndex={0}
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                handleRemoveQuestion(question);
                                                            }
                                                        }}
                                                    >
                                                        <p>
                                                            <strong>번호:</strong> {question.problem_number}
                                                        </p>
                                                        <p>
                                                            <strong>난이도:</strong> {question.difficulty_level}
                                                        </p>
                                                        <p>
                                                            <strong>문제:</strong> {question.problem}
                                                        </p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </DragDropContext>
                </div>
            </main>
            <footer className={styles.footer}>&copy; Jsl 문제 은행</footer>
        </div>
    );
};

export default AIWorkbookPage;
