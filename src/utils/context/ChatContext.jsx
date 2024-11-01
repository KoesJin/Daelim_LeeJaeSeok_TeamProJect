import React, { createContext, useState } from 'react';
import ChatListModal from '../../components/ChatWindow/ChatListModal';
import ChatModal from '../../components/ChatWindow/ChatModal';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    // ChatList 모달 창 열렸는지 여부
    const [isChatListOpen, setIsChatListOpen] = useState(false);

    // Chat 모달 창 열렸는지 여부
    const [isChatOpen, setIsChatOpen] = useState(false);

    // ChatList모달 열고 닫음 여부
    const openChatList = () => setIsChatListOpen(true);
    const closeChatList = () => setIsChatListOpen(false);

    // Chat모달 열고 닫음 여부
    const openChat = () => setIsChatOpen(true);
    const closeChat = () => setIsChatOpen(false);

    return (
        // 전역으로 뿌려줌
        <ChatContext.Provider value={{ isChatListOpen, isChatOpen, openChatList, closeChatList, openChat, closeChat }}>
            {/* Root의 Outlet을 랜더링 */}
            {children}
            {isChatListOpen && <ChatListModal />}
            {isChatOpen && <ChatModal />}
        </ChatContext.Provider>
    );
};
