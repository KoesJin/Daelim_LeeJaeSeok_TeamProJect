import React, { useEffect, useRef, useState } from 'react';
import styles from '../../css/MainPage/StudentManagementPage/StudentManagementPage.module.css';

const StudentManagementPage = () => {
    // 학생 정보 상태
    const [studentName, setStudentName] = useState('');
    const [studentNum, setStudentNum] = useState(''); // 전화번호
    const [studentCode, setStudentCode] = useState('1'); // 학생번호 1~40번
    const [studentDate, setStudentDate] = useState('');
    const [studentGender, setStudentGender] = useState('');
    const [studentGrade, setStudentGrade] = useState('1'); // 1~6학년으로 설정
    const [classNum, setClassNum] = useState('1'); // 1~20반으로 설정
    const [userId, setUserId] = useState('');

    // 페이지 상태
    const [page, setPage] = useState(0); // 현재 페이지 번호
    const [maxPage, setMaxPage] = useState(0); // 전체 페이지 번호

    // 학생 목록 상태
    const [studentData, setStudentData] = useState([]); // 학생 정보를 담을 배열

    // 수정 중인 학생의 ID를 저장하는 상태
    const [editingStudentId, setEditingStudentId] = useState(null);

    // 스크롤 컨테이너 참조 생성
    const scrollContainerRef = useRef(null);

    // userId 가져오는 useEffect 훅
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // userId나 페이지 번호가 변경될 때 학생 정보 가져오기
    useEffect(() => {
        if (userId) {
            handleTakeStudentInfo();
        }
    }, [userId, page]);

    // 페이지가 변경될떄마다 상단으로 보냄
    useEffect(() => {
        scrollToTop();
    }, [page]);

    // 학생 추가 모달 상태
    const [openModal, setOpenModal] = useState(false);

    // 모달 열기/닫기 함수
    const onModalOpen = () => {
        setOpenModal(!openModal);
    };

    // baseURL 설정
    let baseURL = '';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://121.139.20.242:8859';
    }

    // 학생 정보 추가 함수
    const handleAddStudent = async (e) => {
        e.preventDefault();

        // 유효성 검사
        const nameRegex = /^[가-힣]{2,4}$/;
        if (!nameRegex.test(studentName)) {
            alert('이름은 2자에서 4자 사이의 한글만 입력 가능합니다.');
            return;
        }

        const phoneRegex = /^010\d{8}$/;
        if (!phoneRegex.test(studentNum)) {
            alert('전화번호는 010으로 시작하고, "-"를 제외한 11자리 숫자로만 이루어져야 합니다. 예: 01012345678');
            return;
        }

        if (!studentDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            alert('생년월일은 YYYY-MM-DD 형식으로 입력해야 합니다.');
            return;
        }

        try {
            const bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const response = await fetch(`${baseURL}/api/student/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: bearerToken,
                },
                body: JSON.stringify({
                    studentName,
                    studentNum,
                    studentCode,
                    studentDate,
                    studentGender,
                    studentGrade,
                    classNum,
                    userId,
                }),
            });

            const result = await response.json();

            if (result.status === '200') {
                alert(result.message);
                window.location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.log('학생을 추가할 수 없습니다.');
        }
    };

    // 학생 정보 불러오는 함수
    const handleTakeStudentInfo = async () => {
        try {
            const bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const response = await fetch(`${baseURL}/api/student/info?userId=${userId}&page=${page}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: bearerToken,
                },
            });

            const result = await response.json();

            if (result.status === '200') {
                setStudentData(result.data);
                if (result.data.length < 12) {
                    setMaxPage(page); // 12개 미만이면 현재 페이지가 마지막 페이지
                } else {
                    setMaxPage(page + 1); // 12개면 다음 페이지가 있을 가능성이 있음
                }
            } else {
                alert('학생 정보가 없습니다.');
            }
        } catch (error) {
            alert('학생 정보를 불러올 수 없습니다.');
        }
    };

    // 학생 정보 삭제 함수
    const handleDeleteStudent = async (studentId) => {
        try {
            const bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const response = await fetch(`${baseURL}/api/student/delete/${studentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: bearerToken,
                },
            });

            const result = await response.json();

            if (result.status === '200') {
                alert(result.message);
                handleTakeStudentInfo(); // 삭제 후 학생 목록 갱신
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('학생을 삭제할 수 없습니다.');
        }
    };

    //학생 정보 수정 함수
    const handleSaveChanges = async (e) => {
        e.preventDefault();

        // 유효성 검사
        const studentCodeRegex = /^[1-9]$|^[1-3][0-9]$|^40$/;
        if (!studentCodeRegex.test(studentCode)) {
            alert('학생 번호는 1부터 40까지의 숫자만 입력 가능합니다.');
            return;
        }

        const nameRegex = /^[가-힣]{2,4}$/;
        if (!nameRegex.test(studentName)) {
            alert('이름은 2자에서 4자 사이의 한글만 입력 가능합니다.');
            return;
        }

        const phoneRegex = /^010\d{8}$/;
        if (!phoneRegex.test(studentNum)) {
            alert('전화번호는 010으로 시작하고, "-"를 제외한 11자리 숫자로만 이루어져야 합니다. 예: 01012345678');
            return;
        }

        try {
            let baseURL = '';
            if (process.env.NODE_ENV === 'development') {
                baseURL = 'http://121.139.20.242:8859';
            }

            const bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const response = await fetch(`${baseURL}/api/student/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: bearerToken,
                },
                body: JSON.stringify({
                    studentName,
                    studentNum,
                    studentCode,
                    userId,
                    studentId: editingStudentId,
                }),
            });

            const result = await response.json();

            if (result.status === '200') {
                alert(result.message);
                setEditingStudentId(null);
                window.location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('정보를 변경할 수 없습니다.');
        }
    };

    // 학생 정보 수정 모드를 위한 함수
    // 학생 정보 수정 모드를 위한 함수
    const handleEditClick = (studentId) => {
        // studentData 배열에서 선택한 학생의 데이터를 찾음
        const selectedStudent = studentData.find((student) => student.studentId === studentId);

        if (selectedStudent) {
            // 선택한 학생의 데이터를 상태로 설정
            setStudentName(selectedStudent.studentName);
            setStudentNum(selectedStudent.studentNum);
            setStudentCode(selectedStudent.studentCode);

            // 수정 중인 학생의 ID를 상태로 저장
            setEditingStudentId(studentId);
        }
    };

    // 스크롤 탑 함수 -> 그냥 div가 아닌 css 영역떄문에 useRef 사용
    const scrollToTop = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    };

    return (
        <div className={styles.ScrollContainer} ref={scrollContainerRef}>
            <div className={styles.container}>
                <div className={styles.classInfo}>2-4반</div> {/* 학급 정보 */}
                <button className={styles.addButton} onClick={onModalOpen}>
                    학생 등록
                </button>
                <div className={styles.studentBox}>
                    <table className={styles.studentTable}>
                        <thead>
                            <tr className={styles.studentHeader}>
                                <th className={styles.numberHeader}>번호</th>
                                <th className={styles.studentNameHeader}>이름</th>
                                <th className={styles.studentInfoHeader}>전화번호</th>
                                <th className={styles.studentInfoHeader}>생년월일</th>
                                <th className={styles.studentInfoHeader}>성별</th>
                                <th className={styles.studentInfoHeader}>학년</th>
                                <th className={styles.studentInfoHeader}>반</th>
                                <th className={styles.actionHeader}>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.map((student, index) => (
                                <tr key={index}>
                                    <td>
                                        {editingStudentId === student.studentId ? (
                                            <input
                                                type="text"
                                                defaultValue={student.studentCode}
                                                onChange={(e) => setStudentCode(e.target.value)}
                                                className={styles.inputField}
                                                maxLength={2}
                                            />
                                        ) : (
                                            student.studentCode
                                        )}
                                    </td>
                                    <td>
                                        {editingStudentId === student.studentId ? (
                                            <input
                                                type="text"
                                                defaultValue={student.studentName}
                                                onChange={(e) => setStudentName(e.target.value)}
                                                className={styles.inputField}
                                                maxLength={4}
                                            />
                                        ) : (
                                            student.studentName
                                        )}
                                    </td>
                                    <td>
                                        {editingStudentId === student.studentId ? (
                                            <input
                                                type="text"
                                                defaultValue={student.studentNum}
                                                onChange={(e) => setStudentNum(e.target.value)}
                                                className={styles.inputField}
                                                maxLength={11}
                                            />
                                        ) : (
                                            student.studentNum
                                        )}
                                    </td>
                                    <td>{student.studentDate}</td> {/* 생년월일 */}
                                    <td>{student.studentGender}</td> {/* 성별 */}
                                    <td>{student.studentGrade}학년</td> {/* 학년 */}
                                    <td>{student.classNum}반</td> {/* 반 */}
                                    <td className={styles.actions}>
                                        {editingStudentId === student.studentId ? (
                                            <>
                                                <button className={styles.editButton} onClick={handleSaveChanges}>
                                                    저장
                                                </button>
                                                <div className={styles.separator}>|</div>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => setEditingStudentId(null)}
                                                >
                                                    취소
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className={styles.editButton}
                                                    onClick={() => handleEditClick(student.studentId)}
                                                >
                                                    수정
                                                </button>
                                                <div className={styles.separator}>|</div>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDeleteStudent(student.studentId)}
                                                >
                                                    삭제
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.pagination}>
                        <button
                            className={styles.pageButton}
                            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))} // 0 이하로 내려가는걸 방지할려고 Math.max 함수 사용
                            disabled={page === 0}
                        >
                            이전
                        </button>
                        <button
                            className={styles.pageButton}
                            onClick={() => setPage((prevPage) => prevPage + 1)}
                            disabled={page === maxPage} // 마지막 페이지일 때 "다음" 버튼 비활성화
                        >
                            다음
                        </button>
                    </div>
                </div>
            </div>

            {/* 모달 창 */}
            {openModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>학생 정보 입력</h2>
                        <form onSubmit={handleAddStudent}>
                            <table className={styles.studentInfoTable}>
                                <thead>
                                    <tr className={styles.studentInfoHeader}>
                                        <th className={styles.numberHeader}>번호</th>
                                        <th className={styles.studentNameHeader}>이름</th>
                                        <th className={styles.studentInfoHeader}>전화번호</th>
                                        <th className={styles.studentInfoHeader}>생년월일</th>
                                        <th className={styles.studentInfoHeader}>성별</th>
                                        <th className={styles.studentInfoHeader}>학년</th>
                                        <th className={styles.studentInfoHeader}>반</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <select
                                                value={studentCode}
                                                onChange={(e) => setStudentCode(e.target.value)}
                                                required
                                            >
                                                {[...Array(40).keys()].map((n) => (
                                                    <option key={n + 1} value={n + 1}>
                                                        {n + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={studentName}
                                                onChange={(e) => setStudentName(e.target.value)}
                                                required
                                                className={styles.inputField}
                                                placeholder="이름"
                                                maxLength={4}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={studentNum}
                                                onChange={(e) => setStudentNum(e.target.value)}
                                                required
                                                maxLength="11"
                                                className={styles.inputField}
                                                placeholder="전화번호"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                value={studentDate}
                                                onChange={(e) => setStudentDate(e.target.value)}
                                                required
                                                className={styles.inputField}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={studentGender}
                                                onChange={(e) => setStudentGender(e.target.value)}
                                                required
                                            >
                                                <option value="">성별</option>
                                                <option value="남">남</option>
                                                <option value="여">여</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={studentGrade}
                                                onChange={(e) => setStudentGrade(e.target.value)}
                                                required
                                            >
                                                {[...Array(6).keys()].map((n) => (
                                                    <option key={n + 1} value={n + 1}>
                                                        {n + 1}학년
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={classNum}
                                                onChange={(e) => setClassNum(e.target.value)}
                                                required
                                            >
                                                {[...Array(20).keys()].map((n) => (
                                                    <option key={n + 1} value={n + 1}>
                                                        {n + 1}반
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="submit" className={styles.addButton}>
                                추가
                            </button>
                            <button type="button" className={styles.cancelButton} onClick={onModalOpen}>
                                취소
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentManagementPage;
