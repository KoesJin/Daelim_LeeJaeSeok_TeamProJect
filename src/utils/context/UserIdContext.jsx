// 사용해볼라 했으나 페이지 랜더링 두번의 문제는 react-transition-group 떄문이므로 사용 안하게 됨

import { createContext, useState } from 'react';

// 1. 전역으로 userId를 보낼 Context 설정
export const UserIdContext = createContext({});

// 2. userIdProvider라는 컴포넌트를 정의하여, UserIdContext를 통해 데이터를 전역으로 제공할 수 있도록 설정
export const UserIdProvider = ({ children }) => {
    const [globaluserId, setGlobaluserId] = useState('');

    return <UserIdContext.Provider value={{ globaluserId, setGlobaluserId }}>{children}</UserIdContext.Provider>;
};
