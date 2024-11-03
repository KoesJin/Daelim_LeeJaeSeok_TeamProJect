import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createGlobalStyle, styled } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './components/Header/Header';
import { ChatProvider } from './utils/context/ChatContext'; // ChatProvider import
import { StudentProvider } from './utils/context/StudentContext';

const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch; /* 모바일에서 부드러운 스크롤을 위해 추가 */
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      overflow-y: hidden; /* 가로 스크롤을 막고 세로 스크롤은 허용 */
    }

    .fade-enter {
      opacity: 0;
    }

    .fade-enter-active {
      opacity: 1;
      transition: opacity 250ms ease-in;
    }

    .fade-exit {
      opacity: 1;
    }

    .fade-exit-active {
      opacity: 0;
      transition: opacity 250ms ease-out;
    }
`;

const AnimationContainer = styled.div`
    width: 100%;
`;

function Root() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const accessToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
        // 토큰 검증 제외 페이지
        const allowedPaths = [
            '/',
            '/signuppage',
            '/checksignuppage',
            '/findpassword-email',
            '/findpassword-phone',
            '/checkfindid',
            '/findid-email',
            '/findid-phone',
            '/checkfindpassword',
        ];
        if (!accessToken && !allowedPaths.includes(location.pathname)) {
            navigate('/');
        }
    }, [navigate, location.pathname]);

    // Header 숨김 목록
    const hideHeaderPaths = [
        '/',
        '/signuppage',
        '/checksignuppage',
        '/findpassword-email',
        '/findpassword-phone',
        '/checkfindid',
        '/findid-email',
        '/findid-phone',
        '/checkfindpassword',
    ];

    return (
        <ChatProvider>
            <StudentProvider>
                <Helmet>
                    <title>TeacHub</title>
                </Helmet>
                <GlobalStyle />
                {!hideHeaderPaths.includes(location.pathname) && <Header />}
                <TransitionGroup>
                    <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                        <AnimationContainer>
                            <Outlet />
                        </AnimationContainer>
                    </CSSTransition>
                </TransitionGroup>
            </StudentProvider>
        </ChatProvider>
    );
}

export default Root;
