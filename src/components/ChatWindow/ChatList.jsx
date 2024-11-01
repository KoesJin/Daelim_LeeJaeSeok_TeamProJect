import React, { useContext } from 'react';
import styles from '../../css/Header/Chat/ChatList.module.css';
import { ChatContext } from '../../utils/context/ChatContext';
import TeachCong from '../../svg/Chat/TeachCong';

const ChatList = () => {
    const { openChat } = useContext(ChatContext);

    // 예시 채팅 목록 데이터
    const chatList = [
        { id: 1, name: '쿠팡', message: '김진석님, 더 나은 서비스 제공을 위해...', date: '4월 20일' },
        { id: 2, name: 'SK엠엔서비스', message: '광고성 정보 수신동의 안내', date: '4월 16일' },
        { id: 3, name: '메가MGC커피', message: '(광고)메가콘서트 4차 라인업 D-day🎉', date: '4월 12일' },
        { id: 4, name: '롯데시네마', message: '준비 완료!', date: '4월 10일' },
        { id: 5, name: '김김김', message: 'ㅁ 이모티콘을 보냈습니다.', date: '4월 9일' },
        { id: 6, name: '톡캘린더', message: '오늘의 브리핑이 도착했어요.', date: '4월 9일' },
        { id: 7, name: '김김김', message: 'ㅗ 이모티콘을 보냈습니다.', date: '4월 8일' },
        { id: 8, name: '김김김', message: 'ㅎㅎ.', date: '4월 7일' },
        { id: 9, name: '김김김', message: 'ㅎㅎ.', date: '4월 7일' },
        { id: 10, name: '김김김', message: 'ㅎㅎ.', date: '4월 7일' },
        { id: 11, name: '김김김', message: 'ㅎㅎ.', date: '4월 7일' },
        { id: 12, name: '김김김', message: 'ㅎㅎ.', date: '4월 7일' },

        // 추가 채팅방 데이터
    ];

    return (
        <div className={styles.chatListContainer}>
            <h2 className={styles.title}>교사 목록</h2>
            <div className={styles.chatList}>
                {chatList.map((chat) => (
                    <div key={chat.id} className={styles.chatItem} onClick={openChat}>
                        <TeachCong className={styles.chatIcon}></TeachCong>
                        <div className={styles.chatInfo}>
                            <div className={styles.chatHeader}>
                                <span className={styles.chatName}>{chat.name}</span>
                                <span className={styles.chatDate}>{chat.date}</span>
                            </div>
                            <div className={styles.chatMessage}>{chat.message}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
