import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/MainPage/SeatAssignmentPage/SeatAssignmentPage.module.css';

const SeatAssignmentPage = () => {
    const [students, setStudents] = useState([
        { id: 1, name: '김1', assigned: false },
        { id: 2, name: '김2', assigned: false },
        { id: 3, name: '김3', assigned: false },
        { id: 4, name: '김4', assigned: false },
        { id: 5, name: '김5', assigned: false },
        { id: 6, name: '김6', assigned: false },
        { id: 7, name: '김7', assigned: false },
        { id: 8, name: '김8', assigned: false },
        { id: 9, name: '김9', assigned: false },
        { id: 10, name: '김10', assigned: false },
    ]);

    const [seats, setSeats] = useState(Array(24).fill(null));

    const handleDragStart = (e, studentId) => {
        e.dataTransfer.setData('studentId', studentId);
    };

    const handleDrop = (e, seatIndex) => {
        const studentId = e.dataTransfer.getData('studentId');
        const studentIndex = students.findIndex((student) => student.id === parseInt(studentId));

        if (studentIndex !== -1) {
            const updatedStudents = students.map((student, idx) =>
                idx === studentIndex ? { ...student, assigned: true } : student
            );
            const updatedSeats = seats.map((seat, idx) => (idx === seatIndex ? students[studentIndex].name : seat));
            setStudents(updatedStudents);
            setSeats(updatedSeats);
        }
    };

    const handleRandomAssign = () => {
        const shuffledStudents = students.filter((student) => !student.assigned).sort(() => Math.random() - 0.5);
        const updatedSeats = seats.map((seat) =>
            seat === null && shuffledStudents.length > 0 ? shuffledStudents.pop().name : seat
        );
        const updatedStudents = students.map((student) =>
            updatedSeats.includes(student.name) ? { ...student, assigned: true } : student
        );
        setSeats(updatedSeats);
        setStudents(updatedStudents);
    };

    return (
        <>
            <div className={styles.content}>
                <div className={styles.studentList}>
                    <div className={styles.studentClass}>2-4반</div>
                    {students.map((student) => (
                        <div
                            key={student.id}
                            className={`${styles.student} ${student.assigned ? styles.assigned : ''}`}
                            draggable={!student.assigned}
                            onDragStart={(e) => handleDragStart(e, student.id)}
                        >
                            {student.name}
                        </div>
                    ))}
                    <button className={styles.randomButton} onClick={handleRandomAssign}>
                        랜덤 배정
                    </button>
                </div>
                <div className={styles.seatMap}>
                    <div className={styles.board}>칠판</div>
                    <div className={styles.seatGrid}>
                        {seats.map((seat, index) => (
                            <div
                                key={index}
                                className={styles.seat}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDrop(e, index)}
                                contentEditable={!seat}
                                onInput={(e) => {
                                    const updatedSeats = [...seats];
                                    updatedSeats[index] = e.currentTarget.textContent.trim();
                                    setSeats(updatedSeats);
                                }}
                            >
                                {seat}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SeatAssignmentPage;
