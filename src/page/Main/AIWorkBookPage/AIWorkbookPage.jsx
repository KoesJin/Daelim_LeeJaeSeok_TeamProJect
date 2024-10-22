// src/components/MainPage/AIWorkbookPag
/* eslint-disable */
import React, { useState } from 'react';
import styles from '../../../css/MainPage/AIWorkbookPage/AIWorkbookPage.module.css';
import WorkbookContent from './WorkbookContent';
import AIRecommendationPage from './AIRecommendationPage';
import { jsPDF } from 'jspdf'; // jsPDF 라이브러리 임포트
import { getFontBase64 } from '../../../utils/fonts/fontUtils'; // 유틸리티 함수 가져오기
import { Document as DocxDocument, Packer, Paragraph, HeadingLevel, ImageRun } from 'docx'; // docx 라이브러리 임포트
import { saveAs } from 'file-saver'; // 파일 저장을 위한 라이브러리

// 폰트 파일 경로 가져오기 (Webpack에 의해 처리됨)
import NotoSansKRRegularPath from '../../../utils/fonts/NotoSansKR-Black.ttf';
import NotoSansKRBoldPath from '../../../utils/fonts/NotoSansKR-Bold.ttf';

const AIWorkbookPage = () => {
    const [activePage, setActivePage] = useState('recommendation');
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const showWorkbook = () => setActivePage('workbook');
    const showRecommendation = () => setActivePage('recommendation');

    // 문제를 추가하는 함수 (문제 ID, 토픽, 이미지 URL만 저장)
    const extractGradeFromFilename = (filename) => {
        if (!filename) return null;

        // 파일 이름에서 첫 번째 언더스코어(_) 이전의 부분을 추출
        const match = filename.match(/^(P[3-6])/i);
        if (match && match[1]) {
            return match[1].toUpperCase();
        }

        return null;
    };

    // 문제를 추가하는 함수 (문제 ID, 토픽, 이미지 URL만 저장)
    const addQuestion = (question) => {
        // 중복 추가 방지 (문제 ID 기준)
        if (!selectedQuestions.find((q) => q.id === question.id)) {
            // 학년에 따라 trainingDir 설정
            const trainingDirMap = {
                P3: 'Training_3',
                P4: 'Training_4',
                P5: 'Training_5',
                P6: 'Training_6',
            };

            // 질문 데이터에서 학년을 가져옵니다. 없을 경우 파일 이름에서 추출
            let grade = question.grade || question['학년']; // 'grade' 또는 '학년' 필드 사용
            if (!grade && question.question_filename) {
                grade = extractGradeFromFilename(question.question_filename);
            }
            const trainingDir = trainingDirMap[grade] || 'Training_3'; // 기본값 'Training_3'

            const newQuestion = {
                id: question.id || question['문제번호'],
                topic: question.topic || '토픽 정보 없음', // 'topic' 필드 사용
                imageUrl: question.question_filename
                    ? `https://api.gosky.kr/ai_recommend/images/${trainingDir}/${encodeURIComponent(
                          question.question_filename
                      )}`
                    : null,
            };

            console.log('추가된 질문:', newQuestion); // 로그 추가

            setSelectedQuestions([...selectedQuestions, newQuestion]);
        }
    };

    // 문제를 제거하는 함수
    const removeQuestion = (questionId) => {
        setSelectedQuestions(selectedQuestions.filter((q) => q.id !== questionId));
    };

    // 이미지 URL을 Base64로 변환하는 유틸리티 함수
    const getBase64FromUrl = async (url) => {
        try {
            const response = await fetch(url, { mode: 'cors' });
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('이미지 변환 오류:', error);
            return null;
        }
    };

    // 이미지의 원본 비율을 유지하면서 크기를 조정하는 함수
    const getImageDimensions = (base64Image) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const width = img.width;
                const height = img.height;
                resolve({ width, height });
            };
            img.onerror = (err) => {
                reject(err);
            };
            img.src = `data:image/jpeg;base64,${base64Image}`;
        });
    };

    // PDF 생성 함수 (비동기 처리)
    const generatePDFAsync = async () => {
        const pdfDoc = new jsPDF();

        // 폰트 Base64로 변환
        const regularBase64 = await getFontBase64(NotoSansKRRegularPath);
        const boldBase64 = await getFontBase64(NotoSansKRBoldPath);

        if (!regularBase64 || !boldBase64) {
            alert('폰트를 로드하는 데 실패했습니다.');
            return;
        }

        // 커스텀 폰트 추가
        pdfDoc.addFileToVFS('NotoSansKR-Regular.ttf', regularBase64);
        pdfDoc.addFont('NotoSansKR-Regular.ttf', 'NotoSansKR', 'normal');
        pdfDoc.addFileToVFS('NotoSansKR-Bold.ttf', boldBase64);
        pdfDoc.addFont('NotoSansKR-Bold.ttf', 'NotoSansKR-Bold', 'bold');

        // 사용할 폰트 설정 (regular)
        pdfDoc.setFont('NotoSansKR', 'normal');

        // PDF 제목 추가
        pdfDoc.setFontSize(20);
        pdfDoc.setFont('NotoSansKR-Bold', 'bold');
        pdfDoc.text('TeacHub 시험지', 105, 20, null, null, 'center');

        // 학년/반/이름 입력란 추가 (제목 바로 아래)
        pdfDoc.setFontSize(12);
        const pageWidth = pdfDoc.internal.pageSize.getWidth(); // 페이지 너비
        const text = '학년: ___________  반: ___________  이름: ___________';
        const textWidth = pdfDoc.getTextWidth(text); // 텍스트의 너비 계산
        pdfDoc.text(text, pageWidth - textWidth - 14, 30); // 오른쪽에 정렬된 위치로 텍스트 추가

        let yOffset = 45; // 내용 시작 위치

        // 주제별로 질문 그룹화
        const groupedQuestions = selectedQuestions.reduce((groups, question) => {
            const topic = question.topic || '토픽 정보 없음';
            if (!groups[topic]) {
                groups[topic] = [];
            }
            groups[topic].push(question);
            return groups;
        }, {});

        let questionNumber = 1; // 문제 번호

        // 주제별로 PDF에 추가
        for (const [topic, questions] of Object.entries(groupedQuestions)) {
            // 주제 헤더 추가
            pdfDoc.setFontSize(16);
            pdfDoc.text(`주제: ${topic}`, 14, yOffset);
            yOffset += 10;

            pdfDoc.setFontSize(12);
            pdfDoc.setFont('NotoSansKR', 'normal');

            for (const question of questions) {
                // 페이지 한계점 도달 시 새 페이지 추가
                if (yOffset > 270) {
                    pdfDoc.addPage();
                    yOffset = 20;
                }

                // 문제 번호와 텍스트 추가
                // const questionText = `${questionNumber}. 문제 번호: ${question.id}`;
                // pdfDoc.text(questionText, 14, yOffset);
                // yOffset += 10;

                // 이미지 추가
                if (question.imageUrl) {
                    try {
                        const imgData = await getBase64FromUrl(question.imageUrl);
                        if (imgData) {
                            // 이미지의 원본 크기 가져오기
                            const dimensions = await getImageDimensions(imgData);
                            const fixedWidth = 180; // 이미지 크기 조정
                            const aspectRatio = dimensions.height / dimensions.width;
                            const calculatedHeight = fixedWidth * aspectRatio;

                            // 페이지 한계점 도달 시 새 페이지 추가
                            if (yOffset + calculatedHeight + 10 > 280) {
                                pdfDoc.addPage();
                                yOffset = 20;
                            }

                            // 이미지 추가 (가로 크기 150, 세로 크기 비율에 맞게 계산)
                            pdfDoc.addImage(imgData, 'JPEG', 14, yOffset, fixedWidth, calculatedHeight);
                            yOffset += calculatedHeight + 10; // 이미지 아래에 여백 추가
                        } else {
                            pdfDoc.text(`이미지 URL: ${question.imageUrl}`, 14, yOffset);
                            yOffset += 10;
                        }
                    } catch (error) {
                        console.error('이미지 추가 오류:', error);
                        pdfDoc.text(`이미지 URL: ${question.imageUrl}`, 14, yOffset);
                        yOffset += 10;
                    }
                }

                // 문제 번호 증가
                questionNumber++;

                // 각 문제 간 여백
                // yOffset += 10;
            }

            // 주제 간 여백 추가
            yOffset += 15;
        }

        // PDF 저장
        pdfDoc.save('시험지.pdf');
    };

    const generateWordAsync = async () => {
        console.log('Word 생성 시작. 선택된 질문들:', selectedQuestions);

        // 모든 내용을 한 섹션에 추가하기 위한 배열
        const allChildren = [];

        // 제목과 학년/반/이름 입력란 추가
        allChildren.push(
            new Paragraph({
                text: 'TeacHub 시험지',
                heading: HeadingLevel.HEADING_1,
                alignment: 'center', // 가운데 정렬
                bold: true,
            })
        );

        // 학년/반/이름 입력란 추가
        allChildren.push(
            new Paragraph({
                text: '학년: ___________  반: ___________  이름: ___________',
                alignment: 'right', // 왼쪽 정렬
                spacing: { after: 400 }, // 제목과의 간격 추가
            })
        );

        // 주제별로 질문 그룹화
        const groupedQuestions = selectedQuestions.reduce((groups, question) => {
            const topic = question.topic || '토픽 정보 없음';
            if (!groups[topic]) {
                groups[topic] = [];
            }
            groups[topic].push(question);
            return groups;
        }, {});

        // 주제별로 Word에 추가
        for (const [topic, questions] of Object.entries(groupedQuestions)) {
            // 주제 헤더 추가
            allChildren.push(
                new Paragraph({
                    text: `주제: ${topic}`,
                    heading: HeadingLevel.HEADING_2,
                    bold: true,
                    spacing: { after: 200 }, // 주제와 문제 사이 간격
                })
            );

            let questionNumber = 1; // 문제 번호

            for (const question of questions) {
                // 질문 텍스트 추가
                // allChildren.push(new Paragraph({
                //   text: `${questionNumber}. 문제 번호: ${question.id}`,
                //   spacing: { after: 200 }, // 문제 간 간격
                // }));

                // 이미지 추가
                if (question.imageUrl) {
                    try {
                        const imgData = await getBase64FromUrl(question.imageUrl);
                        if (imgData) {
                            // MIME 타입 감지
                            const mimeTypeMatch = question.imageUrl.match(/\.(jpeg|jpg|png|gif)$/i);
                            const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'jpeg';
                            const dimensions = await getImageDimensions(imgData, mimeType);
                            const fixedWidth = 500; // 이미지 크기 고정
                            const aspectRatio = dimensions.height / dimensions.width;
                            const calculatedHeight = fixedWidth * aspectRatio;

                            // 이미지 추가
                            allChildren.push(
                                new Paragraph({
                                    children: [
                                        new ImageRun({
                                            data: imgData,
                                            transformation: {
                                                width: fixedWidth,
                                                height: calculatedHeight,
                                            },
                                        }),
                                    ],
                                    spacing: { after: 200 }, // 이미지와 문제 간 간격
                                })
                            );
                        } else {
                            allChildren.push(
                                new Paragraph({
                                    text: `이미지 URL: ${question.imageUrl}`,
                                    italics: true,
                                })
                            );
                        }
                    } catch (error) {
                        console.error('이미지 추가 오류:', error);
                        allChildren.push(
                            new Paragraph({
                                text: `이미지 URL: ${question.imageUrl}`,
                                italics: true,
                            })
                        );
                    }
                }

                questionNumber++; // 문제 번호 증가
            }

            // 주제 간 여백 추가
            allChildren.push(
                new Paragraph({
                    text: '',
                    spacing: { after: 400 }, // 주제 간 간격
                })
            );
        }

        // Word Document 생성
        const wordDoc = new DocxDocument({
            sections: [
                {
                    properties: {},
                    children: allChildren,
                },
            ],
        });

        // Word 파일 생성
        Packer.toBlob(wordDoc)
            .then((blob) => {
                saveAs(blob, '시험지.docx');
            })
            .catch((error) => {
                console.error('Word 파일 생성 오류:', error);
                alert('Word 파일 생성에 실패했습니다.');
            });
    };

    return (
        <div className={styles.app}>
            {/* 버튼 컨테이너 */}
            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.toggleButton} ${activePage === 'recommendation' ? styles.active : ''}`}
                    onClick={showRecommendation}
                >
                    AI 문제집 에서 검색
                </button>
                <button
                    className={`${styles.toggleButton} ${activePage === 'workbook' ? styles.active : ''}`}
                    onClick={showWorkbook}
                >
                    데이터 사전 에서 검색
                </button>
            </div>

            {/* 메인 콘텐츠 컨테이너 */}
            <div className={styles.mainContent}>
                {/* 콘텐츠 조건부 렌더링 */}
                <div className={styles.content}>
                    {activePage === 'workbook' && <WorkbookContent addQuestion={addQuestion} />}
                    {activePage === 'recommendation' && <AIRecommendationPage addQuestion={addQuestion} />}
                </div>

                {/* 시험지 관리 섹션 */}
                <div className={styles.examPaper}>
                    <h2>시험지</h2>
                    {selectedQuestions.length === 0 ? (
                        <p>시험지에 추가된 문제가 없습니다.</p>
                    ) : (
                        <ul className={styles.examList}>
                            {selectedQuestions.map((question) => (
                                <li key={question.id} className={styles.examListItem}>
                                    <span>{question.topic}</span>
                                    <button onClick={() => removeQuestion(question.id)} className={styles.removeButton}>
                                        제거
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className={styles.exportButtons}>
                        <button
                            onClick={generatePDFAsync}
                            disabled={selectedQuestions.length === 0}
                            className={styles.pdfButton}
                        >
                            PDF로 출력
                        </button>
                        <button
                            onClick={generateWordAsync}
                            disabled={selectedQuestions.length === 0}
                            className={styles.wordButton}
                        >
                            Word로 출력
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIWorkbookPage;
