import React, { useContext } from 'react';
import styles from '../../css/Header/Chat/ChatListModal.module.css';
import { FaTimes } from 'react-icons/fa';
import Draggable from 'react-draggable';
import { ChatContext } from '../../utils/context/ChatContext';
import ChatList from './ChatList';

const ChatListModal = () => {
    // ChatContext에서 채팅 모달 닫기 함수 가져오기
    const { closeChatList } = useContext(ChatContext);

    return (
        // 드래그 라이브러리 사용
        <Draggable handle=".handle">
            <div className={styles.modalContainer}>
                <div className={`${styles.modalContent} handle`}>
                    <button className={styles.closeButton} onClick={closeChatList}>
                        <FaTimes />
                    </button>
                    <ChatList />
                </div>
            </div>
        </Draggable>
    );
};

export default ChatListModal;
