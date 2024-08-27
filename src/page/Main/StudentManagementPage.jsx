import React from 'react';
import styles from '../../css/MainPage/StudentManagementPage/StudentManagementPage.module.css';

const StudentManagementPage = () => {
    // 예시 데이터: 실제 데이터는 props나 상태로 관리할 수 있습니다.
    const students = [
        {
            id: 1,
            name: '홍길동',
            phone: '010-1234-5678',
            dob: '2000-01-01',
            gender: '남',
            email: 'hong@example.com',
            grade: '1',
            class: 'A',
        },
        {
            id: 2,
            name: '이몽룡',
            phone: '010-2345-6789',
            dob: '2000-02-02',
            gender: '남',
            email: 'lee@example.com',
            grade: '2',
            class: 'B',
        },
        {
            id: 3,
            name: '성춘향',
            phone: '010-3456-7890',
            dob: '2000-03-03',
            gender: '여',
            email: 'sung@example.com',
            grade: '3',
            class: 'C',
        },
        // 추가 데이터...
    ];

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.container}>
                <div className={styles.classInfo}>2-4반</div> {/* 학급 정보 */}
                <button className={styles.addButton}>학생 등록</button>
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
                            {students.map((student, index) => (
                                <tr key={student.id} className={styles.studentRow}>
                                    <td className={styles.number}>{index + 1}</td>
                                    <td className={styles.studentName}>{student.name}</td>
                                    <td className={styles.studentInfo}>{student.phone}</td>
                                    <td className={styles.studentInfo}>{student.dob}</td>
                                    <td className={styles.studentInfo}>{student.gender}</td>
                                    <td className={styles.studentInfo}>{student.grade}</td>
                                    <td className={styles.studentInfo}>{student.class}</td>
                                    <td className={styles.actions}>
                                        <button className={styles.editButton}>수정</button>
                                        <div className={styles.separator}>|</div>
                                        <button className={styles.deleteButton}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentManagementPage;
