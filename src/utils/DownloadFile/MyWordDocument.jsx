// src/components/MainPage/MyWordDocument.jsx

import React from 'react';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import styles from '../../css/MainPage/AIWorkbookPage/AIWorkbookPage.module.css';
// 이미지 사용 시 Base64 인코딩 필요
// import SchoolLogo from '../img/AppleLogo.png';

const MyWordDocument = ({ testPaper, grade, className, studentName }) => {
    const generateWordDocument = () => {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        // 헤더: 로고와 학생 정보
                        new Paragraph({
                            children: [
                                // 이미지 추가 (Base64 필요)
                                // new ImageRun({
                                //     data: logoBase64,
                                //     transformation: {
                                //         width: 60,
                                //         height: 60,
                                //     },
                                // }),
                                new TextRun({
                                    text: '시험지',
                                    bold: true,
                                    size: 36,
                                }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `학년: ${grade}  반: ${className}  이름: ${studentName}`,
                                    size: 24,
                                }),
                            ],
                        }),
                        // 시험 주의사항
                        new Paragraph({
                            text: '시험 주의사항',
                            heading: HeadingLevel.HEADING_2,
                        }),
                        new Paragraph('1. 시험 시간은 60분입니다.'),
                        new Paragraph('2. 모든 문제에 정답을 기재해 주세요.'),
                        new Paragraph('3. 시험 중에는 휴대폰 사용이 금지됩니다.'),
                        new Paragraph('4. 조용히 시험을 진행해 주세요.'),
                        // 문제 목록
                        ...testPaper
                            .map((question, index) => {
                                let options = [];
                                if (question.question_type === 'multiple choice') {
                                    options = question.answer.match(/[A-Z]\)\s[^A-Z]+(?=\s[A-Z]\)|$)/g) || [];
                                } else if (question.question_type === 'true/false') {
                                    options = ['A) True', 'B) False'];
                                }

                                return [
                                    new Paragraph({
                                        text: `${index + 1}. 문제 번호: ${question.problem_number} (난이도: ${
                                            question.difficulty_level
                                        })`,
                                        heading: HeadingLevel.HEADING_3,
                                    }),
                                    new Paragraph(question.problem),
                                    ...(options.length > 0 ? options.map((option) => new Paragraph(option)) : []),
                                ];
                            })
                            .flat(),
                    ],
                },
            ],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, 'test_paper.docx');
        });
    };

    return (
        <button className={styles.pdfButton} onClick={generateWordDocument}>
            워드 파일 다운로드
        </button>
    );
};

export default MyWordDocument;
