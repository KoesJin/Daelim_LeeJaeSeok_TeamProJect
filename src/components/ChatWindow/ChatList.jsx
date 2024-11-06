import React, { useContext, useEffect, useState } from 'react';
import styles from '../../css/Header/Chat/ChatList.module.css';
import { ChatContext } from '../../utils/context/ChatContext';
import TeachCong from '../../svg/Chat/TeachCong';
import { fetchChatListData } from '../../utils/Api/ChatApi';

const ChatList = () => {
    // Context 이용 채팅방 열기 사용
    const { openChat } = useContext(ChatContext);

    // userId 가져오기
    const userId = localStorage.getItem('userId');

    // schoolName 가져오기
    const schoolName = localStorage.getItem('schoolName');

    //불러온 유저 정보 저장 변수
    const [friendList, setFriendList] = useState([]);

    //불러온 채팅 정보 저장 변수
    const [chatList, setChatList] = useState([]);

    // 현재 표시할 목록 상태 (채팅 또는 친구)
    const [isChatMode, setIsChatMode] = useState(true);

    // schoolName이 있으면 회원 정보 가져오기
    useEffect(() => {
        if (schoolName) {
            handleTakeInfo();
        }
    }, [schoolName]);

    // userId가 있으면 채팅창 목록 가져오기
    useEffect(() => {
        if (userId) {
            handleTakeChatInfo();
        }
    }, [userId]);

    // baseURL 설정
    let baseURL = '';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://121.139.20.242:8859';
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            // userId가 존재하는지 확인하고 fetchChatListData 호출
            if (userId) {
                const chatData = await fetchChatListData(userId, baseURL);
                if (chatData) {
                    setChatList(chatData); // 상태 업데이트
                }
            }
        }, 500); // 0.5초마다 목록 갱신

        return () => clearInterval(interval);
    }, [userId, baseURL]); // userId나 baseURL이 변경되면 다시 실행

    // 회원 정보 불러오는 함수
    const handleTakeInfo = async () => {
        try {
            const bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const response = await fetch(`${baseURL}/api/user/userList?schoolName=${schoolName}&userId=${userId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: bearerToken,
                },
            });
            const result = await response.json();

            if (result.status === '200') {
                setFriendList(result.data);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('정보를 불러올 수 없습니다');
        }
    };

    // 채팅목록 정보 불러오는 함수 - 따로만든 채팅방 정보 불러오는 함수로 채팅방 정보 받아옴
    const handleTakeChatInfo = async () => {
        try {
            const chatData = await fetchChatListData(userId, baseURL);
            if (chatData) setChatList(chatData); // 데이터가 있을 때만 상태에 저장
        } catch (error) {
            alert(`채팅방 정보를 불러오는데 실패했습니다: ${error.message}`);
        }
    };

    // chatRoomId 뽑아내는 함수
    const selectedChatRoomId = (chatRoomId) => {
        localStorage.setItem('chatRoomId', chatRoomId);
    };

    // 채팅 방 만드는 함수
    const handleAddChatRoom = async ({ masterId, name, participantId }) => {
        try {
            console.log('Master ID:', masterId);
            console.log('Chat Room Name:', name);
            console.log('Participant ID:', participantId); // 여기서 participantId가 제대로 출력되는지 확인

            // 이메일 인증 요청
            const response = await fetch(`${baseURL}/api/chat/room/createChatRoom`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    masterId,
                    participantId,
                    name,
                }),
            });

            // 응답 결과 처리
            const result = await response.json();

            if (result.status === '200') {
                alert(result.message);
                console.log(masterId);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('채팅방 생성 도중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <button
                    className={`${styles.tabButton} ${isChatMode ? styles.active : ''}`}
                    onClick={() => setIsChatMode(true)}
                >
                    친구
                </button>
                <button
                    className={`${styles.tabButton} ${!isChatMode ? styles.active : ''}`}
                    onClick={() => setIsChatMode(false)}
                >
                    채팅
                </button>
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>{isChatMode ? '친구 목록' : '채팅 목록'}</h2>
                <div className={styles.list}>
                    {!isChatMode
                        ? // 채팅 목록
                          chatList.map((chat) => (
                              <div key={chat.id} className={styles.chatItem} onClick={openChat}>
                                  <TeachCong className={styles.chatIcon} />
                                  <div className={styles.chatInfo} onClick={() => selectedChatRoomId(chat.chatRoomId)}>
                                      <div className={styles.chatHeader}>
                                          <span className={styles.chatName}>{chat.name} 선생님</span>
                                          <span className={styles.chatDate}>
                                              {new Date(chat.lastMessageTime).toLocaleDateString('ko-KR', {
                                                  month: 'long',
                                                  day: 'numeric',
                                              })}
                                          </span>
                                      </div>
                                      <div className={styles.chatMessage}>{chat.lastMessages}</div>
                                  </div>
                              </div>
                          ))
                        : //   친구 목록
                          friendList.map((friend) => (
                              <div key={friend.id} className={styles.friendItem}>
                                  <TeachCong className={styles.friendIcon} />
                                  <div className={styles.friendInfo}>
                                      <span className={styles.friendName}>{friend.userRealName} 선생님</span>
                                  </div>
                                  <button
                                      className={styles.chatButton}
                                      // 기존 코드에서 onClick 부분 수정
                                      onClick={() =>
                                          handleAddChatRoom({
                                              masterId: userId,
                                              name: friend.userRealName,
                                              participantId: friend.userId,
                                          })
                                      }
                                  >
                                      채팅방 만들기
                                  </button>
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
