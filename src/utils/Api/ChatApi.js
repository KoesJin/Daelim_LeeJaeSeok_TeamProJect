// 채팅방 목록 데이터를 서버에서 받아오는 함수 - 여러군데 사용하여 별도의 컴포넌트로 만듦

export const fetchChatListData = async (userId, baseURL) => {
    const bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');

    // 인증 토큰이 없으면 함수 종료
    if (!bearerToken) {
        alert('사용자가 인증되지 않았습니다.');
        return null;
    }

    // 서버에 요청 보내기
    const response = await fetch(`${baseURL}/api/chat/room/chatInventory?userId=${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: bearerToken,
        },
    });

    const result = await response.json();
    if (result.status === '200') {
        return result.data.chatRoomDtoList; // 채팅방 목록을 반환
    } else {
        alert(result.message);
        return null;
    }
};
