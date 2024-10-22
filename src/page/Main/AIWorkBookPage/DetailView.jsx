/* eslint-disable */
import React from 'react';
import styles from '../../../css/MainPage/AIWorkbookPage/AIWorkbookPage.module.css';

const DetailView = ({ detail, addQuestion }) => {
    const { id, question_image_url, question_image_filename, question_info } = detail;

    return (
        <div className={styles.detailContent}>
            <h3>문제 ID: {id}</h3>
            {question_image_url ? (
                <img src={question_image_url} alt={`Question Image ${id}`} className={styles.detailImage} />
            ) : (
                <p className={styles.noImage}>이미지가 없습니다: {question_image_filename || `${id}.png`}</p>
            )}
            <p className={styles.questionText}>
                {question_info && question_info.length > 0
                    ? `토픽: ${question_info[0].question_topic_name}`
                    : '질문 정보가 없습니다.'}
            </p>
            {/* 시험지에 추가 버튼 추가 */}
            <button className={styles.addButton} onClick={addQuestion}>
                시험지에 추가
            </button>
        </div>
    );
};

export default DetailView;
