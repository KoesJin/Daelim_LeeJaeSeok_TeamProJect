/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import styles from '../../../css/MainPage/SchedulePage/SchedulePage.module.css';

// 추가된 라이브러리 임포트
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SchedulePage = () => {
    // userId 정보
    const [userId, setUserId] = useState('');

    // scheduleData를 배열로 초기화
    const [scheduleData, setScheduleData] = useState([]);

    // userId 가져오기
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // userId가 있을 시 시간표 가져오기
    useEffect(() => {
        if (userId) {
            handleTakeSchedule();
        }
    }, [userId]);

    // 교시(period) 관리
    const [periods] = useState([1, 2, 3, 4, 5, 6, 7]);

    // 요일(dayOfWeek) 관리
    const [daysOfWeek] = useState(['월요일', '화요일', '수요일', '목요일', '금요일']);

    // 시간표 불러오는 함수
    const handleTakeSchedule = async () => {
        try {
            let baseURL = '';
            if (process.env.NODE_ENV === 'development') {
                baseURL = 'http://121.139.20.242:8859';
            }

            const response = await fetch(`${baseURL}/api/schedule/view?userId=${userId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            const result = await response.json();

            if (result.status === '200') {
                setScheduleData(result.data);
            } else {
                alert('시간표를 불러오지 못하였습니다.');
            }
        } catch (error) {
            alert('시간표를 불러올 수 없습니다');
        }
    };

    // Cell 컴포넌트

    const Cell = ({ period, dayOfWeek }) => {
        // 과목
        const [subject, setSubject] = useState('');
        // 과목 리스트 열림 / 닫힘
        const [isListOpen, setIsListOpen] = useState(false);
        // 직접 입력창
        const [isInputOpen, setIsInputOpen] = useState(false);
        // 직접 입력값
        const [customInput, setCustomInput] = useState('');
        // 수정 / 삭제
        const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태 추가
        // 스케쥴 아이디 정보
        const [scheduleId, setScheduleId] = useState('');

        const subjects = [
            '국어',
            '수학',
            '영어',
            '과학',
            '도덕',
            '사회',
            '체육',
            '미술',
            '음악',
            '정보',
            '기술가정',
            '창체',
        ];

        const cellRef = useRef(null);

        // scheduleData를 기반으로 과목 설정
        useEffect(() => {
            if (scheduleData.length > 0) {
                const formattedPeriod = `${period}교시`;
                const entry = scheduleData.find(
                    (item) => item.period === formattedPeriod && item.dayOfWeek === dayOfWeek
                );
                if (entry) {
                    setSubject(entry.subject);
                    setScheduleId(entry.scheduleId);
                } else {
                    setSubject('');
                }
            } else {
                setSubject('');
            }
        }, [scheduleData, period, dayOfWeek]);

        // 셀 클릭 (수정 모드로 전환)
        const handleCellClick = () => {
            if (subject === '') {
                setIsListOpen(true);
            } else {
                setIsEditMode(true); // 수정 모드로 전환
            }
        };

        // 과목 선택(등록)
        const handleRegisterSubjectClick = async (selectedSubject) => {
            setSubject(selectedSubject);
            setIsListOpen(false);

            // 선택한 과목, 요일, 교시 정보를 서버로 전송
            await handleRegisterSubject(selectedSubject, period, dayOfWeek);
        };

        // 과목 선택(수정)
        const handleEditSubjectClick = async (selectedSubject) => {
            setSubject(selectedSubject);
            setIsListOpen(false);

            // 선택한 과목, 요일, 교시 정보를 서버로 전송
            await handleEditSubject(selectedSubject, period, dayOfWeek);
        };

        // 직접 입력 클릭
        const handleDirectInputClick = () => {
            setIsListOpen(false);
            setIsInputOpen(true);
        };

        // 입력값 저장 및 서버 전송 (등록)
        const handleCustomInputRegisterSubmit = async () => {
            if (customInput.trim() !== '') {
                setSubject(customInput);
                setCustomInput('');
                setIsInputOpen(false);

                // 직접 입력한 과목, 요일, 교시 정보를 서버로 전송
                await handleRegisterSubject(customInput, period, dayOfWeek);
            } else {
                alert('과목명을 입력해 주세요.');
            }
        };

        // 입력값 저장 및 서버 전송 (수정)
        const handleCustomInputEditSubmit = async () => {
            if (customInput.trim() !== '') {
                setSubject(customInput);
                setCustomInput('');
                setIsInputOpen(false);

                // 직접 입력한 과목, 요일, 교시 정보를 서버로 전송
                await handleEditSubject(customInput, period, dayOfWeek);
            } else {
                alert('과목명을 입력해 주세요.');
            }
        };

        // 과목 등록 함수
        const handleRegisterSubject = async (subject, period, dayOfWeek) => {
            // baseURL 설정
            let baseURL = '';
            if (process.env.NODE_ENV === 'development') {
                baseURL = 'http://121.139.20.242:8859';
            }

            try {
                const response = await fetch(`${baseURL}/api/schedule/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        subject,
                        period: `${period}교시`,
                        dayOfWeek,
                        userId,
                    }),
                });

                const result = await response.json();

                if (result.status === '200') {
                    alert(result.message);
                    handleTakeSchedule(); // 데이터 업데이트 후 다시 불러오기
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.log('과목을 추가할 수 없습니다.');
            }
        };

        // 과목 수정 함수
        const handleEditSubject = async (subject, period, dayOfWeek) => {
            try {
                let baseURL = '';
                if (process.env.NODE_ENV === 'development') {
                    baseURL = 'http://121.139.20.242:8859';
                }

                const response = await fetch(`${baseURL}/api/schedule/update`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        subject,
                        period: `${period}교시`,
                        dayOfWeek,
                        userId,
                        scheduleId,
                    }),
                });

                const result = await response.json();

                if (result.status === '200') {
                    alert(result.message);
                    handleTakeSchedule();
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert('시간표를 변경할 수 없습니다.');
            }
        };

        // 과목 삭제 함수
        const handleDeleteClick = async () => {
            if (!scheduleId) {
                alert('삭제할 수 있는 일정이 없습니다.');
                return;
            }
            let baseURL = '';
            if (process.env.NODE_ENV === 'development') {
                baseURL = 'http://121.139.20.242:8859';
            }
            try {
                const response = await fetch(`${baseURL}/api/schedule/delete?scheduleId=${scheduleId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                const result = await response.json();

                if (result.status === '200') {
                    alert(result.message);
                    setSubject('');
                    setIsEditMode(false);
                    handleTakeSchedule();
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert('시간표를 삭제할 수 없습니다.');
            }
        };

        // 외부 클릭 감지 및 처리
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (cellRef.current && !cellRef.current.contains(event.target)) {
                    setIsListOpen(false);
                    setIsInputOpen(false);
                    setIsEditMode(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [isListOpen, isInputOpen, isEditMode]);

        return (
            <div className={styles.cell} onClick={handleCellClick} ref={cellRef}>
                {/* 과목이 없는 경우 등록 버튼 */}
                {subject === '' ? (
                    <div className={styles.cellPlusSign}>+</div>
                ) : (
                    <div className={styles.cellContent}>
                        {/* 수정 모드가 아닌 경우 과목 표시 */}
                        {!isEditMode && subject}

                        {/* 수정 모드인 경우 수정/삭제 버튼 표시 */}
                        {isEditMode && (
                            <div className={styles.editOptions}>
                                <button onClick={() => setIsListOpen(true)} className={styles.editButton}>
                                    수정
                                </button>
                                <button onClick={handleDeleteClick} className={styles.deleteButton}>
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {isListOpen && (
                    <div className={styles.cellDropdown} onClick={(e) => e.stopPropagation()}>
                        {subjects.map((subjectItem) => (
                            <div
                                key={subjectItem}
                                onClick={() =>
                                    isEditMode
                                        ? handleEditSubjectClick(subjectItem)
                                        : handleRegisterSubjectClick(subjectItem)
                                }
                                className={styles.cellDropdownItem}
                            >
                                {subjectItem}
                            </div>
                        ))}
                        <div onClick={handleDirectInputClick} className={styles.cellDropdownItem}>
                            직접입력하기
                        </div>
                    </div>
                )}

                {isInputOpen && (
                    <div className={styles.cellInputContainer} onClick={(e) => e.stopPropagation()}>
                        <input
                            type="text"
                            value={customInput}
                            onChange={(e) => {
                                setCustomInput(e.target.value);
                            }}
                            className={styles.cellInput}
                        />
                        <button
                            onClick={isEditMode ? handleCustomInputEditSubmit : handleCustomInputRegisterSubmit}
                            className={styles.cellSubmitButton}
                        >
                            확인
                        </button>
                    </div>
                )}
            </div>
        );
    };

    // Cell 컴포넌트 끝

    // 시간표를 캡처하여 PDF로 저장하는 함수
    const handleSaveAsPDF = () => {
        const input = document.getElementById('scheduleCapture'); // 수정: 새로 만든 컨테이너를 캡처

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 기준 너비(mm)
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('시간표.pdf');
        });
    };

    // 시간표를 캡처하여 이미지로 저장하는 함수
    const handleSaveAsImage = () => {
        const input = document.getElementById('scheduleCapture'); // 수정: 새로 만든 컨테이너를 캡처

        html2canvas(input).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = '시간표.png';
            link.click();
        });
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.buttonContainer}>
                    <button onClick={handleSaveAsPDF} className={styles.saveButton}>
                        PDF로 저장
                    </button>
                    <button onClick={handleSaveAsImage} className={styles.saveButton}>
                        이미지로 저장
                    </button>
                </div>
                {/* 새로 만든 캡처용 컨테이너 */}
                <div id="scheduleCapture" className={styles.scheduleContainer}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>시간표</h1>
                    </div>
                    <div className={styles.table}>
                        <div className={styles.row}>
                            <div className={styles.headerCell}>2-4반</div>
                            {/* 요일 */}
                            {daysOfWeek.map((dayOfWeek, index) => (
                                <div className={styles.headerCell} key={index}>
                                    {dayOfWeek}
                                </div>
                            ))}
                        </div>
                        {/* 교시 */}
                        {periods.map((periodItem, periodIndex) => (
                            <div className={styles.row} key={periodIndex}>
                                <div className={styles.timeCell}>{periodItem}교시</div>
                                {daysOfWeek.map((dayOfWeek, dayIndex) => (
                                    <Cell
                                        key={`${dayIndex}-${periodIndex}`}
                                        period={periodItem}
                                        dayOfWeek={dayOfWeek}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;
