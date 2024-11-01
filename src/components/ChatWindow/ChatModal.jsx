import React, { useContext } from 'react';
import styles from '../../css/Header/Chat/ChatListModal.module.css';
import { FaTimes } from 'react-icons/fa';
import Draggable from 'react-draggable';
import { ChatContext } from '../../utils/context/ChatContext';
import Chat from './Chat';

const ChatModal = () => {
    // ChatContext에서 채팅 모달 닫기 함수 가져오기
    const { closeChat } = useContext(ChatContext);

    return (
        // 드래그 라이브러리 사용
        <Draggable handle=".handle">
            <div className={styles.modalContainer}>
                <div className={`${styles.modalContent} handle`}>
                    <button className={styles.closeButton} onClick={closeChat}>
                        <FaTimes />
                    </button>
                    <Chat />
                </div>
            </div>
        </Draggable>
    );
};

export default ChatModal;
