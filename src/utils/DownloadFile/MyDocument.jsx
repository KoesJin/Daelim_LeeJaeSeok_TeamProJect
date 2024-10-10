// src/components/MainPage/MyDocument.jsx

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

// 폰트 파일 직접 임포트
import NotoSansKRRegular from '../fonts/NotoSansKR-Black.ttf'; // 실제 파일명으로 수정
import NotoSansKRBold from '../fonts/NotoSansKR-Bold.ttf';

// 로고 이미지 임포트
import SchoolLogo from '../../img/AppleLogo.png';

// 폰트 등록
Font.register({
    family: 'Noto Sans KR',
    fonts: [
        {
            src: NotoSansKRRegular,
            fontWeight: 'normal',
        },
        {
            src: NotoSansKRBold,
            fontWeight: 'bold',
        },
    ],
});

// 스타일 정의
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Noto Sans KR',
        fontSize: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 60,
        height: 60,
    },
    titleContainer: {
        textAlign: 'right',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    studentInfo: {
        fontSize: 12,
    },
    instructionsContainer: {
        marginBottom: 20,
    },
    instructionsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    instructionsText: {
        fontSize: 12,
        color: '#555555',
    },
    columnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        width: '48%', // 두 열 간의 간격을 고려하여 약간 줄임
    },
    questionContainer: {
        marginBottom: 15,
    },
    questionNumber: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    questionText: {
        marginBottom: 5,
    },
    difficulty: {
        fontStyle: 'italic',
        color: '#555555',
    },
    optionsContainer: {
        marginLeft: 10,
        marginTop: 5,
    },
    optionText: {
        fontSize: 12,
        marginBottom: 3,
        color: '#333333',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 10,
        color: '#999999',
    },
});

// 보기 문자열을 파싱하여 옵션 배열로 변환하는 함수
const parseOptions = (answerString) => {
    // "A) 2 B) 4 C) -1 D) 7" 또는 "A) True B) False" 형태의 문자열을 ["A) 2", "B) 4", "C) -1", "D) 7"] 배열로 변환
    return answerString.match(/[A-Z]\)\s[^A-Z]+(?=\s[A-Z]\)|$)/g) || [];
};

const MyDocument = ({ testPaper, grade, className, studentName }) => {
    // 질문을 두 개의 열로 분할하는 함수
    const splitQuestionsIntoColumns = (questions) => {
        const leftColumn = [];
        const rightColumn = [];
        questions.forEach((question, index) => {
            if (index % 2 === 0) {
                leftColumn.push(question);
            } else {
                rightColumn.push(question);
            }
        });
        return { leftColumn, rightColumn };
    };

    const { leftColumn, rightColumn } = splitQuestionsIntoColumns(testPaper);

    return (
        <Document>
            {/* 시험 문제 페이지 */}
            <Page size="A4" style={styles.page}>
                {/* 헤더: 로고와 학생 정보 */}
                <View style={styles.headerContainer}>
                    <Image src={SchoolLogo} style={styles.logo} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>시험지</Text>
                        <Text style={styles.studentInfo}>
                            학년: {grade} 반: {className} 이름: {studentName}
                        </Text>
                    </View>
                </View>

                {/* 시험 주의사항 */}
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsTitle}>시험 주의사항</Text>
                    <Text style={styles.instructionsText}>1. 시험 시간은 60분입니다.</Text>
                    <Text style={styles.instructionsText}>2. 모든 문제에 정답을 기재해 주세요.</Text>
                    <Text style={styles.instructionsText}>3. 시험 중에는 휴대폰 사용이 금지됩니다.</Text>
                    <Text style={styles.instructionsText}>4. 조용히 시험을 진행해 주세요.</Text>
                </View>

                {/* 두 개의 열로 질문 배치 */}
                <View style={styles.columnsContainer}>
                    {/* 왼쪽 열 */}
                    <View style={styles.column}>
                        {leftColumn.map((question, index) => {
                            let options = [];

                            if (question.question_type === 'multiple choice') {
                                // Multiple Choice 문제의 경우 'answer' 필드에서 옵션을 파싱
                                options = parseOptions(question.answer);
                            } else if (question.question_type === 'true/false') {
                                // True/False 문제의 경우 옵션을 직접 할당
                                options = ['A) True', 'B) False'];
                            }

                            return (
                                <View key={index} style={styles.questionContainer}>
                                    <Text style={styles.questionNumber}>
                                        {index * 2 + 1}. 문제 번호: {question.problem_number} (난이도:{' '}
                                        {question.difficulty_level})
                                    </Text>
                                    <Text style={styles.questionText}>{question.problem}</Text>

                                    {/* Multiple Choice 및 True/False 문제일 경우 보기를 출력 */}
                                    {options.length > 0 && (
                                        <View style={styles.optionsContainer}>
                                            {options.map((option, optIndex) => (
                                                <Text key={optIndex} style={styles.optionText}>
                                                    {option}
                                                </Text>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>

                    {/* 오른쪽 열 */}
                    <View style={styles.column}>
                        {rightColumn.map((question, index) => {
                            let options = [];

                            if (question.question_type === 'multiple choice') {
                                // Multiple Choice 문제의 경우 'answer' 필드에서 옵션을 파싱
                                options = parseOptions(question.answer);
                            } else if (question.question_type === 'true/false') {
                                // True/False 문제의 경우 옵션을 직접 할당
                                options = ['A) True', 'B) False'];
                            }

                            return (
                                <View key={index} style={styles.questionContainer}>
                                    <Text style={styles.questionNumber}>
                                        {index * 2 + 2}. 문제 번호: {question.problem_number} (난이도:{' '}
                                        {question.difficulty_level})
                                    </Text>
                                    <Text style={styles.questionText}>{question.problem}</Text>

                                    {/* Multiple Choice 및 True/False 문제일 경우 보기를 출력 */}
                                    {options.length > 0 && (
                                        <View style={styles.optionsContainer}>
                                            {options.map((option, optIndex) => (
                                                <Text key={optIndex} style={styles.optionText}>
                                                    {option}
                                                </Text>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* 푸터: 페이지 번호 */}
                <Text
                    style={styles.footer}
                    render={({ pageNumber, totalPages }) => `페이지 ${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    );
};

export default MyDocument;
