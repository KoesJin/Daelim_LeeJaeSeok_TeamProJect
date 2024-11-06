/* eslint-disable */

import React, { useState, useEffect, useRef, useContext } from 'react';
import styles from '../../css/Header/Chat/Chat.module.css';
import { FaPaperPlane, FaSignOutAlt } from 'react-icons/fa'; // 아이콘 추가
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { v4 as uuidv4 } from 'uuid';
import { ChatContext } from '../../utils/context/ChatContext';

const Chat = () => {
    const { closeChat } = useContext(ChatContext);

    // 사용자 정보 가져오기
    const userRealName = localStorage.getItem('userName');
    const chatRoomId = localStorage.getItem('chatRoomId');
    const userId = localStorage.getItem('userId');
    const [isComposing, setIsComposing] = useState(false);

    // 상태 변수
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    // 참조
    const chatAreaRef = useRef(null);
    const inputRef = useRef(null);

    // STOMP 클라이언트 참조
    const stompClientRef = useRef(null);

    // 환경 변수 사용
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://121.139.20.242:8859';

    // 입력 필드에 포커스 설정
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // 메시지 업데이트 시 스크롤
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    // 채팅 내역 가져오기
    const fetchChatHistory = async () => {
        try {
            let bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');

            if (bearerToken && !bearerToken.startsWith('Bearer ')) {
                bearerToken = `Bearer ${bearerToken}`;
            }

            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const chatRoomIdNumber = Number(chatRoomId);
            if (isNaN(chatRoomIdNumber)) {
                alert('채팅방 ID가 유효하지 않습니다.');
                return;
            }

            const url = `${baseURL}/chat/${chatRoomIdNumber}?page=0&size=20`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: bearerToken,
                },
            });

            if (!response.ok) {
                throw new Error(`서버 오류: ${response.status}`);
            }

            const result = await response.json();

            if (result && result.content) {
                // 메시지 내역을 역순으로 설정
                setMessages(result.content.reverse());
            } else {
                alert('채팅 내역을 불러올 수 없습니다');
            }
        } catch (error) {
            console.error('채팅 내역을 가져오는 중 오류 발생:', error);
            alert(`채팅 내역을 불러올 수 없습니다: ${error.message}`);
        }
    };

    // STOMP 클라이언트 초기화 및 연결
    useEffect(() => {
        if (!chatRoomId) {
            return;
        }

        let isMounted = true; // To prevent state updates after unmount

        const initializeStomp = () => {
            let bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');

            if (bearerToken && !bearerToken.startsWith('Bearer ')) {
                bearerToken = `Bearer ${bearerToken}`;
            }

            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const chatRoomIdNumber = Number(chatRoomId);
            if (isNaN(chatRoomIdNumber)) {
                alert('채팅방 ID가 유효하지 않습니다.');
                return;
            }

            // SockJS를 통한 WebSocket 연결 생성
            const socket = new SockJS(`${baseURL}/ws`);
            const stompClient = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000, // 재연결 시도 간격 (ms)
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                connectHeaders: {
                    Authorization: bearerToken,
                },
                onConnect: () => {
                    if (!isMounted) return;
                    setIsConnected(true);

                    // 채팅방 구독
                    stompClient.subscribe(`/topic/${chatRoomIdNumber}`, (message) => {
                        const receivedMessage = JSON.parse(message.body);

                        // Update messages state
                        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                    });

                    // 초기 채팅 내역 가져오기
                    fetchChatHistory();
                },
                onDisconnect: () => {
                    if (!isMounted) return;
                    setIsConnected(false);
                },
                onStompError: (frame) => {
                    console.error('STOMP 에러:', frame.headers['message']);
                    console.error('상세 에러:', frame.body);
                },
                debug: (str) => {
                    // console.log('STOMP Debug:', str);
                },
            });

            stompClient.activate();
            stompClientRef.current = stompClient;
        };

        initializeStomp();

        return () => {
            isMounted = false;
            if (stompClientRef.current && stompClientRef.current.active) {
                stompClientRef.current.deactivate();
            }
        };
    }, [chatRoomId, baseURL, userRealName, userId]);

    // 메시지 전송 함수
    const handleSend = () => {
        if (input.trim() === '') return; // 빈 메시지 전송 방지
        if (!isConnected) {
            alert('서버에 연결되지 않았습니다.');
            return;
        }

        const chatRoomIdNumber = Number(chatRoomId);
        const senderIdNumber = userId;

        // 채팅 메시지 객체 생성
        const chatMessage = {
            chatRoomId: chatRoomIdNumber,
            senderId: senderIdNumber,
            message: input.trim(), // 공백 제거 후 메시지 전송
        };

        try {
            // JSON 형식으로 메시지 전송
            stompClientRef.current.publish({
                destination: '/app/chat/send',
                body: JSON.stringify(chatMessage),
            });

            // 전송 후 입력 필드 초기화
            setInput('');
        } catch (error) {
            console.error('메시지 전송 중 오류 발생:', error);
            alert(`메시지 전송에 실패했습니다: ${error.message}`);
        }
    };

    // Enter 키 누를 시 메시지 전송
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleCompositionStart = () => setIsComposing(true);
    const handleCompositionEnd = () => setIsComposing(false);

    // 방 나가기 함수
    const handleExitRoom = async () => {
        try {
            const response = await fetch(`${baseURL}/api/chat/room/delete?chatRoomId=${chatRoomId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            const result = await response.json();

            const confirmed = window.confirm('채팅방을 나가시겠습니까?');

            if (!confirmed) {
                return;
            }

            if (result.status === '200') {
                closeChat();
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('채팅방을 삭제할 수 없습니다.');
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.header}>
                <h2>채팅</h2>
                <div className={styles.connectionStatus}>{isConnected ? '온라인' : '오프라인'}</div>
                <button className={styles.exitButton} onClick={handleExitRoom}>
                    <FaSignOutAlt /> {/* 나가기 아이콘으로 변경 */}
                </button>
            </div>
            <div className={styles.chatArea} ref={chatAreaRef}>
                {messages.map((data) => (
                    <div
                        key={data.id || uuidv4()}
                        className={data.userRealName === userRealName ? styles.myMessage : styles.otherMessage}
                    >
                        <span>{data.message}</span>
                        <div className={styles.timeStamp}>
                            {new Date(data.sendTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.inputArea}>
                <textarea
                    ref={inputRef}
                    value={input}
                    placeholder="메시지 입력..."
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    rows={2}
                />
                <button onClick={handleSend} disabled={!isConnected}>
                    <FaPaperPlane className={styles.sendIcon} />
                </button>
            </div>
        </div>
    );
};

export default Chat;
