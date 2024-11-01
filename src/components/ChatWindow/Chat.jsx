import React, { useState, useEffect, useRef } from 'react';
import styles from '../../css/Header/Chat/Chat.module.css';
import { FaPaperPlane } from 'react-icons/fa';

const Chat = () => {
    // 메세지 담을 변수
    const [messages, setMessages] = useState([]);
    // 입력창
    const [input, setInput] = useState('');

    // 메세지 하단으로 내려주기위해  useRef이용
    const chatAreaRef = useRef(null);

    // textarea를 참조하는 ref
    const inputRef = useRef(null);

    // 컴포넌트가 마운트될 때 input에 포커스 설정
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // 메세지 전송 함수
    const handleSend = () => {
        if (input.trim() !== '') {
            setMessages([...messages, { text: input, sender: 'me' }]);
            setInput('');
            // 메시지를 서버로 보내는 로직을 여기에 추가하세요.
        }
    };

    // 엔터시 메세지 전송 함수 호출 함수
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    // 메세지 하단으로 보내주는 useEffect
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        // 서버로부터 메시지를 받아오는 로직을 여기에 추가하세요.
    }, []);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.header}>
                <h2>채팅{/* 추후 상대방 이름 나오게 변경 */}</h2>
            </div>
            <div className={styles.chatArea} ref={chatAreaRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'me' ? styles.myMessage : styles.otherMessage}>
                        <span>{msg.text}</span>
                    </div>
                ))}
            </div>
            <div className={styles.inputArea}>
                <textarea
                    ref={inputRef}
                    type="text"
                    value={input}
                    placeholder="메세지 입력..."
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSend}>
                    <FaPaperPlane className={styles.sendIcon} />
                </button>
            </div>
        </div>
    );
};

export default Chat;
