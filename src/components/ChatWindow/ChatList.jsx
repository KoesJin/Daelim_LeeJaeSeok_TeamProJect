import React, { useContext, useState } from 'react';
import styles from '../../css/Header/Chat/ChatList.module.css';
import { ChatContext } from '../../utils/context/ChatContext';
import TeachCong from '../../svg/Chat/TeachCong';

const ChatList = () => {
    const { openChat } = useContext(ChatContext);

    // 현재 표시할 목록 상태 (채팅 또는 친구)
    const [isChatMode, setIsChatMode] = useState(true);

    // 예시 채팅 목록 데이터
    const chatList = [
        { id: 1, name: '쿠팡', message: '김진석님, 더 나은 서비스 제공을 위해...', date: '4월 20일' },
        { id: 2, name: 'SK엠엔서비스', message: '광고성 정보 수신동의 안내', date: '4월 16일' },
        { id: 2, name: 'SK엠엔서비스', message: '광고성 정보 수신동의 안내', date: '4월 16일' },
        { id: 2, name: 'SK엠엔서비스', message: '광고성 정보 수신동의 안내', date: '4월 16일' },
        { id: 2, name: 'SK엠엔서비스', message: '광고성 정보 수신동의 안내', date: '4월 16일' },
        { id: 2, name: 'SK엠엔서비스', message: '광고성 정보 수신동의 안내', date: '4월 16일' },
        { id: 2, name: 'SK엠엔서비스', message: '광고성 정보 수신동의 안내', date: '4월 16일' },
        { id: 2, name: 'SK엠엔서비스', message: '광고성 정보 수신동의 안내', date: '4월 16일' },
        // 추가 채팅 데이터
    ];

    // 예시 친구 목록 데이터
    const friendList = [
        { id: 1, name: '김진석' },
        { id: 2, name: '이철수' },
        { id: 2, name: '이철수' },
        { id: 2, name: '이철수' },
        { id: 2, name: '이철수' },
        { id: 2, name: '이철수' },
        { id: 2, name: '이철수' },
        { id: 2, name: '이철수' },
        { id: 2, name: '이철수' },
        { id: 2, name: '이철수' },

        // 추가 친구 데이터
    ];

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <button
                    className={`${styles.tabButton} ${!isChatMode ? styles.active : ''}`}
                    onClick={() => setIsChatMode(false)}
                >
                    친구
                </button>
                <button
                    className={`${styles.tabButton} ${isChatMode ? styles.active : ''}`}
                    onClick={() => setIsChatMode(true)}
                >
                    채팅
                </button>
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>{isChatMode ? '채팅 목록' : '친구 목록'}</h2>
                <div className={styles.list}>
                    {isChatMode
                        ? // 채팅 목록
                          chatList.map((chat) => (
                              <div key={chat.id} className={styles.chatItem} onClick={openChat}>
                                  <TeachCong className={styles.chatIcon} />
                                  <div className={styles.chatInfo}>
                                      <div className={styles.chatHeader}>
                                          <span className={styles.chatName}>{chat.name}</span>
                                          <span className={styles.chatDate}>{chat.date}</span>
                                      </div>
                                      <div className={styles.chatMessage}>{chat.message}</div>
                                  </div>
                              </div>
                          ))
                        : //   친구 목록
                          friendList.map((friend) => (
                              <div key={friend.id} className={styles.friendItem}>
                                  <TeachCong className={styles.friendIcon} />
                                  <div className={styles.friendInfo}>
                                      <span className={styles.friendName}>{friend.name}</span>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
