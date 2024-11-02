// 정보 불러오는 앤드포인트가 생겼으므로 사용 x

import { createContext, useState } from 'react';

// 1. 전역으로 데이터를 보낼 Context 설정
export const StudentContext = createContext();

// 2. StudentProvider라는 컴포넌트를 정의하여, StudentContext를 통해 데이터를 전역으로 제공할 수 있도록 설정
export const StudentProvider = ({ children }) => {
    // 값을 담을 변수 생
    const [extractedData, setExtractedData] = useState([]);

    return (
        <>
            {/* childern는  하위 컴포넌트임 (자식 컴포넌트들)*/}
            <StudentContext.Provider value={{ extractedData, setExtractedData }}>{children}</StudentContext.Provider>
        </>
    );
};
